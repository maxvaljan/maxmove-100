
import { useEffect, useState } from "react";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import Settings from "@/components/Settings";
import RecordsSection from "@/components/records/RecordsSection";
import WalletSection from "@/components/wallet/WalletSection";
import { Settings as SettingsIcon, User, Home, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("place-order");
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        navigate("/signin");
        return;
      }

      // Check user role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      setIsAdmin(profile?.role === 'admin');

      if (profile?.role === 'driver') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Drivers should use the driver dashboard.",
        });
        navigate("/driver-dashboard");
        return;
      }
    };

    checkUserRole();

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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="h-screen">
        {/* Navigation */}
        <div className="border-b">
          <div className="mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    to={`/dashboard/${tab.id}`}
                    className={`py-4 px-2 -mb-px font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? "text-orange-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Navigation and Settings Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-5 w-5" />
                </button>

                {isAdmin && (
                  <button
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => navigate("/admin")}
                  >
                    <UserCog className="h-5 w-5" />
                  </button>
                )}

                <button
                  className={`p-2 rounded-md transition-colors relative ${
                    showSettings
                      ? "text-orange-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={handleSettingsClick}
                >
                  <SettingsIcon className="h-5 w-5" />
                  {showSettings && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500" />
                  )}
                </button>

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
          <Routes>
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="records" element={<RecordsSection />} />
            <Route path="wallet" element={<WalletSection />} />
            <Route path="settings" element={<Settings />} />
            <Route
              path="*"
              element={
                showSettings ? (
                  <Settings />
                ) : (
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold">
                      {tabs.find((tab) => tab.id === activeTab)?.label}
                    </h2>
                    <p className="text-gray-500 mt-4">
                      This section is coming soon...
                    </p>
                  </div>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
