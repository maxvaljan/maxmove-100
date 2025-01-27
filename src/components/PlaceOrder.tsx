import { useState } from "react";
import { Button } from "@/components/ui/button";
import Map from "./Map";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import OrderActions from "./order/OrderActions";
import RouteInputs from "./order/RouteInputs";
import VehicleSelection from "./order/VehicleSelection";
import PastOrdersDialog from "./order/PastOrdersDialog";

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

  const downloadTemplate = () => {
    const template = "pickup_address,pickup_latitude,pickup_longitude,dropoff_address,dropoff_latitude,dropoff_longitude\n123 Pickup St,40.7128,-74.0060,456 Dropoff Ave,40.7589,-73.9851";
    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "address_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "CSV Import",
        description: "CSV import functionality will be implemented here",
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-57px)]">
      <div className="w-1/2 p-6">
        <OrderActions
          onPastOrders={handlePastOrders}
          onDownloadTemplate={downloadTemplate}
          onCsvImport={handleCsvImport}
          isLoading={isLoading}
        />

        <div className="space-y-4 mt-6">
          <h2 className="text-sm text-gray-500 font-medium">
            ROUTE (MAX. 20 STOPS)
          </h2>
          <RouteInputs />
          <Button variant="outline" className="w-full justify-start">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            Add stop
          </Button>
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