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

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-50 via-white to-maxmove-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <Card className="backdrop-blur-sm bg-white/95 border-maxmove-200 shadow-xl rounded-2xl">
          <CardHeader className="space-y-3 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-maxmove-900">
              Maxmove
            </CardTitle>
          </CardHeader>
          <CardContent>
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

              <TabsContent value="personal">
                <Form {...personalForm}>
                  <form onSubmit={personalForm.handleSubmit(handleSignUp)} className="space-y-6">
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
                                className="border-maxmove-200 focus:border-maxmove-300 focus:ring-maxmove-200 h-11"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
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
                                className="border-maxmove-200 focus:border-maxmove-300 focus:ring-maxmove-200 h-11"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
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
                              className="border-maxmove-200 focus:border-maxmove-300 focus:ring-maxmove-200 h-11"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex">
                              <Select defaultValue="+65">
                                <SelectTrigger className="w-[100px] border-maxmove-200 h-11">
                                  <SelectValue placeholder="+65" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+65">+65</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input 
                                className="flex-1 ml-2 border-maxmove-200 focus:border-maxmove-300 focus:ring-maxmove-200 h-11" 
                                placeholder="Phone number" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-sm" />
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
                              className="border-maxmove-200 focus:border-maxmove-300 focus:ring-maxmove-200 h-11"
                            />
                          </FormControl>
                          <FormMessage className="text-sm" />
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
                      className="w-full bg-maxmove-600 hover:bg-maxmove-700 text-white h-11 font-medium transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        "Create Account"
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
                            <Input placeholder="Company name" {...field} className="border-maxmove-200 h-11" />
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
                              <SelectTrigger className="h-11 border-maxmove-200">
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
                              <Input placeholder="First name" {...field} className="border-maxmove-200 h-11" />
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
                              <Input placeholder="Last name" {...field} className="border-maxmove-200 h-11" />
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
                            <Input type="email" placeholder="Work email" {...field} className="border-maxmove-200 h-11" />
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
                            <div className="flex">
                              <Select defaultValue="+65">
                                <SelectTrigger className="w-[100px] border-maxmove-200 h-11">
                                  <SelectValue placeholder="+65" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+65">+65</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input 
                                className="flex-1 ml-2 border-maxmove-200 h-11" 
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
                            <Input type="password" placeholder="Password" {...field} className="border-maxmove-200 h-11" />
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
                    <Button type="submit" className="w-full bg-maxmove-600 hover:bg-maxmove-700 text-white h-11" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
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
                              <Input placeholder="First name" {...field} className="border-maxmove-200 h-11" />
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
                              <Input placeholder="Last name" {...field} className="border-maxmove-200 h-11" />
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
                            <Input type="email" placeholder="Email" {...field} className="border-maxmove-200 h-11" />
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
                            <div className="flex">
                              <Select defaultValue="+65">
                                <SelectTrigger className="w-[100px] border-maxmove-200 h-11">
                                  <SelectValue placeholder="+65" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="+65">+65</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input 
                                className="flex-1 ml-2 border-maxmove-200 h-11" 
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
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 border-maxmove-200">
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
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} className="border-maxmove-200 h-11" />
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
                    <Button type="submit" className="w-full bg-maxmove-600 hover:bg-maxmove-700 text-white h-11" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-maxmove-600">
              By signing up, you agree to our{" "}
              <Button 
                variant="link" 
                className="p-0 text-maxmove-800 hover:text-maxmove-900 font-semibold" 
                onClick={() => navigate("/terms")}
              >
                Terms & Conditions
              </Button>{" "}
              and{" "}
              <Button 
                variant="link" 
                className="p-0 text-maxmove-800 hover:text-maxmove-900 font-semibold" 
                onClick={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-maxmove-600">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-maxmove-800 hover:text-maxmove-900 font-semibold" 
                onClick={() => navigate("/signin")}
              >
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
