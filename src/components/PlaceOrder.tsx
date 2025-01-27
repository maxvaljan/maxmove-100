import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Map from "./Map";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Info } from "lucide-react";

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
      // Here you would implement the CSV parsing logic
      toast({
        title: "CSV Import",
        description: "CSV import functionality will be implemented here",
      });
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-1/2 p-6 overflow-y-auto">
        {/* Top Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-white"
            onClick={handlePastOrders}
            disabled={isLoading}
          >
            Past Orders
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white">
                Import Addresses
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={downloadTemplate}>
                Download Template
              </DropdownMenuItem>
              <DropdownMenuItem>
                <label className="cursor-pointer w-full">
                  Import CSV
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleCsvImport}
                  />
                </label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Route Section */}
        <div className="space-y-4 mt-6">
          <h2 className="text-sm text-gray-500 font-medium">
            ROUTE (MAX. 20 STOPS)
          </h2>
          <div className="space-y-3">
            <div className="relative">
              <Input placeholder="Pickup location" className="pl-10" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="relative">
              <Input placeholder="Drop-off location" className="pl-10" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
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

        {/* Vehicle Type Section */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-500 font-medium">VEHICLE TYPE</h2>
            <Button variant="ghost" size="sm" className="text-orange-500">
              <Info className="w-4 h-4 mr-1" />
              More Info
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {vehicleTypes.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all hover:border-orange-500 ${
                  selectedVehicle === vehicle.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 bg-white"
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-3">{vehicle.icon}</span>
                  <h3 className="font-medium text-gray-900 mb-1">{vehicle.name}</h3>
                  <p className="text-sm text-gray-500">{vehicle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section - Now fills entire right side */}
      <div className="w-1/2 h-full">
        <Map />
      </div>

      {/* Past Orders Dialog */}
      <Dialog open={showPastOrders} onOpenChange={setShowPastOrders}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Past Orders</DialogTitle>
          </DialogHeader>
          {pastOrders.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No past orders found</p>
          ) : (
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">
                    From: {order.pickup_address}
                  </p>
                  <p className="text-sm text-gray-500">
                    To: {order.dropoff_address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlaceOrder;
