import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-maxmove-900 sm:text-5xl">
            About Maxmove
          </h1>
          <p className="mt-4 text-xl text-maxmove-600 max-w-3xl mx-auto">
            We're revolutionizing the way businesses and individuals handle their delivery needs with technology-driven solutions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-maxmove-900">Our Mission</h2>
              <p className="mt-4 text-lg text-maxmove-600">
                To provide reliable, efficient, and sustainable delivery solutions that empower businesses and connect communities. We believe in making delivery services accessible to everyone while maintaining the highest standards of quality and customer satisfaction.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-maxmove-900 mb-4">Key Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-maxmove-700">
                  <span className="w-32 font-semibold">Founded</span>
                  <span>2025</span>
                </li>
                <li className="flex items-center text-maxmove-700">
                  <span className="w-32 font-semibold">Headquarters</span>
                  <span>San Francisco, CA</span>
                </li>
                <li className="flex items-center text-maxmove-700">
                  <span className="w-32 font-semibold">Coverage</span>
                  <span>50+ Cities</span>
                </li>
                <li className="flex items-center text-maxmove-700">
                  <span className="w-32 font-semibold">Fleet Size</span>
                  <span>10,000+ Drivers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-maxmove-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-maxmove-100">
            <h3 className="text-xl font-semibold text-maxmove-900 mb-3">Innovation</h3>
            <p className="text-maxmove-600">
              Continuously improving our technology to provide better delivery experiences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-maxmove-100">
            <h3 className="text-xl font-semibold text-maxmove-900 mb-3">Reliability</h3>
            <p className="text-maxmove-600">
              Ensuring consistent and dependable service for all our customers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-maxmove-100">
            <h3 className="text-xl font-semibold text-maxmove-900 mb-3">Sustainability</h3>
            <p className="text-maxmove-600">
              Committed to reducing our environmental impact through eco-friendly practices.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-maxmove-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-maxmove-900 text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Mail className="h-8 w-8 text-maxmove-600 mb-4" />
              <h3 className="text-lg font-semibold text-maxmove-900 mb-2">Email Us</h3>
              <p className="text-maxmove-600 text-center">contact@maxmove.com</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <Phone className="h-8 w-8 text-maxmove-600 mb-4" />
              <h3 className="text-lg font-semibold text-maxmove-900 mb-2">Call Us</h3>
              <p className="text-maxmove-600 text-center">+491734224371</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;