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
    <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex justify-start items-center mb-12 pl-4">
        <h1 className="text-5xl md:text-7xl tracking-tighter font-bold flex items-center whitespace-nowrap">
          <span className="text-maxmove-600 mr-4">Move</span>
          <span className="text-maxmove-600 relative h-[1.2em] overflow-hidden inline-block min-w-[700px] translate-y-[6px]">
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
          className="group relative overflow-hidden rounded-2xl bg-maxmove-600 p-5 transition-all hover:bg-white h-[250px] flex flex-col cursor-pointer"
        >
          <Truck className="h-12 w-12 text-white group-hover:text-maxmove-600 transition-colors mb-4" />
          <h3 className="text-2xl font-bold text-white group-hover:text-maxmove-600 transition-colors mb-2">Move</h3>
          <p className="text-white/90 group-hover:text-maxmove-600 transition-colors mb-auto">
            You need to move something?
          </p>
          <Button
            className="bg-white text-maxmove-600 group-hover:bg-maxmove-600 group-hover:text-white hover:bg-maxmove-600/90 group w-fit pointer-events-none"
          >
            Book Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        {/* Business Banner */}
        <Link 
          to="/business" 
          className="group relative overflow-hidden rounded-2xl bg-maxmove-600 p-5 transition-all hover:bg-white h-[250px] flex flex-col cursor-pointer"
        >
          <Building2 className="h-12 w-12 text-white group-hover:text-maxmove-600 transition-colors mb-4" />
          <h3 className="text-2xl font-bold text-white group-hover:text-maxmove-600 transition-colors mb-2">Business</h3>
          <p className="text-white/90 group-hover:text-maxmove-600 transition-colors mb-auto">
            On-demand logistics, outsourcing or partner with Maxmove?
          </p>
          <Button
            className="bg-white text-maxmove-600 group-hover:bg-maxmove-600 group-hover:text-white hover:bg-maxmove-600/90 group w-fit pointer-events-none"
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        {/* Driver Banner */}
        <Link 
          to="/drivers" 
          className="group relative overflow-hidden rounded-2xl bg-maxmove-600 p-5 transition-all hover:bg-white h-[250px] flex flex-col cursor-pointer"
        >
          <Users className="h-12 w-12 text-white group-hover:text-maxmove-600 transition-colors mb-4" />
          <h3 className="text-2xl font-bold text-white group-hover:text-maxmove-600 transition-colors mb-2">Driver</h3>
          <p className="text-white/90 group-hover:text-maxmove-600 transition-colors mb-auto">
            Become driver at Maxmove. Flexible and great earnings.
          </p>
          <Button
            className="bg-white text-maxmove-600 group-hover:bg-maxmove-600 group-hover:text-white hover:bg-maxmove-600/90 group w-fit pointer-events-none"
          >
            Join Us
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ServiceBanners;