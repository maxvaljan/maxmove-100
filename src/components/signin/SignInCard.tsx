import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignInForm } from "./SignInForm";

export const SignInCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-maxmove-900">
          Welcome back
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SignInForm />
        <div className="text-center text-sm space-y-2">
          <div>
            <Button
              type="button"
              variant="link"
              className="text-maxmove-800 hover:text-maxmove-900 p-0"
              onClick={() => navigate("/reset-password")}
            >
              Forgot your password?
            </Button>
          </div>
          <div>
            <span className="text-maxmove-600">New to Maxmove? </span>
            <Button
              type="button"
              variant="link"
              className="text-maxmove-800 hover:text-maxmove-900 p-0"
              onClick={() => navigate("/account-type")}
            >
              Create an account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};