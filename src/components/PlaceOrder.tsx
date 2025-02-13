
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Map from "./Map";
import VehicleSelection from "./VehicleSelection";
import { Button } from "@/components/ui/button";

const PlaceOrder = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCreateOrder = async () => {
    if (!selectedVehicle) {
      toast({
        title: "Error",
        description: "Please select a vehicle type",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Error",
          description: "Please sign in to create an order",
          variant: "destructive",
        });
        return;
      }

      const { error: orderError } = await supabase
        .from('Order')
        .insert({
          vehicle_type_id: selectedVehicle,
          status: 'pending',
          customer_id: session.user.id,
        });

      if (orderError) throw orderError;

      toast({
        title: "Success",
        description: "Order created successfully. Looking for available drivers...",
      });

    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[50%] flex-shrink-0 space-y-6">
            <h1 className="text-3xl font-bold text-maxmove-900">
              Move anything anywhere anytime with any vehicle
            </h1>
            
            <VehicleSelection onVehicleSelect={setSelectedVehicle} />

            <Button 
              className="w-full mt-4"
              size="lg"
              onClick={handleCreateOrder}
              disabled={!selectedVehicle}
            >
              Create Order
            </Button>
          </div>

          <div className="lg:w-[50%] h-[600px] rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
