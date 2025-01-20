import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Truck, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <Link to="/" className="text-2xl font-bold text-maxmove-900">
              Maxmove
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-maxmove-700 hover:text-maxmove-900 transition-colors inline-flex items-center">
                How it Works <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/personal-delivery" className="flex items-center">
                    <Truck className="mr-2 h-4 w-4" />
                    Personal Delivery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/business" className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Business Solutions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/drivers" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Drivers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/about"
              className="text-maxmove-700 hover:text-maxmove-900 transition-colors"
            >
              About Us
            </Link>
            <Button
              variant="default"
              className="bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors"
            >
              Sign In
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
              <div className="space-y-2">
                <Link
                  to="/personal-delivery"
                  className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
                >
                  <Truck className="inline-block mr-2 h-4 w-4" />
                  Personal Delivery
                </Link>
                <Link
                  to="/business"
                  className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
                >
                  <Briefcase className="inline-block mr-2 h-4 w-4" />
                  Business Solutions
                </Link>
                <Link
                  to="/drivers"
                  className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
                >
                  <User className="inline-block mr-2 h-4 w-4" />
                  Drivers
                </Link>
              </div>
              <Link
                to="/about"
                className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
              >
                About Us
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors">
                  Sign In
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