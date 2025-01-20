import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Clock, Shield } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-maxmove-50 to-white pt-20">
      <div className="text-center">
        <span className="inline-block animate-fade-in bg-maxmove-100 text-maxmove-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          Reliable Delivery Across Europe
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-maxmove-900 mb-6 animate-slide-up">
          Fast & Reliable
          <br />
          <span className="text-maxmove-700">Delivery Solutions</span>
        </h1>
        <p className="text-lg text-maxmove-600 mb-8 max-w-2xl mx-auto animate-slide-up">
          Experience seamless delivery services across Europe with our
          professional fleet and dedicated drivers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-slide-up">
          <Button
            size="lg"
            className="bg-maxmove-800 hover:bg-maxmove-900 text-white group"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-maxmove-200 hover:bg-maxmove-50"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Package,
              title: "Express Delivery",
              description: "Same-day delivery across major European cities",
            },
            {
              icon: Clock,
              title: "Real-time Tracking",
              description: "Track your deliveries with precision",
            },
            {
              icon: Shield,
              title: "Secure Transport",
              description: "Your items are fully insured during transit",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            >
              <feature.icon className="h-10 w-10 text-maxmove-700 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-maxmove-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-maxmove-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-maxmove-100 rounded-full filter blur-3xl opacity-50 animate-float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-maxmove-100 rounded-full filter blur-3xl opacity-50 animate-float" />
    </div>
  );
};

export default Hero;