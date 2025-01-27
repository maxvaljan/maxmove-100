import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import Settings from "@/components/Settings";
import { Wallet, Ticket, CreditCard } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState("place-order");
  const [showSettings, setShowSettings] = useState(false);
  const [showWalletSidebar, setShowWalletSidebar] = useState(false);

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
      title: "Wallet",
      icon: Wallet,
      onClick: () => console.log("Wallet clicked"),
    },
    {
      title: "Coupons",
      icon: Ticket,
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
    setShowWalletSidebar(false);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSettings(false);
    setShowWalletSidebar(tabId === "wallet");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <DashboardHeader />
        <div className="flex flex-1 pt-16">
          {showWalletSidebar && (
            <Sidebar>
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
          )}

          <div className="flex-1">
            <div className="p-4">
              {showSettings ? (
                <Settings />
              ) : (
                activeTab === "place-order" && <PlaceOrder />
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;