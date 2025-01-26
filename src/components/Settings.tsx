import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SettingsProps {
  onClose: () => void;
}

// Define the allowed types based on the Supabase enums
type NotificationPreference = "all" | "important" | "none";
type LanguagePreference = "en" | "de";

export const Settings = ({ onClose }: SettingsProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState<NotificationPreference>("all");
  const [language, setLanguage] = useState<LanguagePreference>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserSettings = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("No user found");
          onClose();
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('phone_number, notification_preferences, language')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setPhoneNumber(profile.phone_number || "");
          setNotifications(profile.notification_preferences as NotificationPreference || "all");
          setLanguage(profile.language as LanguagePreference || "en");
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserSettings();
  }, [onClose]);

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("No user found");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: phoneNumber,
          notification_preferences: notifications,
          language: language,
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success("Settings updated successfully");
      onClose();
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error("Failed to update settings");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-maxmove-900">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maxmove-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-maxmove-900">Settings</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-maxmove-700">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-maxmove-700">
            Notification Preferences
          </label>
          <Select 
            value={notifications} 
            onValueChange={(value: NotificationPreference) => setNotifications(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="important">Important Only</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-maxmove-700">
            Language
          </label>
          <Select 
            value={language} 
            onValueChange={(value: LanguagePreference) => setLanguage(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};