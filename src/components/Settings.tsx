import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings as SettingsIcon, UserCircle, Bell, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        const names = (profile.name || '').split(' ');
        setFirstName(names[0] || '');
        setLastName(names.slice(1).join(' ') || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ name: `${firstName} ${lastName}`.trim() })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 uppercase">First Name</label>
                <Input 
                  placeholder="Add first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 uppercase">Last Name</label>
                <Input 
                  placeholder="Add last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={handleSaveProfile}
                className="mt-4"
              >
                Save Changes
              </Button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        );
      case 'security':
        return (
          <div>
            <h3 className="text-lg font-medium">Security Settings</h3>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-4 animate-fade-in">
      {/* Sidebar */}
      <div className="md:w-64 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors",
              activeSection === item.id
                ? "bg-maxmove-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{
            menuItems.find(item => item.id === activeSection)?.label
          }</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;