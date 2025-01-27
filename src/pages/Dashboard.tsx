import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PlaceOrder from "@/components/PlaceOrder";
import Settings from "@/components/Settings";

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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {/* Content */}
        <div className="p-4">
          {showSettings ? (
            <Settings />
          ) : (
            activeTab === "place-order" && <PlaceOrder />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;