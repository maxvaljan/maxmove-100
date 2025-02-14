
import { Milestone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a,#334155)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Vision for the Future
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Building the next generation of urban logistics infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* 2024 */}
            <Card className="transition-transform hover:scale-105 border border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">2024</span>
                  <Milestone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Market Entry & Initial Growth</CardTitle>
                <CardDescription className="text-gray-600">
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Launch operations in Rhein-Ruhr metropolitan region</li>
                    <li>Establish partnerships with key retailers and businesses</li>
                    <li>Develop and test AI-powered route optimization system</li>
                    <li>Secure EXIST grant funding</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* 2025 */}
            <Card className="transition-transform hover:scale-105 border border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">2025</span>
                  <Milestone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Expansion & Infrastructure Development</CardTitle>
                <CardDescription className="text-gray-600">
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Begin construction of first underground logistics pilot project</li>
                    <li>Expand operations to additional German metropolitan areas</li>
                    <li>Launch autonomous delivery pilot program</li>
                    <li>Develop proprietary delivery management platform</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* 2026 */}
            <Card className="transition-transform hover:scale-105 border border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">2026</span>
                  <Milestone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Innovation & European Expansion</CardTitle>
                <CardDescription className="text-gray-600">
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Complete first underground logistics network</li>
                    <li>Launch operations in major European cities</li>
                    <li>Roll out fleet of autonomous delivery vehicles</li>
                    <li>Establish strategic partnerships across Europe</li>
                  </ul>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* 2027+ */}
            <Card className="transition-transform hover:scale-105 border border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">2027+</span>
                  <Milestone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Future Vision</CardTitle>
                <CardDescription className="text-gray-600">
                  <ul className="list-disc pl-5 space-y-2 mt-2">
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
      </section>

      <Footer />
    </div>
  );
};

export default Roadmap;
