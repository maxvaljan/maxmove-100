import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpHeader } from "@/components/signup/SignUpHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting to update password");
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error("Update password error:", error);
        setErrorMessage(error.message);
        return;
      }

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });

      navigate("/signin");
    } catch (error: any) {
      console.error("Unexpected error during password update:", error);
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
              Update Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="New password"
                className="bg-white/80 border-0"
              />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className="bg-white/80 border-0"
              />
              <Button 
                type="submit" 
                className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;