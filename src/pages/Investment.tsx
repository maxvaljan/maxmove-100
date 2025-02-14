import { ChartBar, DollarSign, PiggyBank, ChartLine, TrendingUp, Globe2, Shield, Rocket, FileText, Download } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
              Invest in the Future of Logistics
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-slide-up">
              Join Maxmove in becoming Europe's largest last mile delivery platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white animate-slide-up backdrop-blur-sm"
                onClick={() => window.location.href = "mailto:max@maxmove.com"}
              >
                Contact Founders
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Backed by Science Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Backed by Science</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-gray-800 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">McKinsey Report</CardTitle>
                <CardDescription className="text-gray-400">
                  The Future of Last-Mile Logistics: Latest Market Insights and Growth Projections
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-gray-700 text-gray-300 hover:bg-white/5"
                  disabled
                >
                  <Download className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-gray-800 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Deloitte Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Underground Logistics Networks: A Revolutionary Approach to Urban Delivery
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-gray-700 text-gray-300 hover:bg-white/5"
                  disabled
                >
                  <Download className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-gray-800 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">BMVI Report</CardTitle>
                <CardDescription className="text-gray-400">
                  Innovationsprogramm Logistik 2023: Future of Urban Mobility and Delivery
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-gray-700 text-gray-300 hover:bg-white/5"
                  disabled
                >
                  <Download className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c2e]/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#1a1c2e]/40 backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/60 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Market Growth</CardTitle>
                <CardDescription className="text-gray-400">Capitalizing on the explosive 35% year-over-year growth in the last-mile logistics market, driven by increasing e-commerce adoption and changing consumer preferences.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-[#1a1c2e]/40 backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/60 transition-all duration-300">
              <CardHeader>
                <Globe2 className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Strategic Expansion</CardTitle>
                <CardDescription className="text-gray-400">Launching in the Rhein-Ruhr metropolitan region, Germany's economic powerhouse with 10+ million inhabitants, before strategic expansion across key European markets.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-[#1a1c2e]/40 backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/60 transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Advanced Technology</CardTitle>
                <CardDescription className="text-gray-400">Proprietary AI-powered platform featuring real-time route optimization, intelligent driver matching, and predictive demand forecasting for maximum operational efficiency.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c2e]/30 to-[#0d0f1a]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Future</h2>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-[#1a1c2e]/40 backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/60 transition-all duration-300">
                <CardHeader>
                  <Rocket className="h-12 w-12 text-blue-500 mb-4" />
                  <CardTitle className="text-white">Underground Hyperlogistics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Building the future of urban logistics with underground pipeline networks. 
                    Leveraging existing infrastructure to deploy autonomous robots that can deliver 
                    anything in less than 15 minutes from central warehouses to stations distributed 
                    throughout the city.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-[#1a1c2e]/40 backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/60 transition-all duration-300">
                <CardHeader>
                  <ChartLine className="h-12 w-12 text-blue-500 mb-4" />
                  <CardTitle className="text-white">Autonomous Delivery</CardTitle>
                  <CardDescription className="text-gray-400">
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

      {/* Funding Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c2e]/30 to-[#0d0f1a]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Funding</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-[#1a1c2e]/40 backdrop-blur-sm border-gray-800 hover:bg-[#1a1c2e]/60 transition-all duration-300">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle className="text-white">Current Funding Round</CardTitle>
                <CardDescription className="text-gray-400">
                  We are currently in the process for EXIST grant and looking to raise €15M next year 
                  to build the first underground autonomous robots logistics pilot project. This funding will 
                  enable us to revolutionize urban logistics with cutting-edge autonomous technology.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What is Hyperlogistics Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c2e]/30 to-[#0d0f1a]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">What is Hyperlogistics?</h2>
            <p className="text-lg text-gray-400">
              Hyperlogistics means ultra-fast delivery, where items can move across cities in minutes or even seconds, 
              at a minimal cost. This redefines how we think about and access goods.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c2e]/30 to-[#0d0f1a]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Join Our Growth Journey</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white backdrop-blur-sm"
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
