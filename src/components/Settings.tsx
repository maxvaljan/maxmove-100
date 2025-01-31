import { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Settings as SettingsIcon, 
  Package, 
  Globe, 
  Bell, 
  ShoppingBag, 
  FileText, 
  UserCog 
} from "lucide-react";
import { ProfileSection } from "./settings/ProfileSection";
import { AccountTypeSection } from "./settings/AccountTypeSection";
import { OrdersSection } from "./settings/OrdersSection";
import { LocationSection } from "./settings/LocationSection";
import { SettingsSidebar } from "./settings/SettingsSidebar";

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
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [eReceiptEnabled, setEReceiptEnabled] = useState(false);
  const [proofOfDeliveryEnabled, setProofOfDeliveryEnabled] = useState(false);
  const [eReceiptEmail, setEReceiptEmail] = useState("");
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [userRole, setUserRole] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found");
        toast({
          title: "Error",
          description: "No user found. Please sign in again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Fetching profile for user:", user.id);
      setEmail(user.email || '');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to fetch profile. Please try again.",
          variant: "destructive",
        });
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
        setUserRole(profile.role || 'customer');
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
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
        <ProfileSection
          firstName={firstName}
          lastName={lastName}
          phone={phone}
          email={email}
          onSave={handleSaveProfile}
          onUpdateFirstName={setFirstName}
          onUpdateLastName={setLastName}
          onUpdatePhone={setPhone}
          onUpdateEmail={setEmail}
        />
      );
    } else if (activeSection === 'account-type') {
      return <AccountTypeSection userRole={userRole} />;
    } else if (activeSection === 'orders') {
      return (
        <OrdersSection
          eReceiptEnabled={eReceiptEnabled}
          eReceiptEmail={eReceiptEmail}
          proofOfDeliveryEnabled={proofOfDeliveryEnabled}
          email={email}
          onUpdateEReceiptEnabled={setEReceiptEnabled}
          onUpdateEReceiptEmail={setEReceiptEmail}
          onUpdateProofOfDeliveryEnabled={setProofOfDeliveryEnabled}
          onSave={handleSaveProfile}
        />
      );
    } else if (activeSection === 'location') {
      return (
        <LocationSection
          language={language}
          onUpdateLanguage={setLanguage}
          onSave={handleSaveProfile}
        />
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SettingsSidebar
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSignOut={handleSignOut}
      />
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;