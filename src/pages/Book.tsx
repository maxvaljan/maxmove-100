import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Clock, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface Stop {
  address: string;
  type: 'pickup' | 'dropoff' | 'stop';
}

const Book = () => {
  const [stops, setStops] = useState<Stop[]>([
    { address: '', type: 'pickup' },
    { address: '', type: 'dropoff' }
  ]);
  const [date, setDate] = useState<Date>();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const addStop = () => {
    setStops([...stops.slice(0, -1), { address: '', type: 'stop' }, stops[stops.length - 1]]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return; // Keep at least pickup and dropoff
    setStops(stops.filter((_, i) => i !== index));
  };

  const updateStop = (index: number, address: string) => {
    const newStops = [...stops];
    newStops[index] = { ...newStops[index], address };
    setStops(newStops);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
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
                  <div key={index} className="relative flex gap-2">
                    <Input
                      placeholder={stop.type === 'pickup' ? "Pickup location" : stop.type === 'dropoff' ? "Dropoff location" : "Stop location"}
                      value={stop.address}
                      onChange={(e) => updateStop(index, e.target.value)}
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
                      className="w-full justify-start pl-10"
                    >
                      <Calendar className="absolute left-3 h-4 w-4 text-maxmove-400" />
                      {date ? format(date, 'PPP') : 'Today'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Time Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start pl-10"
                    >
                      <Clock className="absolute left-3 h-4 w-4 text-maxmove-400" />
                      {selectedTime || 'Now'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48" align="start">
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
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;