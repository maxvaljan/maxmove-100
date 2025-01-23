import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ServiceBanners = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["anything", "anytime", "anywhere"],
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
    <section className="relative">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/lovable-uploads/9f98714f-866c-4d20-8ec1-e7c817c7265c.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '1',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/60"></div>
      </div>

      {/* Content */}
      <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center mb-12 pl-4">
          <h1 className="text-5xl md:text-7xl tracking-tighter font-bold flex flex-col md:flex-row items-start md:items-center">
            <span className="text-maxmove-800 mr-4">Move</span>
            <span className="text-maxmove-800 relative h-[1.2em] overflow-hidden inline-block min-w-[200px] md:min-w-[700px] md:mt-0 -translate-y-[3px] md:translate-y-[6px]">
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
          {/* Move Banner */}
          <Link 
            to="/book" 
            className="group relative overflow-hidden rounded-none bg-white/40 backdrop-blur p-5 transition-all hover:bg-maxmove-600/90 h-[250px] flex flex-col cursor-pointer hover:scale-[1.02] transform duration-300"
          >
            <Truck className="h-12 w-12 text-maxmove-800 group-hover:text-white transition-colors mb-4" />
            <h3 className="text-2xl font-bold text-maxmove-800 group-hover:text-white transition-colors mb-2">Move</h3>
            <p className="text-maxmove-800 group-hover:text-white/90 transition-colors mb-auto">
              You need to move something?
            </p>
            <Button
              className="bg-maxmove-800 text-white group-hover:bg-white group-hover:text-maxmove-800 hover:bg-white/90 group w-fit pointer-events-none"
            >
              Book Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Business Banner */}
          <Link 
            to="/business" 
            className="group relative overflow-hidden rounded-none bg-white/40 backdrop-blur p-5 transition-all hover:bg-maxmove-600/90 h-[250px] flex flex-col cursor-pointer hover:scale-[1.02] transform duration-300"
          >
            <Building2 className="h-12 w-12 text-maxmove-800 group-hover:text-white transition-colors mb-4" />
            <h3 className="text-2xl font-bold text-maxmove-800 group-hover:text-white transition-colors mb-2">Business</h3>
            <p className="text-maxmove-800 group-hover:text-white/90 transition-colors mb-auto">
              On-demand logistics, outsourcing or partner with Maxmove?
            </p>
            <Button
              className="bg-maxmove-800 text-white group-hover:bg-white group-hover:text-maxmove-800 hover:bg-white/90 group w-fit pointer-events-none"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Driver Banner */}
          <Link 
            to="/drivers" 
            className="group relative overflow-hidden rounded-none bg-white/40 backdrop-blur p-5 transition-all hover:bg-maxmove-600/90 h-[250px] flex flex-col cursor-pointer hover:scale-[1.02] transform duration-300"
          >
            <Users className="h-12 w-12 text-maxmove-800 group-hover:text-white transition-colors mb-4" />
            <h3 className="text-2xl font-bold text-maxmove-800 group-hover:text-white transition-colors mb-2">Driver</h3>
            <p className="text-maxmove-800 group-hover:text-white/90 transition-colors mb-auto">
              Become driver at Maxmove. Flexible and great earnings.
            </p>
            <Button
              className="bg-maxmove-800 text-white group-hover:bg-white group-hover:text-maxmove-800 hover:bg-white/90 group w-fit pointer-events-none"
            >
              Join Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanners;