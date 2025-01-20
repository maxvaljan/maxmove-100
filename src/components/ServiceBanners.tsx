import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ServiceBanners = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["anything", "anytime", "anywhere", "with any vehicle"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-start items-center mb-12 pl-4">
        <h1 className="text-5xl md:text-7xl tracking-tighter font-bold flex items-center whitespace-nowrap">
          <span className="text-maxmove-600 mr-4">Move</span>
          <span className="text-maxmove-600 relative h-[1.2em] overflow-hidden inline-block min-w-[700px] translate-y-[-6px]">
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute left-0 right-0 whitespace-nowrap"
                initial={{ opacity: 0, y: "-100" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? {
                        y: 0,
                        opacity: 1,
                      }
                    : {
                        y: titleNumber > index ? -150 : 150,
                        opacity: 0,
                      }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>
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