
import { SignUpHeader } from "@/components/signup/SignUpHeader";
import { SignInCard } from "@/components/signin/SignInCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-maxmove-800 hover:text-maxmove-900 hover:bg-white/20"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Button>
      <div className="w-full max-w-md space-y-8">
        <SignUpHeader />
        <SignInCard />
      </div>
    </div>
  );
};

export default SignIn;
