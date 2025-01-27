import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { toast } = useToast();

  const handleChangePassword = () => {
    toast({
      title: "Coming soon",
      description: "Password change functionality will be available soon.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Coming soon",
      description: "Account deletion functionality will be available soon.",
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold mb-8">Profile</h2>
      
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

          <div>
            <label className="text-sm text-gray-500 uppercase">Phone</label>
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-700">+65 8120 9493</span>
              <Button 
                variant="link" 
                className="text-orange-500 hover:text-orange-600"
                onClick={() => toast({ title: "Coming soon", description: "Phone number change will be available soon." })}
              >
                Change
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 uppercase">Login Email</label>
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-700">max.valjan@gmail.com</span>
              <Button 
                variant="link" 
                className="text-orange-500 hover:text-orange-600"
                onClick={() => toast({ title: "Coming soon", description: "Email change will be available soon." })}
              >
                Change
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 uppercase">Password</label>
            <div className="mt-1">
              <Button 
                variant="link" 
                className="text-orange-500 hover:text-orange-600 px-0"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500 uppercase">Account</label>
            <div className="mt-1">
              <Button 
                variant="link" 
                className="text-red-500 hover:text-red-600 px-0"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;