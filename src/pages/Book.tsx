import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Clock, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isBefore, startOfToday, isToday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  
  // Set default date to today
  const [date, setDate] = useState<Date>(startOfToday());
  
  // Get current time rounded to next 30 minutes
  const now = new Date();
  const minutes = now.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 30) * 30;
  now.setMinutes(roundedMinutes === 60 ? 0 : roundedMinutes);
  now.setHours(roundedMinutes === 60 ? now.getHours() + 1 : now.getHours());
  now.setSeconds(0);
  now.setMilliseconds(0);
  
  const defaultTime = format(now, 'HH:mm');
  const [selectedTime, setSelectedTime] = useState<string>(defaultTime);
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        console.log('Fetching Mapbox token...');
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

        console.log('Mapbox token fetched successfully');
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
      console.log('Searching address:', query);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&country=de&types=address`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Address suggestions received:', data);

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

  const selectSuggestion = (suggestion: Suggestion, index: number) => {
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

  const generateTimeSlots = () => {
    const slots = [];
    const currentDate = new Date();
    const currentMinute = currentDate.getMinutes();
    const roundedMinute = Math.ceil(currentMinute / 30) * 30;
    const adjustedHour = roundedMinute === 60 ? currentDate.getHours() + 1 : currentDate.getHours();
    const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip past times if it's today
        if (isToday(date)) {
          if (hour < adjustedHour || (hour === adjustedHour && minute < adjustedMinute)) {
            continue;
          }
        }
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate || isBefore(newDate, startOfToday())) {
      return;
    }
    setDate(newDate);
    
    // Reset time if it's now invalid for the new date
    if (isToday(newDate)) {
      const currentDate = new Date();
      const currentMinute = currentDate.getMinutes();
      const roundedMinute = Math.ceil(currentMinute / 30) * 30;
      const adjustedHour = roundedMinute === 60 ? currentDate.getHours() + 1 : currentDate.getHours();
      const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;
      const currentTime = `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;
      
      if (selectedTime < currentTime) {
        setSelectedTime(currentTime);
      }
    }
  };

  const getDateDisplayText = () => {
    if (!date) return "Select date";
    return isToday(date) ? "Today" : format(date, "PPP");
  };

  const getClosestAvailableTime = () => {
    const currentDate = new Date();
    const currentMinute = currentDate.getMinutes();
    const roundedMinute = Math.ceil(currentMinute / 30) * 30;
    const adjustedHour = roundedMinute === 60 ? currentDate.getHours() + 1 : currentDate.getHours();
    const adjustedMinute = roundedMinute === 60 ? 0 : roundedMinute;
    return `${adjustedHour.toString().padStart(2, '0')}:${adjustedMinute.toString().padStart(2, '0')}`;
  };

  const getTimeDisplayText = () => {
    if (!selectedTime) return "Select time";
    
    const closestTime = getClosestAvailableTime();
    return selectedTime === closestTime && isToday(date) ? "Now" : selectedTime;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maxmove-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-28">
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
          {/* Form Section - Left Side */}
          <div className="w-full lg:w-[400px] flex-shrink-0 space-y-6">
            <h1 className="text-4xl font-bold text-maxmove-900">
              Book a Delivery
            </h1>
            
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
              {/* Stops */}
              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <div key={index} className="relative">
                    <div className="flex gap-2">
                      <Input
                        placeholder={stop.type === 'pickup' ? "Pickup location" : stop.type === 'dropoff' ? "Dropoff location" : "Stop location"}
                        value={stop.address}
                        onChange={(e) => {
                          const newStops = [...stops];
                          newStops[index] = { ...newStops[index], address: e.target.value };
                          setStops(newStops);
                          searchAddress(e.target.value, index);
                        }}
                        className="pl-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-maxmove-400" />
                      {index !== 0 && index !== stops.length - 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStop(index)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {activeInput === index && suggestions.length > 0 && (
                      <div
                        ref={suggestionsRef}
                        className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            onClick={() => selectSuggestion(suggestion, index)}
                          >
                            {suggestion.place_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Stop Button */}
              <Button
                variant="outline"
                onClick={addStop}
                className="w-full flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Stop
              </Button>

              <div className="grid grid-cols-2 gap-4">
                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {getDateDisplayText()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      disabled={(date) => isBefore(date, startOfToday())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Time Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedTime && "text-muted-foreground"
                      )}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {getTimeDisplayText()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="h-48 overflow-y-auto">
                      {generateTimeSlots().map((time) => (
                        <Button
                          key={time}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white">
                See prices
              </Button>
            </div>
          </div>

          {/* Map Section - Right Side */}
          <div className="flex-1 h-[500px] lg:h-auto">
            <Map
              pickupLocation={stops[0].coordinates}
              dropoffLocation={stops[stops.length - 1].coordinates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
