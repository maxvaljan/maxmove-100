import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-maxmove-900">Maxmove</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-maxmove-700 hover:text-maxmove-900 transition-colors"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-maxmove-700 hover:text-maxmove-900 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#vehicles"
              className="text-maxmove-700 hover:text-maxmove-900 transition-colors"
            >
              Vehicles
            </a>
            <Button
              variant="default"
              className="bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-maxmove-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
              >
                Services
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#vehicles"
                className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
              >
                Vehicles
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;