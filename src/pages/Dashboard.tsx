import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import Settings from "@/components/Settings";
import { Settings as SettingsIcon, User, Wallet, CreditCard, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("place-order");
  const [showSettings, setShowSettings] = useState(false);
  const [walletBalance, setWalletBalance] = useState("$0.00");

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

  const walletItems = [
    {
      title: "Transaction History",
      icon: ScrollText,
      onClick: () => console.log("Transaction History clicked"),
    },
    {
      title: "Coupons",
      icon: CreditCard,
      onClick: () => console.log("Coupons clicked"),
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      onClick: () => console.log("Payment Methods clicked"),
    },
  ];

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

  const renderWalletContent = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Personal wallet balance</h2>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">{walletBalance}</span>
          <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
            Top Up
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <img 
              src="/placeholder.svg" 
              alt="No transactions" 
              className="w-32 h-32 opacity-50"
            />
          </div>
          <p className="text-gray-500">
            You have no transactions for the selected time period.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {activeTab === "wallet" && (
          <SidebarProvider>
            <Sidebar className="h-screen border-r">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Wallet</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {walletItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton onClick={item.onClick}>
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        )}

        <div className="flex-1">
          {/* Navigation */}
          <div className="border-b">
            <div className="mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
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
                    </button>
                  ))}
                </div>

                {/* Personal and Settings Buttons */}
                <div className="flex items-center space-x-4">
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
            {showSettings ? (
              <Settings />
            ) : activeTab === "place-order" ? (
              <PlaceOrder />
            ) : activeTab === "wallet" ? (
              renderWalletContent()
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;