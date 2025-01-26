import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+49", label: "🇩🇪 +49" },
  { value: "+33", label: "🇫🇷 +33" },
  { value: "+34", label: "🇪🇸 +34" },
  { value: "+39", label: "🇮🇹 +39" },
  { value: "+31", label: "🇳🇱 +31" },
  { value: "+41", label: "🇨🇭 +41" },
  { value: "+43", label: "🇦🇹 +43" },
  { value: "+46", label: "🇸🇪 +46" },
  { value: "+47", label: "🇳🇴 +47" },
  { value: "+45", label: "🇩🇰 +45" },
  { value: "+358", label: "🇫🇮 +358" },
  { value: "+48", label: "🇵🇱 +48" },
  { value: "+351", label: "🇵🇹 +351" },
  { value: "+353", label: "🇮🇪 +353" },
  { value: "+32", label: "🇧🇪 +32" },
  { value: "+420", label: "🇨🇿 +420" },
  { value: "+36", label: "🇭🇺 +36" },
];

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+49");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const isEmail = identifier.includes('@');
    const email = isEmail ? identifier : undefined;
    const phone = !isEmail ? `${countryCode}${identifier}` : undefined;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      phone,
      password,
    });

    if (error) {
      console.error("Sign in error:", error);
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-maxmove-900">
            Maxmove
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
              Maxmove
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="flex gap-2">
                <Select
                  value={countryCode}
                  onValueChange={setCountryCode}
                >
                  <SelectTrigger className="w-[140px] bg-white/80 border-0">
                    <SelectValue placeholder="Select code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  placeholder="Email or phone number"
                  className="bg-white/80 border-0 flex-1"
                />
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="bg-white/80 border-0"
              />
              <Button 
                type="submit" 
                className="w-full bg-maxmove-800 hover:bg-maxmove-900"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-maxmove-600">New to Maxmove? </span>
              <Button
                type="button"
                variant="link"
                className="text-maxmove-800 hover:text-maxmove-900 p-0"
                onClick={() => navigate("/account-type-selection")}
              >
                Create an account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;