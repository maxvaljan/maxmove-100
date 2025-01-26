import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          // Get user profile to check role
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session?.user?.id)
            .single();

          // Redirect based on role
          if (profile?.role === "driver") {
            navigate("/drivers/dashboard");
          } else if (profile?.role === "business") {
            navigate("/business/dashboard");
          } else if (profile?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/book"); // Default customer route
          }

          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleAuthError = (error: AuthError) => {
    console.error("Auth error:", error);
    
    if (error instanceof AuthApiError) {
      if (error.status === 429) {
        setIsRateLimited(true);
        setErrorMessage("Too many attempts. Please wait a few minutes before trying again.");
        
        setTimeout(() => {
          setIsRateLimited(false);
          setErrorMessage("");
        }, 5 * 60 * 1000);
        
        return;
      }

      switch (error.message) {
        case "Email rate limit exceeded":
          setIsRateLimited(true);
          setErrorMessage("Too many signup attempts. Please wait 5 minutes before trying again.");
          
          setTimeout(() => {
            setIsRateLimited(false);
            setErrorMessage("");
          }, 5 * 60 * 1000);
          break;
          
        case "Invalid login credentials":
          setErrorMessage("Invalid email or password. Please try again.");
          break;
          
        default:
          setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-maxmove-900">
            Sign in to Maxmove
          </h2>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-maxmove-900">
              Welcome back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(67, 77, 99)',
                      brandAccent: 'rgb(79, 91, 118)',
                      brandButtonText: 'white',
                      defaultButtonBackground: 'white',
                      defaultButtonBackgroundHover: 'rgb(247, 250, 252)',
                      inputBackground: 'white',
                      inputBorder: 'transparent',
                      inputBorderHover: 'transparent',
                      inputBorderFocus: 'transparent',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '0px',
                    },
                    radii: {
                      borderRadiusButton: '0.5rem',
                      buttonBorderRadius: '0.5rem',
                      inputBorderRadius: '0.5rem',
                    },
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: `w-full px-4 py-2 font-medium transition-colors ${isRateLimited ? 'opacity-50 cursor-not-allowed' : ''}`,
                  input: 'w-full px-4 py-2 transition-colors bg-white/80',
                  label: 'sr-only',
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    button_label: 'Sign in'
                  },
                  sign_up: {
                    email_label: '',
                    password_label: '',
                    button_label: 'Create account',
                    link_text: 'Create an account'
                  }
                }
              }}
              providers={[]}
              redirectTo="/account-type-selection"
              viewProps={{
                sign_up: {
                  redirectTo: '/account-type-selection',
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;