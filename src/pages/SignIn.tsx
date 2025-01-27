import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignUpHeader } from "@/components/signup/SignUpHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { value: "+49", label: "🇩🇪 +49" }, // Germany first
  { value: "+43", label: "🇦🇹 +43" }, // Austria
  { value: "+32", label: "🇧🇪 +32" }, // Belgium
  { value: "+359", label: "🇧🇬 +359" }, // Bulgaria
  { value: "+385", label: "🇭🇷 +385" }, // Croatia
  { value: "+357", label: "🇨🇾 +357" }, // Cyprus
  { value: "+420", label: "🇨🇿 +420" }, // Czech Republic
  { value: "+45", label: "🇩🇰 +45" }, // Denmark
  { value: "+372", label: "🇪🇪 +372" }, // Estonia
  { value: "+358", label: "🇫🇮 +358" }, // Finland
  { value: "+33", label: "🇫🇷 +33" }, // France
  { value: "+30", label: "🇬🇷 +30" }, // Greece
  { value: "+36", label: "🇭🇺 +36" }, // Hungary
  { value: "+353", label: "🇮🇪 +353" }, // Ireland
  { value: "+39", label: "🇮🇹 +39" }, // Italy
  { value: "+371", label: "🇱🇻 +371" }, // Latvia
  { value: "+370", label: "🇱🇹 +370" }, // Lithuania
  { value: "+352", label: "🇱🇺 +352" }, // Luxembourg
  { value: "+356", label: "🇲🇹 +356" }, // Malta
  { value: "+31", label: "🇳🇱 +31" }, // Netherlands
  { value: "+48", label: "🇵🇱 +48" }, // Poland
  { value: "+351", label: "🇵🇹 +351" }, // Portugal
  { value: "+40", label: "🇷🇴 +40" }, // Romania
  { value: "+421", label: "🇸🇰 +421" }, // Slovakia
  { value: "+386", label: "🇸🇮 +386" }, // Slovenia
  { value: "+34", label: "🇪🇸 +34" }, // Spain
  { value: "+46", label: "🇸🇪 +46" }, // Sweden
];

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+49"); // Default to Germany
  const [searchValue, setSearchValue] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const isEmail = identifier.includes('@');
      const email = isEmail ? identifier : undefined;
      const phone = !isEmail ? `${countryCode}${identifier}` : undefined;

      console.log("Attempting sign in with:", { email, phone, password });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        phone,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        
        // Handle specific error cases
        if (error.message === "Invalid login credentials") {
          setErrorMessage("The email/phone or password you entered is incorrect. Please try again.");
        } else if (error.message.includes("User already registered")) {
          setErrorMessage("This account already exists. Please sign in instead.");
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter country codes based on search value
  const filteredCountryCodes = countryCodes.filter(
    code => code.value.includes(searchValue) || code.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignUpHeader />
        
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
          <CardContent className="space-y-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="flex gap-2">
                <Select
                  value={countryCode}
                  onValueChange={(value) => {
                    setCountryCode(value);
                    setSearchValue(value);
                  }}
                >
                  <SelectTrigger className="w-[140px] bg-white/80 border-0">
                    <SelectValue placeholder="Select code">
                      {countryCodes.find(code => code.value === countryCode)?.label || countryCode}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-3 py-2">
                      <Input
                        placeholder="Search country code..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredCountryCodes.map((code) => (
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
                className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white"
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
