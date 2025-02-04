import { ChartBar, DollarSign, PiggyBank, ChartLine } from "lucide-react";
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
      <section className="relative py-20 bg-maxmove-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#334155)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Invest in the Future of Delivery
            </h1>
            <p className="text-xl md:text-2xl text-maxmove-200 mb-8 max-w-3xl mx-auto">
              Join us in revolutionizing the last-mile delivery industry
            </p>
            <Button 
              size="lg" 
              className="bg-maxmove-500 hover:bg-maxmove-600"
              onClick={() => window.location.href = "mailto:investors@maxmove.com"}
            >
              Contact Investor Relations
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Invest in Maxmove</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <ChartBar className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Market Growth</CardTitle>
                <CardDescription>20% YoY growth in the last-mile delivery market</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Strong revenue growth with expanding margins</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <PiggyBank className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Profitability</CardTitle>
                <CardDescription>Proven path to profitability with efficient operations</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <ChartLine className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Innovation</CardTitle>
                <CardDescription>Leading technology in route optimization and automation</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Investment Highlights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why Maxmove is positioned for long-term success in the delivery industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Market Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Leading market share in key metropolitan areas</li>
                  <li>• Strong brand recognition and customer loyalty</li>
                  <li>• Expanding international presence</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Technology Edge</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Proprietary route optimization algorithms</li>
                  <li>• AI-powered demand prediction</li>
                  <li>• Industry-leading mobile platform</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Consistent revenue growth</li>
                  <li>• Strong unit economics</li>
                  <li>• Healthy cash flow generation</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Strategic market expansion</li>
                  <li>• New service offerings development</li>
                  <li>• Continuous technology innovation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-maxmove-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Invest in Maxmove?</h2>
          <p className="text-xl text-maxmove-200 mb-8 max-w-2xl mx-auto">
            Contact our investor relations team to learn more about investment opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default"
              onClick={() => window.location.href = "mailto:investors@maxmove.com"}
            >
              Contact Investor Relations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-maxmove-950"
              onClick={() => window.location.href = "/about"}
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investment;