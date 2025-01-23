import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Truck, Briefcase, User, Building2, GraduationCap, Contact } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getTextColor = () => {
    if (isHomePage) {
      return isScrolled ? "text-maxmove-700 hover:text-maxmove-900" : "text-white hover:text-white/80";
    }
    return "text-maxmove-700 hover:text-maxmove-900";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className={`text-2xl font-bold transition-colors ${
                isHomePage 
                  ? isScrolled ? "text-maxmove-900" : "text-white"
                  : "text-maxmove-900"
              }`}
            >
              Maxmove
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`transition-colors inline-flex items-center w-[140px] justify-center ${getTextColor()}`}
              >
                How it Works <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/personal-delivery" className="w-full">
                    Personal Delivery
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/business" className="w-full">
                    Business Solutions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/drivers" className="w-full">
                    Drivers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`transition-colors inline-flex items-center w-[120px] justify-center ${getTextColor()}`}
              >
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/about" className="w-full">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/career" className="w-full">
                    Careers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {session ? (
              <Button
                variant="default"
                className={`transition-colors ${
                  isHomePage 
                    ? isScrolled 
                      ? "bg-maxmove-800 hover:bg-maxmove-900 text-white" 
                      : "bg-white hover:bg-white/90 text-maxmove-900"
                    : "bg-maxmove-800 hover:bg-maxmove-900 text-white"
                }`}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="default"
                className={`transition-colors ${
                  isHomePage 
                    ? isScrolled 
                      ? "bg-maxmove-800 hover:bg-maxmove-900 text-white" 
                      : "bg-white hover:bg-white/90 text-maxmove-900"
                    : "bg-maxmove-800 hover:bg-maxmove-900 text-white"
                }`}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isHomePage ? (isScrolled ? "text-maxmove-900" : "text-white") : "text-maxmove-900"}
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
          <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in rounded-lg mt-2">
            <div className="px-4 py-4 space-y-3">
              <div className="space-y-3">
                <Link
                  to="/personal-delivery"
                  className="flex items-center px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Truck className="inline-block mr-2 h-4 w-4" />
                  Personal Delivery
                </Link>
                <Link
                  to="/business"
                  className="flex items-center px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Briefcase className="inline-block mr-2 h-4 w-4" />
                  Business Solutions
                </Link>
                <Link
                  to="/drivers"
                  className="flex items-center px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="inline-block mr-2 h-4 w-4" />
                  Drivers
                </Link>
                <Link
                  to="/about"
                  className="flex items-center px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Building2 className="inline-block mr-2 h-4 w-4" />
                  About Us
                </Link>
                <Link
                  to="/career"
                  className="flex items-center px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GraduationCap className="inline-block mr-2 h-4 w-4" />
                  Career
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Contact className="inline-block mr-2 h-4 w-4" />
                  Contact
                </Link>
              </div>
              <div className="pt-2">
                {session ? (
                  <Button
                    className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors"
                    onClick={() => {
                      navigate("/signin");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;