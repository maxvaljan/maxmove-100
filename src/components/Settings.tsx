import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "./ui/switch";
import { 
  User, 
  Settings as SettingsIcon, 
  Package, 
  Globe, 
  Bell, 
  ShoppingBag, 
  FileText, 
  LogOut,
  UserCog 
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  section: string;
}

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [eReceiptEnabled, setEReceiptEnabled] = useState(false);
  const [proofOfDeliveryEnabled, setProofOfDeliveryEnabled] = useState(false);
  const [eReceiptEmail, setEReceiptEmail] = useState("");
  const [isEditingEReceiptEmail, setIsEditingEReceiptEmail] = useState(false);
  const [language, setLanguage] = useState<"en" | "de">("en");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found");
        return;
      }

      setEmail(user.email || '');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        console.log("Profile found:", profile);
        const names = (profile.name || '').split(' ');
        setFirstName(names[0] || '');
        setLastName(names.slice(1).join(' ') || '');
        setPhone(profile.phone_number || '');
        setEReceiptEmail(profile.e_receipt_email || '');
        setEReceiptEnabled(profile.e_receipt_enabled || false);
        setProofOfDeliveryEnabled(profile.proof_of_delivery_enabled || false);
        setLanguage(profile.language || 'en');
      } else {
        console.log("No profile found for user:", user.id);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found during save");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ 
          name: `${firstName} ${lastName}`.trim(),
          phone_number: phone,
          e_receipt_email: eReceiptEmail,
          e_receipt_enabled: eReceiptEnabled,
          proof_of_delivery_enabled: proofOfDeliveryEnabled,
          language
        })
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const menuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: User, section: 'ACCOUNT' },
    { id: 'account-type', label: 'Account Type', icon: UserCog, section: 'ACCOUNT' },
    { id: 'orders', label: 'Orders', icon: Package, section: 'ACCOUNT' },
    { id: 'location', label: 'Location & Language', icon: Globe, section: 'ACCOUNT' },
    { id: 'notifications', label: 'Notifications', icon: Bell, section: 'ACCOUNT' },
    { id: 'shopify', label: 'Link with Shopify', icon: ShoppingBag, section: 'ACCOUNT' },
    { id: 'terms', label: 'Terms and Policies', icon: FileText, section: 'ABOUT' },
  ];

  const renderContent = () => {
    if (activeSection === 'profile') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 uppercase">First Name</label>
              <Input 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 uppercase">Last Name</label>
              <Input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 uppercase">Phone</label>
              <div className="flex items-center justify-between mt-1">
                {isEditingPhone ? (
                  <Input 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mr-2"
                  />
                ) : (
                  <span className="text-gray-700">{phone || 'Add phone number'}</span>
                )}
                <Button 
                  variant="ghost" 
                  className="text-orange-500 hover:text-orange-600"
                  onClick={() => setIsEditingPhone(!isEditingPhone)}
                >
                  {isEditingPhone ? 'Save' : 'Change'}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 uppercase">Login Email</label>
              <div className="flex items-center justify-between mt-1">
                {isEditingEmail ? (
                  <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mr-2"
                  />
                ) : (
                  <span className="text-gray-700">{email || 'Add email'}</span>
                )}
                <Button 
                  variant="ghost" 
                  className="text-orange-500 hover:text-orange-600"
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                >
                  {isEditingEmail ? 'Save' : 'Change'}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 uppercase">Password</label>
              <div className="mt-1">
                <Button 
                  variant="ghost" 
                  className="text-orange-500 hover:text-orange-600 p-0"
                >
                  Change Password
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 uppercase">Account</label>
              <div className="mt-1">
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 p-0"
                >
                  Delete Account
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleSaveProfile}
              className="mt-4 bg-orange-500 hover:bg-orange-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
      );
    } else if (activeSection === 'account-type') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Account Type</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-medium">Current Account Type</p>
            <p className="text-lg text-orange-500 mt-2">Personal Account</p>
          </div>
          <p className="text-sm text-gray-500">
            To upgrade your account type or switch to a business account, please contact our support team.
          </p>
        </div>
      );
    } else if (activeSection === 'orders') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Orders</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">E-RECEIPT</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Receive E-receipts</span>
                <Switch
                  checked={eReceiptEnabled}
                  onCheckedChange={setEReceiptEnabled}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">E-RECEIPT EMAIL</h3>
              <div className="flex items-center justify-between">
                {isEditingEReceiptEmail ? (
                  <Input 
                    value={eReceiptEmail}
                    onChange={(e) => setEReceiptEmail(e.target.value)}
                    className="mr-2"
                  />
                ) : (
                  <span className="text-gray-700">{eReceiptEmail || email}</span>
                )}
                <Button 
                  variant="ghost" 
                  className="text-orange-500 hover:text-orange-600"
                  onClick={() => setIsEditingEReceiptEmail(!isEditingEReceiptEmail)}
                >
                  {isEditingEReceiptEmail ? 'Save' : 'Change'}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">PROOF OF DELIVERY</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Receive signature or photo proof upon delivery</span>
                <Switch
                  checked={proofOfDeliveryEnabled}
                  onCheckedChange={setProofOfDeliveryEnabled}
                />
              </div>
            </div>

            <Button 
              onClick={handleSaveProfile}
              className="mt-4 bg-orange-500 hover:bg-orange-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
      );
    } else if (activeSection === 'location') {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Location & Language</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">LOCATION</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Germany</span>
                <span className="text-sm text-gray-500">(Only available location)</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">LANGUAGE</h3>
              <div className="flex items-center justify-between">
                <Select value={language} onValueChange={(value: "en" | "de") => setLanguage(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSaveProfile}
              className="mt-4 bg-orange-500 hover:bg-orange-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2 className="text-2xl font-semibold">{
          menuItems.find(item => item.id === activeSection)?.label
        }</h2>
        <p className="text-gray-500 mt-4">This section is coming soon...</p>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        {Object.entries(groupedMenuItems).map(([section, items]) => (
          <div key={section} className="mb-8">
            <h3 className="text-xs text-gray-500 font-medium mb-2">{section}</h3>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  activeSection === item.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
        
        <Button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-3 py-2 mt-auto text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          variant="ghost"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
