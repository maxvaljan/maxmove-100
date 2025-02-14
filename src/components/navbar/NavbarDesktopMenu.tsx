
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarDesktopMenuProps {
  getTextColor: () => string;
}

const NavbarDesktopMenu = ({ getTextColor }: NavbarDesktopMenuProps) => {
  return (
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
          <DropdownMenuItem>
            <Link to="/investment" className="w-full">
              Investment
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/roadmap" className="w-full">
              Roadmap
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarDesktopMenu;
