
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Map from "./Map";
import VehicleSelection from "./VehicleSelection";
import BookingForm from "./BookingForm";
import { Button } from "@/components/ui/button";

interface Stop {
  address: string;
  type: 'pickup' | 'dropoff' | 'stop';
  coordinates?: [number, number];
}

const PlaceOrder = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [stops, setStops] = useState<Stop[]>([
    { address: '', type: 'pickup' },
    { address: '', type: 'dropoff' }
  ]);
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

    if (!stops[0].coordinates || !stops[stops.length - 1].coordinates) {
      toast({
        title: "Error",
        description: "Please enter pickup and dropoff locations",
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
          pickup_address: stops[0].address,
          pickup_latitude: stops[0].coordinates[1],
          pickup_longitude: stops[0].coordinates[0],
          dropoff_address: stops[stops.length - 1].address,
          dropoff_latitude: stops[stops.length - 1].coordinates[1],
          dropoff_longitude: stops[stops.length - 1].coordinates[0],
          items: [],
          price: 0
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
    <div className="flex h-[calc(100vh-57px)]">
      <div className="w-1/2 p-6 space-y-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-maxmove-900">
          Place New Order
        </h1>

        <BookingForm
          stops={stops}
          setStops={setStops}
          suggestions={[]}
          activeInput={null}
          suggestionsRef={{ current: null }}
          onAddressChange={() => {}}
          onSuggestionSelect={() => {}}
          onAddStop={() => {}}
          onRemoveStop={() => {}}
        />
        
        <VehicleSelection onVehicleSelect={(id) => setSelectedVehicle(id)} />

        <Button 
          className="w-full"
          size="lg"
          onClick={handleCreateOrder}
          disabled={!selectedVehicle || !stops[0].coordinates || !stops[stops.length - 1].coordinates}
        >
          Create Order
        </Button>
      </div>

      <div className="w-1/2 h-full">
        <Map
          pickupLocation={stops[0].coordinates}
          dropoffLocation={stops[stops.length - 1].coordinates}
        />
      </div>
    </div>
  );
};

export default PlaceOrder;
