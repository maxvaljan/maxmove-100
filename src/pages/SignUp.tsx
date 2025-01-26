import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { CountryCodeSelect } from "@/components/CountryCodeSelect";

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
  password: z.string().min(6, "Password must be at least 6 characters"),
  marketing: z.boolean().default(false),
});

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const accountType = searchParams.get("type") || "personal";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+49");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-maxmove-900">
            Maxmove
          </h2>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/50 border border-maxmove-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-maxmove-900">
            </CardTitle>
          </CardHeader>
          <CardContent className="-mt-4">
            <Tabs defaultValue={accountType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-maxmove-50/50">
                <TabsTrigger 
                  value="personal"
                  className="data-[state=active]:bg-white data-[state=active]:text-maxmove-900 data-[state=active]:shadow-sm py-3"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger 
                  value="business"
                  className="data-[state=active]:bg-white data-[state=active]:text-maxmove-900 data-[state=active]:shadow-sm py-3"
                >
                  Business
                </TabsTrigger>
                <TabsTrigger 
                  value="driver"
                  className="data-[state=active]:bg-white data-[state=active]:text-maxmove-900 data-[state=active]:shadow-sm py-3"
                >
                  Driver
                </TabsTrigger>
              </TabsList>

              {/* Update the button text and color in each form */}
              <TabsContent value="personal">
                <Form {...personalForm}>
                  <form onSubmit={personalForm.handleSubmit(handleSignUp)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={personalForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="First name" 
                                {...field} 
                                className="bg-white/80 border-0"
                              />
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
                            <FormControl>
                              <Input 
                                placeholder="Last name" 
                                {...field} 
                                className="bg-white/80 border-0"
                              />
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
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Email" 
                              {...field} 
                              className="bg-white/80 border-0"
                            />
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
                          <FormControl>
                            <div className="flex gap-2">
                              <CountryCodeSelect
                                value={countryCode}
                                onChange={setCountryCode}
                              />
                              <Input 
                                className="flex-1 bg-white/80 border-0" 
                                placeholder="Phone number" 
                                {...field} 
                              />
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
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Password" 
                              {...field} 
                              className="bg-white/80 border-0"
                            />
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
                              className="border-maxmove-300 data-[state=checked]:bg-maxmove-600 data-[state=checked]:border-maxmove-600"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <div className="text-sm text-maxmove-600">
                              Keep me updated with offers and news from Maxmove
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        "Sign up"
                      )}
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
                          <FormControl>
                            <Input placeholder="Company name" {...field} className="bg-white/80 border-0" />
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-white/80 border-0">
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
                            <FormControl>
                              <Input placeholder="First name" {...field} className="bg-white/80 border-0" />
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
                            <FormControl>
                              <Input placeholder="Last name" {...field} className="bg-white/80 border-0" />
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
                          <FormControl>
                            <Input type="email" placeholder="Work email" {...field} className="bg-white/80 border-0" />
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
                          <FormControl>
                            <div className="flex gap-2">
                              <CountryCodeSelect
                                value={countryCode}
                                onChange={setCountryCode}
                              />
                              <Input 
                                className="flex-1 bg-white/80 border-0" 
                                placeholder="Phone number" 
                                {...field} 
                              />
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
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} className="bg-white/80 border-0" />
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
                              className="border-maxmove-300 data-[state=checked]:bg-maxmove-600 data-[state=checked]:border-maxmove-600"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <div className="text-sm text-maxmove-600">
                              I'd like to receive offers and promotions from Maxmove
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign up"}
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
                            <FormControl>
                              <Input placeholder="First name" {...field} className="bg-white/80 border-0" />
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
                            <FormControl>
                              <Input placeholder="Last name" {...field} className="bg-white/80 border-0" />
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
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} className="bg-white/80 border-0" />
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
                          <FormControl>
                            <div className="flex gap-2">
                              <CountryCodeSelect
                                value={countryCode}
                                onChange={setCountryCode}
                              />
                              <Input 
                                className="flex-1 bg-white/80 border-0" 
                                placeholder="Phone number" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={driverForm.control}
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
                    <FormField
                      control={driverForm.control}
                      name="marketing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-maxmove-300 data-[state=checked]:bg-maxmove-600 data-[state=checked]:border-maxmove-600"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <div className="text-sm text-maxmove-600">
                              I'd like to receive offers and promotions from Maxmove
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign up"}
                    </Button>
                  </form>
                </Form>
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
