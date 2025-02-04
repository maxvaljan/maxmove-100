import { ChartBar, DollarSign, PiggyBank, ChartLine, TrendingUp, Globe2, Shield, Rocket } from "lucide-react";
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

const Investment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-maxmove-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#334155)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Invest in the Future of Logistics
            </h1>
            <p className="text-xl md:text-2xl text-maxmove-200 mb-8 max-w-3xl mx-auto animate-slide-up">
              Join Maxmove in becoming Europe's largest last mile delivery platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-maxmove-500 hover:bg-maxmove-600 animate-slide-up"
                onClick={() => window.location.href = "mailto:max@maxmove.com"}
              >
                Contact Founders
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Market Growth</CardTitle>
                <CardDescription>35% YoY growth in the last mile logistics market</CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <Globe2 className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Expansion</CardTitle>
                <CardDescription>Start in Europe's leading economic powerhouse and one of most densely populated areas - the Rhein-Ruhr region and expand from there to whole Europe</CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <Shield className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Technology</CardTitle>
                <CardDescription>State-of-the-art technology with AI-driven route optimization and matching</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Future</h2>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="transition-transform hover:scale-105">
                <CardHeader>
                  <Rocket className="h-12 w-12 text-maxmove-500 mb-4" />
                  <CardTitle>Underground Hyperlogistics</CardTitle>
                  <CardDescription>
                    Building the future of urban logistics with underground pipeline networks. 
                    Leveraging existing infrastructure to deploy autonomous robots that can deliver 
                    anything in less than 15 minutes from central warehouses to stations distributed 
                    throughout the city.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="transition-transform hover:scale-105">
                <CardHeader>
                  <ChartLine className="h-12 w-12 text-maxmove-500 mb-4" />
                  <CardTitle>Autonomous Delivery</CardTitle>
                  <CardDescription>
                    Pioneering the future of delivery with a dual approach: launching Europe's first 
                    comprehensive drone delivery network and introducing autonomous vehicle delivery 
                    systems to revolutionize urban logistics.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What is Hyperlogistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What is Hyperlogistics?</h2>
            <p className="text-lg text-gray-600">
              Hyperlogistics means ultra-fast delivery, where items can move across cities in minutes or even seconds, 
              at a minimal cost. This redefines how we think about and access goods.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-maxmove-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growth Journey</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default"
              className="bg-maxmove-500 hover:bg-maxmove-600"
              onClick={() => window.location.href = "mailto:max@maxmove.com"}
            >
              Contact Founders
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investment;