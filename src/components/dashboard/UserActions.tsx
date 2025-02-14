
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const UserActions = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="relative h-10 w-10 rounded-full bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7E69AB] transition-all duration-300"
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
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 py-3 cursor-pointer hover:bg-[#F1F0FB] focus:bg-[#F1F0FB] transition-colors"
          >
            <Settings className="h-4 w-4 text-[#7E69AB]" />
            <span>Settings</span>
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
  );
};

export default UserActions;
