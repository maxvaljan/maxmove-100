import { SignUpHeader } from "@/components/signup/SignUpHeader";
import { SignInCard } from "@/components/signin/SignInCard";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignUpHeader />
        <SignInCard />
      </div>
    </div>
  );
};

export default SignIn;