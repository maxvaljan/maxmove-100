import { ChartBar, DollarSign, PiggyBank, ChartLine, TrendingUp, Users, Globe2, Shield } from "lucide-react";
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
              Invest in the Future of Urban Logistics
            </h1>
            <p className="text-xl md:text-2xl text-maxmove-200 mb-8 max-w-3xl mx-auto animate-slide-up">
              Join Maxmove in revolutionizing last-mile delivery across the Rhein-Ruhr region and beyond
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-maxmove-500 hover:bg-maxmove-600 animate-slide-up"
                onClick={() => window.location.href = "mailto:investors@maxmove.com"}
              >
                Contact Investor Relations
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white hover:bg-white/10 animate-slide-up"
                onClick={() => window.open("/investment-deck.pdf", "_blank")}
              >
                Download Investment Deck
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Investment Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Market Growth</CardTitle>
                <CardDescription>35% YoY growth in the urban logistics market with expanding opportunities</CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <Users className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>User Base</CardTitle>
                <CardDescription>100,000+ active users and 1,000+ business partners in the Rhein-Ruhr region</CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <Globe2 className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Expansion</CardTitle>
                <CardDescription>Strategic expansion plans to key European metropolitan areas</CardDescription>
              </CardHeader>
            </Card>
            <Card className="transition-transform hover:scale-105">
              <CardHeader>
                <Shield className="h-12 w-12 text-maxmove-500 mb-4" />
                <CardTitle>Technology</CardTitle>
                <CardDescription>Proprietary AI-driven logistics platform with multiple patents pending</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Section */}
      <section className="py-20 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Invest in Maxmove</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building the future of urban logistics with innovative technology and sustainable practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Market Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dominant market position in the Rhein-Ruhr metropolitan region</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Strategic partnerships with major retailers and e-commerce platforms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Proven track record of successful market penetration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Technology Edge</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>AI-powered route optimization reducing delivery times by 40%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Real-time tracking and predictive analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Sustainable delivery solutions reducing carbon footprint</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Strong revenue growth with 150% YoY increase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Robust unit economics with improving margins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Clear path to profitability with scalable business model</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Expansion to key European markets in next 24 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Development of new service verticals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Strategic M&A opportunities in complementary sectors</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-maxmove-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growth Journey</h2>
          <p className="text-xl text-maxmove-200 mb-8 max-w-2xl mx-auto">
            Connect with our investor relations team to learn more about investment opportunities and our vision for the future of urban logistics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default"
              className="bg-maxmove-500 hover:bg-maxmove-600"
              onClick={() => window.location.href = "mailto:investors@maxmove.com"}
            >
              Contact Investor Relations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
              onClick={() => window.open("/investment-deck.pdf", "_blank")}
            >
              Download Investment Deck
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investment;