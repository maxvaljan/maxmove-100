import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import { Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("place-order");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/signin");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/signin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const tabs = [
    { id: "place-order", label: "Place Order" },
    { id: "records", label: "Records" },
    { id: "wallet", label: "Wallet" },
    { id: "drivers", label: "Drivers" },
    { id: "rewards", label: "Rewards" },
  ];

  const handleSettingsClick = () => {
    setShowSettings(true);
    setActiveTab("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {/* Navigation */}
        <div className="border-b">
          <div className="mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`py-4 px-2 -mb-px font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-b-2 border-orange-500 text-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowSettings(false);
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Personal and Settings Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-gray-600 hover:text-gray-900 ${
                    showSettings ? "text-orange-500" : ""
                  }`}
                  onClick={handleSettingsClick}
                >
                  <Settings className="h-5 w-5" />
                </Button>

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
                    <DropdownMenuItem onSelect={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {showSettings ? (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
                  {/* Add your settings content here */}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  {/* Add notification settings here */}
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                  {/* Add security settings here */}
                </div>
              </div>
            </div>
          ) : (
            activeTab === "place-order" && <PlaceOrder />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;