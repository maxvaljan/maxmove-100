import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ServiceBanners = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Anything", "Furniture", "Packages", "Documents"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePreviewClick = () => {
    // Open preview in new tab
    window.open("/book", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-maxmove-50 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/2ffff655-44c5-4251-9811-a26017d8c849.png"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-4xl sm:text-6xl font-bold text-maxmove-900 mb-2">
          Move
          <span className="relative inline-block w-[160px] sm:w-[300px] h-[40px] sm:h-[65px] ml-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[currentWordIndex]}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 text-maxmove-600"
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-maxmove-600 max-w-3xl mx-auto">
          Fast and reliable delivery service for all your needs
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/book")}
            size="lg"
            className="bg-maxmove-600 hover:bg-maxmove-700 text-white px-8"
          >
            Book Now
          </Button>
          <Button
            onClick={handlePreviewClick}
            size="lg"
            variant="outline"
            className="border-maxmove-600 text-maxmove-600 hover:bg-maxmove-50"
          >
            Preview
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanners;