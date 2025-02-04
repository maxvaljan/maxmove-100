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
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/lovable-uploads/18efedbc-fa85-4a03-978b-d62558e7ea5b.png')] bg-cover bg-center md:bg-[center_40%] bg-[15%_center] md:!h-[100vh]"
        style={{
          height: "85%", // Reduced from 90% to 85%
          minHeight: "85vh", // Reduced from 90vh to 85vh
          backgroundPosition: "15% center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      <div className="relative z-10 pt-16 md:pt-48 pb-4 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[85vh] md:min-h-screen flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 md:mb-20 w-full scale-85 md:scale-100">
          <div className="flex justify-center mb-4 pl-12 md:pl-0">
            <h1 className="text-4xl md:text-7xl font-bold text-white inline-flex items-center justify-center">
              <span className="mr-4 translate-x-4 md:translate-x-0">Move</span>
              <div className="relative h-[1.2em] w-[280px] md:w-[330px] overflow-hidden translate-x-4 md:translate-x-0">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 flex items-center justify-start"
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
              </div>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-12 text-center w-full">On-demand delivery platform</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mt-48 md:mt-16 w-full">
          {/* Move Banner */}
          <Link 
            to="/book" 
            className="group relative overflow-hidden p-1 md:p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 h-[142px] md:h-auto flex flex-col justify-between"
          >
            <div>
              <Truck className="h-6 w-6 md:h-12 md:w-12 text-white group-hover:text-white transition-colors mb-1 md:mb-4" />
              <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-white transition-colors mb-1 md:mb-2">Move</h3>
              <p className="text-white/90 group-hover:text-white transition-colors mb-auto hidden md:block">
                Book a delivery van or truck for your moving needs
              </p>
            </div>
            <Button
              className="mt-1 md:mt-4 bg-maxmove-600 text-white group-hover:bg-white group-hover:text-maxmove-600 hover:bg-white/90 group w-fit text-[11px] md:text-sm px-1.5 py-0.5 md:px-4 md:py-2 scale-[0.77] md:scale-100 origin-left"
            >
              Book Now
              <ArrowRight className="ml-1 md:ml-2 h-2.5 w-2.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Business Banner */}
          <Link 
            to="/business" 
            className="group relative overflow-hidden p-1 md:p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 h-[142px] md:h-auto flex flex-col justify-between"
          >
            <div>
              <Building2 className="h-6 w-6 md:h-12 md:w-12 text-white group-hover:text-white transition-colors mb-1 md:mb-4" />
              <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-white transition-colors mb-1 md:mb-2">Business</h3>
              <p className="text-white/90 group-hover:text-white transition-colors mb-auto hidden md:block">
                Partner with us for your business logistics needs
              </p>
            </div>
            <Button
              className="mt-1 md:mt-4 bg-maxmove-600 text-white group-hover:bg-white group-hover:text-maxmove-600 hover:bg-white/90 group w-fit text-[11px] md:text-sm px-1.5 py-0.5 md:px-4 md:py-2 scale-[0.77] md:scale-100 origin-left"
            >
              Learn More
              <ArrowRight className="ml-1 md:ml-2 h-2.5 w-2.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Driver Banner */}
          <Link 
            to="/drivers" 
            className="group relative overflow-hidden p-1 md:p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 h-[142px] md:h-auto flex flex-col justify-between"
          >
            <div>
              <Users className="h-6 w-6 md:h-12 md:w-12 text-white group-hover:text-white transition-colors mb-1 md:mb-4" />
              <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-white transition-colors mb-1 md:mb-2">Driver</h3>
              <p className="text-white/90 group-hover:text-white transition-colors mb-auto hidden md:block">
                Join our network of professional drivers
              </p>
            </div>
            <Button
              className="mt-1 md:mt-4 bg-maxmove-600 text-white group-hover:bg-white group-hover:text-maxmove-600 hover:bg-white/90 group w-fit text-[11px] md:text-sm px-1.5 py-0.5 md:px-4 md:py-2 scale-[0.77] md:scale-100 origin-left"
            >
              Join Us
              <ArrowRight className="ml-1 md:ml-2 h-2.5 w-2.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanners;
