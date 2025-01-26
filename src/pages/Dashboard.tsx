import { useState } from "react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import { Settings } from "@/components/Settings";

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-maxmove-50 to-white">
      <Navbar onSettingsClick={() => setShowSettings(true)} />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-28">
        {showSettings ? (
          <Settings onClose={() => setShowSettings(false)} />
        ) : (
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-maxmove-900">
              Place Your Order
            </h1>
            
            <div className="w-full aspect-[4/3] lg:aspect-[16/9] rounded-xl overflow-hidden">
              <Map />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;