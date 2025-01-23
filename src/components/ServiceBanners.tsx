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
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/18efedbc-fa85-4a03-978b-d62558e7ea5b.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          marginTop: "-80px"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[80vh]">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4 flex items-center">
            <span className="mr-4">Move</span>
            <span className="relative inline-flex items-center h-[1.2em] overflow-hidden min-w-[250px] md:min-w-[350px]">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute whitespace-nowrap"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={
                    titleNumber === index
                      ? {
                          y: "0%",
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? "-100%" : "100%",
                          opacity: 0,
                        }
                  }
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-12">On-demand delivery platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Move Banner */}
          <Link 
            to="/book" 
            className="group relative overflow-hidden p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30"
          >
            <Truck className="h-12 w-12 text-white group-hover:text-white transition-colors mb-4" />
            <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors mb-2">Move</h3>
            <p className="text-white/90 group-hover:text-white transition-colors mb-auto">
              Fast delivery for personal customers at anytime to anywhere
            </p>
            <Button
              className="mt-4 bg-maxmove-600 text-white group-hover:bg-white group-hover:text-maxmove-600 hover:bg-white/90 group w-fit"
            >
              Book Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Business Banner */}
          <Link 
            to="/business" 
            className="group relative overflow-hidden p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30"
          >
            <Building2 className="h-12 w-12 text-white group-hover:text-white transition-colors mb-4" />
            <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors mb-2">Business</h3>
            <p className="text-white/90 group-hover:text-white transition-colors mb-auto">
              Last mile delivery solutions for businesses of all sizes
            </p>
            <Button
              className="mt-4 bg-maxmove-600 text-white group-hover:bg-white group-hover:text-maxmove-600 hover:bg-white/90 group w-fit"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Driver Banner */}
          <Link 
            to="/drivers" 
            className="group relative overflow-hidden p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30"
          >
            <Users className="h-12 w-12 text-white group-hover:text-white transition-colors mb-4" />
            <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors mb-2">Driver</h3>
            <p className="text-white/90 group-hover:text-white transition-colors mb-auto">
              Deliver goods with Maxmove by working to your own schedule
            </p>
            <Button
              className="mt-4 bg-maxmove-600 text-white group-hover:bg-white group-hover:text-maxmove-600 hover:bg-white/90 group w-fit"
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