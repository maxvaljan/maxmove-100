import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpHeader } from "@/components/signup/SignUpHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Attempting to send reset password email to:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        console.error("Reset password error:", error);
        setErrorMessage(error.message);
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error: any) {
      console.error("Unexpected error during password reset:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignUpHeader />
        <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-maxmove-900">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleResetPassword} className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              {isSuccess && (
                <Alert>
                  <AlertDescription>
                    If an account exists with this email, you will receive password reset instructions.
                  </AlertDescription>
                </Alert>
              )}
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="bg-white/80 border-0"
              />
              <Button 
                type="submit" 
                className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <div className="text-center text-sm">
              <Button
                type="button"
                variant="link"
                className="text-maxmove-800 hover:text-maxmove-900"
                onClick={() => navigate("/signin")}
              >
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;