
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SignUpHeader } from "@/components/signup/SignUpHeader";
import { AccountTypeTabs } from "@/components/signup/AccountTypeTabs";
import { PersonalSignUpForm } from "@/components/signup/PersonalSignUpForm";
import { BusinessSignUpForm } from "@/components/signup/BusinessSignUpForm";
import { DriverSignUpForm } from "@/components/signup/DriverSignUpForm";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const accountType = searchParams.get("type") || "personal";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: any) => {
    try {
      setIsLoading(true);
      console.log("Starting sign up process for account type:", accountType);
      
      const { error: signUpError, data: authData } = await supabase.auth.signUp({
        email: data.email || data.workEmail,
        password: data.password,
        phone: data.phoneNumber,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            role: accountType,
            ...(accountType === "business" && {
              company_name: data.companyName,
              industry: data.industry,
            }),
          },
        },
      });

      if (signUpError) throw signUpError;

      // Update profile with phone number and name
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            phone_number: data.phoneNumber,
            name: `${data.firstName} ${data.lastName}`
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        // Create phone verification entry
        const { error: verificationError } = await supabase
          .from('phone_verifications')
          .insert([
            {
              phone_number: data.phoneNumber,
              verification_code: Math.floor(100000 + Math.random() * 900000).toString(),
            }
          ]);

        if (verificationError) throw verificationError;
      }

      console.log("Sign up successful");
      toast.success("Registration successful! Please check your email to verify your account.");
      
      // Redirect based on account type
      if (accountType === "driver") {
        navigate("/driver-dashboard");
      } else {
        navigate("/signin");
      }
    } catch (error: any) {
      console.error("Error in sign up:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignUpHeader />
        
        <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
          <CardHeader />
          <CardContent className="-mt-4">
            <Tabs defaultValue={accountType} className="w-full">
              <AccountTypeTabs 
                accountType={accountType}
                onAccountTypeChange={(type) => navigate(`/signup?type=${type}`)}
              />

              <TabsContent value="personal">
                <PersonalSignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="business">
                <BusinessSignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="driver">
                <DriverSignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-maxmove-600">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="text-maxmove-800 hover:text-maxmove-900"
                  onClick={() => navigate("/signin")}
                >
                  Login
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
