
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`relative h-10 w-10 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7E69AB] transition-all duration-300 ${
                  isHomePage && !isScrolled ? "shadow-lg" : ""
                }`}
              >
                <User className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="w-56 backdrop-blur-md bg-white/95 border border-[#E5DEFF] shadow-lg shadow-purple-100/50 animate-in slide-in-from-top-2"
            >
              <DropdownMenuItem 
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 py-3 cursor-pointer hover:bg-[#F1F0FB] focus:bg-[#F1F0FB] transition-colors"
              >
                <User className="h-4 w-4 text-[#7E69AB]" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 py-3 cursor-pointer hover:bg-[#F1F0FB] focus:bg-[#F1F0FB] transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-[#7E69AB]" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#E5DEFF]" />
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="flex items-center gap-2 py-3 cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
