import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building2, Car } from "lucide-react";

const AccountTypeSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (type: "individual" | "business" | "driver") => {
    switch (type) {
      case "individual":
        navigate("/sign-up?type=individual");
        break;
      case "business":
        navigate("/business");
        break;
      case "driver":
        navigate("/drivers/apply");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maxmove-100 to-maxmove-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-maxmove-900">
            Select an account type
          </h2>
          <p className="mt-4 text-lg text-maxmove-600">
            Choose the type of account that best suits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Individual Account */}
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
                onClick={() => handleSelection("individual")}>
            <CardHeader className="text-center">
              <User className="w-12 h-12 mx-auto text-maxmove-800 mb-4" />
              <CardTitle className="text-xl font-semibold text-maxmove-900">Individual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-maxmove-600 text-center">
                For personal use and small deliveries
              </p>
              <ul className="space-y-2 text-sm text-maxmove-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Fast and simple sign up
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Track deliveries in real-time
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Save favorite locations
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Business Account */}
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleSelection("business")}>
            <CardHeader className="text-center">
              <Building2 className="w-12 h-12 mx-auto text-maxmove-800 mb-4" />
              <CardTitle className="text-xl font-semibold text-maxmove-900">Business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-maxmove-600 text-center">
                For companies and enterprises
              </p>
              <ul className="space-y-2 text-sm text-maxmove-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Bulk delivery management
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Business analytics dashboard
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Priority support
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Driver Account */}
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleSelection("driver")}>
            <CardHeader className="text-center">
              <Car className="w-12 h-12 mx-auto text-maxmove-800 mb-4" />
              <CardTitle className="text-xl font-semibold text-maxmove-900">Driver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-maxmove-600 text-center">
                Join our delivery fleet
              </p>
              <ul className="space-y-2 text-sm text-maxmove-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Flexible working hours
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Competitive earnings
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Choose your vehicle type
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-maxmove-600">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-maxmove-800 hover:text-maxmove-900"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;