import { Milestone, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const Roadmap = () => {
  return <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Our Vision for the Future
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">Building the next generation of logistics infrastructure.</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/30 top-0" />

          <div className="space-y-24">
            {/* 2024 */}
            <div className="relative">
              <ArrowDown className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-8 h-8 text-blue-500 animate-bounce" />
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-blue-500/20 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Q1-Q4 2025</span>
                    <Milestone className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-white text-2xl">Development & MArket Entry</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    <ul className="list-disc pl-5 space-y-3 mt-4">
                      <li>Launch operations in Rhein-Ruhr metropolitan region</li>
                      <li>Develop scalable state of the art applications, with integrated AI route optimization, AI matching and AI agents </li>
                      <li>Secure EXIST Grant Funding and recruit Team.</li>
                      <li>Start prototyping and planning autonomous underground delivery robot and network.</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* 2025 */}
            <div className="relative">
              <ArrowDown className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-8 h-8 text-blue-500 animate-bounce" />
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-blue-500/20 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Q1-Q2 2026</span>
                    <Milestone className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-white text-2xl">Expansion & Infrastructure Development</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    <ul className="list-disc pl-5 space-y-3 mt-4">
                      <li>Begin construction of first underground logistics pilot project and autonomous Robots</li>
                      <li>🚀 Start Fundraising: Goal $12M for Underground Hyperlogistics Platform & Autonomous Robot Production</li>
                      <li>
                    </li>
                      <li>Expand with Maxmove Platform</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* 2026 */}
            <div className="relative">
              <ArrowDown className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-8 h-8 text-blue-500 animate-bounce" />
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-blue-500/20 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">2026</span>
                    <Milestone className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-white text-2xl">Innovation & European Expansion</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    <ul className="list-disc pl-5 space-y-3 mt-4">
                      <li>Complete first underground logistics network</li>
                      <li>Launch operations in major European cities</li>
                      <li>Roll out fleet of autonomous delivery vehicles</li>
                      <li>Establish strategic partnerships across Europe</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* 2027+ */}
            <div className="relative">
              <ArrowDown className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-8 h-8 text-blue-500 animate-bounce" />
              <Card className="transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-blue-500/20 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">2027+</span>
                    <Milestone className="h-8 w-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-white text-2xl">Future Vision</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    <ul className="list-disc pl-5 space-y-3 mt-4">
                      <li>Scale underground logistics networks across Europe</li>
                      <li>Achieve full automation of delivery operations</li>
                      <li>Establish Maxmove as Europe's leading logistics platform</li>
                      <li>Drive innovation in sustainable urban logistics</li>
                    </ul>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Roadmap;