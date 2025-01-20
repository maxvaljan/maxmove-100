import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  CreditCard,
  Smartphone,
  Shield,
  Calendar,
  MapPin,
  Check,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Drivers = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Insert into PhoneVerification table
      const { error } = await supabase
        .from("PhoneVerification")
        .insert([{ phone_number: phoneNumber }]);

      if (error) throw error;

      toast({
        title: "Verification code sent!",
        description: "Please check your phone for the verification code.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Benefits Section */}
        <div className="flex-1 p-8">
          <section className="relative bg-maxmove-900 text-white py-24 rounded-lg mb-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Drive With MaxMove
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Be your own boss, set your own schedule, and earn great money
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardHeader>
                <Clock className="w-12 h-12 text-maxmove-800 mb-4" />
                <CardTitle>Flexible Hours</CardTitle>
                <CardDescription>
                  Work whenever you want. No minimum hours required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="w-12 h-12 text-maxmove-800 mb-4" />
                <CardTitle>Great Earnings</CardTitle>
                <CardDescription>
                  Earn competitive rates with bonuses and incentives.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="w-12 h-12 text-maxmove-800 mb-4" />
                <CardTitle>Easy to Use App</CardTitle>
                <CardDescription>
                  Simple, intuitive app for managing deliveries.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Requirements Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-maxmove-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Valid License</h3>
                <p className="text-gray-600">
                  Must have a valid driver's license and clean driving record
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Calendar className="w-12 h-12 text-maxmove-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Vehicle Age</h3>
                <p className="text-gray-600">
                  Vehicle must be less than 10 years old
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <MapPin className="w-12 h-12 text-maxmove-800 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-gray-600">
                  Must be eligible to work in your operating area
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - Application Form */}
        <div className="w-full lg:w-1/3 p-8 bg-gray-50">
          <Card>
            <CardHeader>
              <CardTitle>Start Driving</CardTitle>
              <CardDescription>
                Enter your details to begin the application process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+49"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <Select
                    value={city}
                    onValueChange={setCity}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cologne">Cologne, Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-maxmove-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    "Get Verification Code"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Drivers;