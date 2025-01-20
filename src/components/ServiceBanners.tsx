import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceBanners = () => {
  return (
    <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-maxmove-900 text-center mb-12">
        Move Anything, Anytime, Anywhere
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Move Now Banner */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F97316] to-[#FDBA74] p-6 transition-all hover:shadow-lg">
          <Truck className="h-12 w-12 text-white mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Move Now</h3>
          <p className="text-white/90 mb-6">
            Instant delivery solutions for your immediate needs. Fast, reliable, and
            secure.
          </p>
          <Button
            asChild
            className="bg-white text-[#F97316] hover:bg-white/90 group"
          >
            <Link to="/book">
              Book Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Business Banner */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-maxmove-800 to-maxmove-600 p-6 transition-all hover:shadow-lg">
          <Building2 className="h-12 w-12 text-white mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
          <p className="text-white/90 mb-6">
            Tailored logistics solutions for businesses. Scale your operations
            across Europe.
          </p>
          <Button
            asChild
            className="bg-white text-maxmove-800 hover:bg-white/90 group"
          >
            <Link to="/business">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Drivers Banner */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#7DD3FC] p-6 transition-all hover:shadow-lg">
          <Users className="h-12 w-12 text-white mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Drivers</h3>
          <p className="text-white/90 mb-6">
            Join our network of professional drivers. Flexible hours, great
            earnings.
          </p>
          <Button
            asChild
            className="bg-white text-[#0EA5E9] hover:bg-white/90 group"
          >
            <Link to="/drivers">
              Join Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanners;