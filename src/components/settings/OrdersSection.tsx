import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OrdersSectionProps {
  eReceiptEnabled: boolean;
  eReceiptEmail: string;
  proofOfDeliveryEnabled: boolean;
  email: string;
  onUpdateEReceiptEnabled: (value: boolean) => void;
  onUpdateEReceiptEmail: (value: string) => void;
  onUpdateProofOfDeliveryEnabled: (value: boolean) => void;
  onSave: () => void;
}

export const OrdersSection = ({
  eReceiptEnabled,
  eReceiptEmail,
  proofOfDeliveryEnabled,
  email,
  onUpdateEReceiptEnabled,
  onUpdateEReceiptEmail,
  onUpdateProofOfDeliveryEnabled,
  onSave,
}: OrdersSectionProps) => {
  const [isEditingEReceiptEmail, setIsEditingEReceiptEmail] = useState(false);

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
              onCheckedChange={onUpdateEReceiptEnabled}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">E-RECEIPT EMAIL</h3>
          <div className="flex items-center justify-between">
            {isEditingEReceiptEmail ? (
              <Input 
                value={eReceiptEmail}
                onChange={(e) => onUpdateEReceiptEmail(e.target.value)}
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
              onCheckedChange={onUpdateProofOfDeliveryEnabled}
            />
          </div>
        </div>

        <Button 
          onClick={onSave}
          className="mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};