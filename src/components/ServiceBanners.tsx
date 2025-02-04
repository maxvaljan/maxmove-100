import { Link } from "react-router-dom";
import { Building2, ChevronRight, Truck, Users } from "lucide-react";
import { Button } from "./ui/button";

const ServiceBanners = () => {
  return (
    <div className="relative w-full">
      <div 
        className="absolute inset-0 z-0 bg-[url('/lovable-uploads/18efedbc-fa85-4a03-978b-d62558e7ea5b.png')] bg-cover bg-center md:bg-[center_40%] bg-[15%_center] md:!h-[100vh]"
        style={{
          height: "85%",
          minHeight: "85vh",
          backgroundPosition: "15% center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      <div className="relative z-10 pt-16 md:pt-48 pb-4 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[85vh] md:min-h-screen flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 md:mb-20 w-full scale-85 md:scale-100">
          <div className="flex justify-center mb-4 pl-12 md:pl-0">
            <h1 className="text-4xl md:text-7xl font-bold text-white inline-flex items-center justify-center">
              <span className="relative">
                Max
                <span className="absolute -right-2 top-0 h-full w-[2px] bg-white animate-blink"></span>
              </span>
              <span className="text-maxmove-500">move</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 mb-4 text-center w-full">On-demand delivery platform</p>
          <Link to="/investment">
            <Button 
              variant="outline" 
              className="bg-white text-maxmove-950 hover:bg-maxmove-100"
            >
              Investment
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mt-48 md:mt-16 w-full">
          {/* Move Banner */}
          <Link 
            to="/book" 
            className="group relative overflow-hidden p-1 md:p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 h-[142px] md:h-auto flex flex-col justify-between"
          >
            <div>
              <Truck className="h-6 w-6 md:h-12 md:w-12 text-white group-hover:text-white transition-colors mb-1 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold text-white group-hover:text-white transition-colors">Move</h3>
              <p className="text-xs md:text-sm text-white/80 group-hover:text-white/90 transition-colors mt-1">
                Move anything, anytime
              </p>
            </div>
            <div className="flex justify-end">
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Business Banner */}
          <Link 
            to="/business" 
            className="group relative overflow-hidden p-1 md:p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 h-[142px] md:h-auto flex flex-col justify-between"
          >
            <div>
              <Building2 className="h-6 w-6 md:h-12 md:w-12 text-white group-hover:text-white transition-colors mb-1 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold text-white group-hover:text-white transition-colors">Business</h3>
              <p className="text-xs md:text-sm text-white/80 group-hover:text-white/90 transition-colors mt-1">
                Delivery solutions for your business
              </p>
            </div>
            <div className="flex justify-end">
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Driver Banner */}
          <Link 
            to="/drivers" 
            className="group relative overflow-hidden p-1 md:p-6 transition-all cursor-pointer bg-white/20 backdrop-blur-md hover:bg-white/30 h-[142px] md:h-auto flex flex-col justify-between"
          >
            <div>
              <Users className="h-6 w-6 md:h-12 md:w-12 text-white group-hover:text-white transition-colors mb-1 md:mb-4" />
              <h3 className="text-sm md:text-xl font-semibold text-white group-hover:text-white transition-colors">Driver</h3>
              <p className="text-xs md:text-sm text-white/80 group-hover:text-white/90 transition-colors mt-1">
                Earn money by delivering
              </p>
            </div>
            <div className="flex justify-end">
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanners;