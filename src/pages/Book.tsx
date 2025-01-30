import { useState, useEffect, useRef } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Map from "@/components/Map";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import BookingForm from "@/components/BookingForm";
import VehicleSelection from "@/components/VehicleSelection";

interface Stop {
  address: string;
  type: 'pickup' | 'dropoff' | 'stop';
  coordinates?: [number, number];
}

interface Suggestion {
  place_name: string;
  center: [number, number];
}

const Book = () => {
  const [stops, setStops] = useState<Stop[]>([
    { address: '', type: 'pickup' },
    { address: '', type: 'dropoff' }
  ]);
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('key_value')
          .eq('key_name', 'mapbox_public_token')
          .single();

        if (error) {
          console.error('Error fetching Mapbox token:', error);
          toast.error('Error loading address suggestions');
          return;
        }

        if (!data?.key_value) {
          console.error('No Mapbox token found');
          toast.error('Map configuration not found');
          return;
        }

        setMapboxToken(data.key_value);
      } catch (err) {
        console.error('Error fetching Mapbox token:', err);
        toast.error('Error loading address suggestions');
      }
    };

    fetchMapboxToken();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddress = async (query: string, index: number) => {
    if (!query.trim() || !mapboxToken) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&country=de&types=address`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Geocoding request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.features && Array.isArray(data.features)) {
        setSuggestions(data.features.map((feature: any) => ({
          place_name: feature.place_name,
          center: feature.center
        })));
        setActiveInput(index);
      } else {
        console.error('Invalid response format:', data);
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
      toast.error('Error loading address suggestions');
      setSuggestions([]);
    }
  };

  const handleAddressChange = (value: string, index: number) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], address: value };
    setStops(newStops);
    searchAddress(value, index);
  };

  const handleSuggestionSelect = (suggestion: Suggestion, index: number) => {
    const newStops = [...stops];
    newStops[index] = {
      ...newStops[index],
      address: suggestion.place_name,
      coordinates: suggestion.center
    };
    setStops(newStops);
    setSuggestions([]);
    setActiveInput(null);
  };

  const addStop = () => {
    setStops([...stops.slice(0, -1), { address: '', type: 'stop' }, stops[stops.length - 1]]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-[50%] flex-shrink-0 space-y-6">
              <h1 className="text-3xl font-bold text-maxmove-900">
                Move anything anywhere anytime with any vehicle
              </h1>
              
              <BookingForm
                stops={stops}
                setStops={setStops}
                suggestions={suggestions}
                activeInput={activeInput}
                suggestionsRef={suggestionsRef}
                onAddressChange={handleAddressChange}
                onSuggestionSelect={handleSuggestionSelect}
                onAddStop={addStop}
                onRemoveStop={removeStop}
              />

              <VehicleSelection />
            </div>

            <div className="sticky top-28 lg:w-[45%] aspect-square h-fit">
              <Map
                pickupLocation={stops[0].coordinates}
                dropoffLocation={stops[stops.length - 1].coordinates}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;