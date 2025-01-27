import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import Settings from "@/components/Settings";
import DashboardHeader from "@/components/DashboardHeader";
import { ScrollText, CreditCard } from "lucide-react";
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

  const handleSettingsClick = () => {
    setShowSettings(true);
    setActiveTab("");
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSettings(false);
  };

  const renderWalletContent = () => (
    <div className="flex h-[calc(100vh-64px)]">
      <SidebarProvider>
        <Sidebar className="border-r">
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
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Personal wallet balance</h2>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">{walletBalance}</span>
              <button className="bg-maxmove-500 text-white px-4 py-2 rounded hover:bg-maxmove-600">
                Top Up
              </button>
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
      </SidebarProvider>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="pt-16">
        {showSettings ? (
          <Settings />
        ) : activeTab === "place-order" ? (
          <PlaceOrder />
        ) : activeTab === "wallet" ? (
          renderWalletContent()
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;