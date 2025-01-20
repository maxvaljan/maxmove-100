import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Phone, MapPin, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "Please select a city"),
  vehicleType: z.enum(["bike", "car", "van", "truck"]),
  vehicleNumber: z.string().min(5, "Please enter a valid vehicle number"),
});

const DriverApplication = () => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      vehicleType: "car",
      vehicleNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!verificationSent) {
        // Send verification code
        const { data, error } = await supabase
          .from("PhoneVerification")
          .insert([
            {
              phone_number: values.phone,
              verification_code: Math.floor(100000 + Math.random() * 900000).toString(),
            },
          ])
          .select();

        if (error) throw error;

        setVerificationSent(true);
        toast({
          title: "Verification Code Sent",
          description: "Please check your phone for the verification code.",
        });
      } else {
        // Verify code and submit application
        const { data: verificationData, error: verificationError } = await supabase
          .from("PhoneVerification")
          .select()
          .eq("phone_number", values.phone)
          .eq("verification_code", verificationCode)
          .single();

        if (verificationError || !verificationData) {
          toast({
            variant: "destructive",
            title: "Invalid verification code",
            description: "Please enter the correct verification code.",
          });
          return;
        }

        // Create driver record
        const { error: driverError } = await supabase.from("Driver").insert([
          {
            id: (await supabase.auth.getUser()).data.user?.id,
            vehicle_type: values.vehicleType,
            vehicle_number: values.vehicleNumber,
            status: "offline",
            latitude: 0,
            longitude: 0,
            phone_number: values.phone,
            city: values.city,
          },
        ]);

        if (driverError) throw driverError;

        toast({
          title: "Application Submitted",
          description: "Your driver application has been submitted successfully!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Driver Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" placeholder="John Doe" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            className="pl-10"
                            placeholder="+1234567890"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            className="pl-10"
                            placeholder="Enter your city"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bike">Bike</SelectItem>
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
                  control={form.control}
                  name="vehicleNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter vehicle number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {verificationSent && (
                  <div className="space-y-2">
                    <FormLabel>Verification Code</FormLabel>
                    <div className="relative">
                      <CheckCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {verificationSent ? "Submit Application" : "Send Verification Code"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverApplication;