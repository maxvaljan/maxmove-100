
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CountryCodeSelect } from "@/components/CountryCodeSelect";

const signInSchema = z.object({
  identifier: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+49");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    try {
      setIsLoading(true);
      const isEmail = values.identifier.includes('@');
      console.log(`Attempting to sign in with ${isEmail ? 'email' : 'phone'}...`);
      
      const credentials = isEmail 
        ? { 
            email: values.identifier, 
            password: values.password 
          }
        : { 
            phone: `${countryCode}${values.identifier}`,
            password: values.password 
          };

      const { data, error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      if (!data.user) {
        throw new Error("No user data returned");
      }

      console.log("Sign in successful, fetching user profile...");
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      console.log("User role:", profile?.role);

      // Redirect based on role
      if (profile?.role === 'driver') {
        console.log("Redirecting to driver dashboard...");
        navigate('/driver-dashboard', { replace: true });
      } else {
        console.log("Redirecting to regular dashboard...");
        navigate('/dashboard', { replace: true });
      }

      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error("Sign in error:", error);
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email/phone or password");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Please confirm your email address before signing in");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <CountryCodeSelect
                    value={countryCode}
                    onChange={setCountryCode}
                  />
                  <Input
                    placeholder="Email or phone number"
                    {...field}
                    className="flex-1 bg-white/80 border-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  {...field}
                  className="bg-white/80 border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
};
