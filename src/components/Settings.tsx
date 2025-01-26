import { useState } from "react";
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

export const Settings = ({ onClose }: SettingsProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState("all");
  const [language, setLanguage] = useState("en");

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: phoneNumber,
          notification_preferences: notifications,
          language: language,
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      
      toast.success("Settings updated successfully");
      onClose();
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error("Failed to update settings");
    }
  };

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
          <Select value={notifications} onValueChange={setNotifications}>
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
          <Select value={language} onValueChange={setLanguage}>
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