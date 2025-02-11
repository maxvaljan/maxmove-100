
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import Settings from "@/components/Settings";
import { Settings as SettingsIcon, User, Package, Clock, Wallet, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("place-order");
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);

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

      if (profile?.role === 'driver') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Drivers should use the driver dashboard.",
        });
        navigate("/driver-dashboard");
        return;
      }

      // Fetch recent orders
      const { data: recentOrders } = await supabase
        .from('Order')
        .select('*')
        .eq('customer_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentOrders) {
        setOrders(recentOrders);
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
    { id: "place-order", label: "Place Order", icon: Package },
    { id: "records", label: "Records", icon: Clock },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "drivers", label: "Drivers", icon: Users },
    { id: "rewards", label: "Rewards", icon: Gift },
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
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex flex-col">
        {/* Navigation */}
        <div className="border-b bg-white shadow-sm">
          <div className="mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`py-4 px-4 -mb-px font-medium text-sm transition-colors relative flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "text-maxmove-500"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-maxmove-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Personal and Settings Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  className={`p-2 rounded-md transition-colors relative ${
                    showSettings
                      ? "text-maxmove-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={handleSettingsClick}
                >
                  <SettingsIcon className="h-5 w-5" />
                  {showSettings && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-maxmove-500" />
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
        <div className="flex-1 overflow-auto p-6">
          {showSettings ? (
            <Settings />
          ) : activeTab === "place-order" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.filter(o => o.status === 'active').length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      {orders.length > 0 ? (
                        <div>Last order: {new Date(orders[0]?.created_at).toLocaleDateString()}</div>
                      ) : (
                        <div>No recent orders</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <PlaceOrder />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-4xl">🚧</div>
                <h3 className="text-xl font-semibold text-gray-700">Coming Soon</h3>
                <p className="text-gray-500">This feature is under development</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
