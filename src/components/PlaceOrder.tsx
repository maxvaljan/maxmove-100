
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Map from "./Map";
import VehicleSelection from "@/components/VehicleSelection";
import PastOrdersDialog from "./order/PastOrdersDialog";
import FileImportActions from "./order/FileImportActions";
import RouteManager from "./order/RouteManager";

const vehicleTypes = [
  { 
    id: 1, 
    name: "Sedan", 
    icon: "🚗",
    description: "Perfect for small to medium deliveries"
  },
  { 
    id: 2, 
    name: "SUV", 
    icon: "🚙",
    description: "Ideal for larger items and multiple packages"
  },
  { 
    id: 3, 
    name: "Truck", 
    icon: "🚚",
    description: "Best for heavy cargo and bulk deliveries"
  }
];

const PlaceOrder = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0].id);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [pastOrders, setPastOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePastOrders = async () => {
    setIsLoading(true);
    const { data: orders, error } = await supabase
      .from("Order")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Could not fetch past orders",
        variant: "destructive",
      });
      return;
    }

    setPastOrders(orders || []);
    setShowPastOrders(true);
  };

  return (
    <div className="flex h-[calc(100vh-57px)]">
      <div className="w-1/2 p-6">
        <FileImportActions
          isLoading={isLoading}
          onPastOrders={handlePastOrders}
        />

        <div className="space-y-4 mt-6">
          <RouteManager />
        </div>

        <VehicleSelection
          selectedVehicle={selectedVehicle}
          onVehicleSelect={setSelectedVehicle}
          vehicleTypes={vehicleTypes}
        />
      </div>

      <div className="w-1/2">
        <Map />
      </div>

      <PastOrdersDialog
        open={showPastOrders}
        onOpenChange={setShowPastOrders}
        pastOrders={pastOrders}
      />
    </div>
  );
};

export default PlaceOrder;
