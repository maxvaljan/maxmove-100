import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-maxmove-900">
            Welcome to Maxmove
          </h2>
          <p className="mt-2 text-sm text-maxmove-600">
            Sign in to your account to continue
          </p>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-maxmove-900">
              Sign in
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
                      inputBorder: 'rgb(203, 213, 225)',
                      inputBorderHover: 'rgb(148, 166, 188)',
                      inputBorderFocus: 'rgb(67, 77, 99)',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
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
                  button: 'w-full px-4 py-2 font-medium transition-colors',
                  input: 'w-full px-4 py-2 transition-colors',
                  label: 'text-sm font-medium text-maxmove-700',
                },
              }}
              providers={[]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;