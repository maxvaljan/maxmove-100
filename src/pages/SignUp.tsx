import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const personalFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  marketing: z.boolean().default(false),
});

const businessFormSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Please select an industry"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  workEmail: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  marketing: z.boolean().default(false),
});

const driverFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Invalid phone number"),
  vehicleType: z.string().min(2, "Please select a vehicle type"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  marketing: z.boolean().default(false),
});

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const accountType = searchParams.get("type") || "personal";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const personalForm = useForm({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      marketing: false,
    },
  });

  const businessForm = useForm({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      firstName: "",
      lastName: "",
      workEmail: "",
      phoneNumber: "",
      password: "",
      marketing: false,
    },
  });

  const driverForm = useForm({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      vehicleType: "",
      password: "",
      marketing: false,
    },
  });

  const handleSignUp = async (data: any) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: data.email || data.workEmail,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            account_type: accountType,
            ...(accountType === "business" && {
              company_name: data.companyName,
              industry: data.industry,
            }),
            ...(accountType === "driver" && {
              vehicle_type: data.vehicleType,
            }),
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      });
      
      navigate("/signin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/account`,
          queryParams: {
            account_type: accountType,
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-maxmove-900">
              Create your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={accountType} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="driver">Driver</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Form {...personalForm}>
                  <form onSubmit={personalForm.handleSubmit(handleSignUp)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={personalForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={personalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Select defaultValue="+65">
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="+65" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+65">+65</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input className="flex-1 ml-2" placeholder="91234567" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalForm.control}
                      name="marketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I'd like to receive offers and promotions from Maxmove
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      Sign Up
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="business">
                <Form {...businessForm}>
                  <form onSubmit={businessForm.handleSubmit(handleSignUp)} className="space-y-4">
                    <FormField
                      control={businessForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company name</FormLabel>
                          <FormControl>
                            <Input placeholder="Company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={businessForm.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="services">Services</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={businessForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={businessForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={businessForm.control}
                      name="workEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={businessForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Select defaultValue="+65">
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="+65" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+65">+65</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input className="flex-1 ml-2" placeholder="91234567" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={businessForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={businessForm.control}
                      name="marketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I'd like to receive offers and promotions from Maxmove
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      Sign Up
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="driver">
                <Form {...driverForm}>
                  <form onSubmit={driverForm.handleSubmit(handleSignUp)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={driverForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={driverForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={driverForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Select defaultValue="+65">
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue placeholder="+65" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+65">+65</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input className="flex-1 ml-2" placeholder="91234567" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="motorcycle">Motorcycle</SelectItem>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="truck">Truck</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
                      name="marketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I'd like to receive offers and promotions from Maxmove
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      Sign Up
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-maxmove-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-maxmove-600">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignUp('facebook')}
                  disabled={isLoading}
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignUp('google')}
                  disabled={isLoading}
                >
                  Google
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-maxmove-600">
              By signing up, you agree to our{" "}
              <Button variant="link" className="p-0 text-maxmove-800 hover:text-maxmove-900" onClick={() => navigate("/terms")}>
                Terms & Conditions
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 text-maxmove-800 hover:text-maxmove-900" onClick={() => navigate("/privacy-policy")}>
                Privacy Policy
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-maxmove-600">
              Already have an account?{" "}
              <Button variant="link" className="p-0 text-maxmove-800 hover:text-maxmove-900" onClick={() => navigate("/signin")}>
                Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;