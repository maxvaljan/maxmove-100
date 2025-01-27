import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentRole, setCurrentRole] = useState<string>('customer');
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile) {
        setCurrentRole(profile.role);
        // For now, we'll assume all users have access to all roles
        setAvailableRoles(['customer', 'business', 'driver']);
      }
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  const handleRoleSwitch = async (newRole: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', user.id);

      if (error) throw error;

      setCurrentRole(newRole);
      toast({
        title: "Role Updated",
        description: `Switched to ${newRole} account`,
      });
    } catch (error) {
      console.error('Error switching role:', error);
      toast({
        title: "Error",
        description: "Failed to switch role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section with logo and navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-maxmove-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/place-order"
                className="text-maxmove-500 font-medium hover:text-maxmove-600 transition-colors"
              >
                Place Order
              </Link>
              <Link
                to="/records"
                className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Records
              </Link>
              <Link
                to="/wallet"
                className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Wallet
              </Link>
              <Link
                to="/drivers"
                className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Drivers
              </Link>
              <Link
                to="/rewards"
                className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Rewards
              </Link>
            </nav>
          </div>

          {/* Right section with actions */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
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
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
                  Account Type
                </div>
                {availableRoles.map((role) => (
                  <DropdownMenuItem
                    key={role}
                    className="cursor-pointer"
                    onSelect={() => handleRoleSwitch(role)}
                  >
                    <div className="flex items-center">
                      <span className="capitalize">{role}</span>
                      {currentRole === role && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-green-500" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate("/profile")}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate("/preferences")}>
                  Preferences
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings Button */}
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
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;