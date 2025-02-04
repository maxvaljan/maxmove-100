import { ArrowRight, Building2, Clock, CreditCard, FileText, Globe2, HeartHandshake, LayoutDashboard, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Business = () => {
  const handleContactSales = () => {
    window.location.href = "mailto:sales@maxmove.com";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-maxmove-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#334155)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Maxmove for Business
            </h1>
            <p className="text-xl md:text-2xl text-maxmove-200 mb-8 max-w-3xl mx-auto">
              Streamline your logistics operations with our enterprise-grade delivery solutions
            </p>
            <Button 
              size="lg" 
              className="bg-maxmove-500 hover:bg-maxmove-600"
              onClick={handleContactSales}
            >
              Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Maxmove Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessFeatures.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-maxmove-500 transition-all">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-maxmove-500 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Seamless Integration</h2>
              <p className="text-lg text-gray-600 mb-8">
                Connect Maxmove with your existing systems through our robust API. Automate your delivery operations and scale your business efficiently.
              </p>
              <ul className="space-y-4">
                {integrationFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-maxmove-500" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:ml-auto">
              <div className="bg-white p-8 rounded-xl shadow-2xl">
                <pre className="bg-maxmove-900 text-maxmove-50 p-6 rounded-lg overflow-x-auto">
                  <code>{`
// Example API Integration
const delivery = await maxmove.createDelivery({
  pickup: {
    address: "123 Business St",
    contact: "+1234567890"
  },
  dropoff: {
    address: "456 Customer Ave",
    contact: "+0987654321"
  },
  type: "express"
});`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-maxmove-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Delivery Operations?</h2>
          <p className="text-xl text-maxmove-200 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Maxmove for their delivery needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default">
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-maxmove-950">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const businessFeatures = [
  {
    icon: Building2,
    title: "Enterprise Dashboard",
    description: "Manage all your deliveries from a centralized dashboard with real-time tracking and analytics."
  },
  {
    icon: Truck,
    title: "Fleet Management",
    description: "Access our vast network of verified drivers and vehicles to meet your delivery demands."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated account managers and round-the-clock support for your business needs."
  },
  {
    icon: CreditCard,
    title: "Flexible Billing",
    description: "Monthly invoicing, multiple payment options, and detailed expense reports."
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description: "Generate detailed reports and analytics to optimize your delivery operations."
  },
  {
    icon: HeartHandshake,
    title: "Service Guarantee",
    description: "Reliable delivery service with insurance coverage and satisfaction guarantee."
  }
];

const integrationFeatures = [
  {
    icon: Globe2,
    title: "RESTful API",
    description: "Easy-to-use API endpoints for seamless integration with your existing systems."
  },
  {
    icon: LayoutDashboard,
    title: "Webhooks",
    description: "Real-time delivery updates and notifications through webhook events."
  }
];

export default Business;