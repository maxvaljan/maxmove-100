
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Map from "./Map";
import VehicleSelection from "./VehicleSelection";
import BookingForm from "./BookingForm";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { v4 as uuidv4 } from 'uuid';

interface Stop {
  address: string;
  type: 'pickup' | 'dropoff' | 'stop';
  coordinates?: [number, number];
}

interface Suggestion {
  place_name: string;
  center: [number, number];
}

type OrderInsert = Database["public"]["Tables"]["Order"]["Insert"];

const PlaceOrder = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [stops, setStops] = useState<Stop[]>([
    { address: '', type: 'pickup' },
    { address: '', type: 'dropoff' }
  ]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const mapboxTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchMapboxToken = async () => {
      const { data, error } = await supabase
        .from('api_keys')
        .select('key_value')
        .eq('key_name', 'mapbox_public_token')
        .single();

      if (error) {
        console.error('Error fetching Mapbox token:', error);
        return;
      }

      if (data) {
        mapboxTokenRef.current = data.key_value;
      }
    };

    fetchMapboxToken();
  }, []);

  const handleAddressChange = async (value: string, index: number) => {
    if (!mapboxTokenRef.current) return;

    const newStops = [...stops];
    newStops[index].address = value;
    setStops(newStops);
    setActiveInput(index);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
          )}.json?access_token=${mapboxTokenRef.current}&country=de`
        );
        const data = await response.json();
        setSuggestions(data.features);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: Suggestion, index: number) => {
    const newStops = [...stops];
    newStops[index] = {
      ...newStops[index],
      address: suggestion.place_name,
      coordinates: suggestion.center,
    };
    setStops(newStops);
    setSuggestions([]);
    setActiveInput(null);
  };

  const handleAddStop = () => {
    if (stops.length < 5) {
      setStops([...stops, { address: '', type: 'stop' }]);
    }
  };

  const handleRemoveStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

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

      const now = new Date().toISOString();
      const newOrder: OrderInsert = {
        id: uuidv4(),
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
        price: 0,
        created_at: now,
        updated_at: now
      };

      const { error: orderError } = await supabase
        .from('Order')
        .insert(newOrder);

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

  // Click outside suggestions handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setActiveInput(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-57px)]">
      <div className="w-1/2 p-6 space-y-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-maxmove-900">
          Place New Order
        </h1>

        <BookingForm
          stops={stops}
          setStops={setStops}
          suggestions={suggestions}
          activeInput={activeInput}
          suggestionsRef={suggestionsRef}
          onAddressChange={handleAddressChange}
          onSuggestionSelect={handleSuggestionSelect}
          onAddStop={handleAddStop}
          onRemoveStop={handleRemoveStop}
        />
        
        <VehicleSelection onVehicleSelect={setSelectedVehicle} />

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
