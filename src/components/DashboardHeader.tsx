import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DashboardHeader = () => {
  const navigate = useNavigate();

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
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/place-order"
                className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
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
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="hidden md:inline-flex"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;