
import { Link } from "react-router-dom";
import { Truck, Briefcase, User, Building2, GraduationCap, Contact, LayoutDashboard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarMobileMenuProps {
  session: any;
  handleSignOut: () => Promise<void>;
  navigate: (path: string) => void;
}

const NavbarMobileMenu = ({ session, handleSignOut, navigate }: NavbarMobileMenuProps) => {
  return (
    <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <div className="space-y-2">
          {session && (
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
            >
              <LayoutDashboard className="inline-block mr-2 h-4 w-4" />
              Dashboard
            </Link>
          )}
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
          <Link
            to="/about"
            className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
          >
            <Building2 className="inline-block mr-2 h-4 w-4" />
            About Us
          </Link>
          <Link
            to="/career"
            className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
          >
            <GraduationCap className="inline-block mr-2 h-4 w-4" />
            Career
          </Link>
          <Link
            to="/investment"
            className="block px-3 py-2 text-maxmove-700 hover:text-maxmove-900 transition-colors"
          >
            <DollarSign className="inline-block mr-2 h-4 w-4" />
            Investment
          </Link>
        </div>
        <div className="px-3 py-2">
          {session ? (
            <Button
              className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white transition-colors"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
