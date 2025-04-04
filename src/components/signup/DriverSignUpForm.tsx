import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PhoneInput } from "./PhoneInput";
import { MarketingConsent } from "./MarketingConsent";
import { useState } from "react";

const driverFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  marketing: z.boolean().default(false),
});

interface DriverSignUpFormProps {
  onSubmit: (data: z.infer<typeof driverFormSchema>) => void;
  isLoading: boolean;
}

export const DriverSignUpForm = ({ onSubmit, isLoading }: DriverSignUpFormProps) => {
  const [countryCode, setCountryCode] = useState("+49");

  const form = useForm<z.infer<typeof driverFormSchema>>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      marketing: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof driverFormSchema>) => {
    // Format the phone number with country code
    const formattedData = {
      ...data,
      phoneNumber: `${countryCode}${data.phoneNumber}`,
    };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First name" {...field} className="bg-white/80 border-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last name" {...field} className="bg-white/80 border-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} className="bg-white/80 border-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhoneInput form={form} countryCode={countryCode} setCountryCode={setCountryCode} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} className="bg-white/80 border-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MarketingConsent form={form} />
        <Button 
          type="submit" 
          className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};