import { useNavigate } from "react-router-dom";
import { Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserActions = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => navigate("/profile")}>
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/preferences")}>
            Preferences
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => navigate("/settings/profile")}>
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/settings/notifications")}>
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/settings/security")}>
            Security
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600 hover:text-gray-900"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default UserActions;