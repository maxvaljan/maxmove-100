
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarUserMenuProps {
  session: any;
  handleSignOut: () => Promise<void>;
  getTextColor: () => string;
  isHomePage: boolean;
  isScrolled: boolean;
}

const NavbarUserMenu = ({ session, handleSignOut, getTextColor, isHomePage, isScrolled }: NavbarUserMenuProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center space-x-4">
      {session ? (
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className={`transition-colors ${getTextColor()}`}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
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
        </div>
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
  );
};

export default NavbarUserMenu;
