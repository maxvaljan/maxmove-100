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
} from "lucide-react";
import { Link } from "react-router-dom";

const Drivers = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-maxmove-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Drive With MaxMove
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Be your own boss, set your own schedule, and earn great money
            </p>
            <Button
              size="lg"
              className="bg-white text-maxmove-900 hover:bg-gray-100"
              asChild
            >
              <Link to="/drivers/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Drive With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </section>

      {/* Requirements Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Requirements
          </h2>
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
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of drivers earning with MaxMove
          </p>
          <Button size="lg" className="bg-maxmove-800 text-white" asChild>
            <Link to="/drivers/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Drivers;