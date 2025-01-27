import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";

export const SignInForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+49"); // Default to Germany

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

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-2">
        <CountryCodeSelect value={countryCode} onChange={setCountryCode} />
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
  );
};