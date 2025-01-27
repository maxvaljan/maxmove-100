import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, ChevronDown, Info } from "lucide-react";
import Map from "@/components/Map";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Stop {
  type: 'pickup' | 'dropoff' | 'stop';
  address: string;
}

const vehicles = [
  {
    name: "Courier",
    icon: "🛵",
    description: "Weight<25KG"
  },
  {
    name: "Car",
    icon: "🚗",
    description: ""
  },
  {
    name: "MPV",
    icon: "🚗",
    description: "Weight<25KG x 2"
  },
  {
    name: "1.7M Van",
    icon: "🚐",
    description: ""
  }
];

const PlaceOrder = () => {
  const [stops, setStops] = useState<Stop[]>([
    { type: 'pickup', address: '' },
    { type: 'dropoff', address: '' }
  ]);

  return (
    <div className="flex gap-6 p-6">
      <div className="w-[450px] space-y-6">
        {/* Top Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">
            <span className="mr-2">⏱️</span>
            Place Past Order
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white">
                Import Addresses <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>From CSV</DropdownMenuItem>
              <DropdownMenuItem>From Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Route Section */}
        <div className="space-y-4">
          <h2 className="text-sm text-gray-500 font-medium">
            ROUTE (MAX. 20 STOPS)
          </h2>
          <div className="space-y-3">
            {stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-3">
                <MapPin 
                  className={`h-5 w-5 ${
                    stop.type === 'pickup' ? 'text-orange-500' : 'text-orange-500'
                  }`} 
                />
                <input
                  type="text"
                  placeholder={`${
                    stop.type === 'pickup' 
                      ? 'Pick-up location' 
                      : stop.type === 'dropoff' 
                      ? 'Drop-off location' 
                      : 'Stop location'
                  }`}
                  className="flex-1 border rounded-md px-3 py-2"
                  value={stop.address}
                  onChange={(e) => {
                    const newStops = [...stops];
                    newStops[index].address = e.target.value;
                    setStops(newStops);
                  }}
                />
              </div>
            ))}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-orange-500"
              onClick={() => {
                if (stops.length < 20) {
                  setStops([...stops.slice(0, -1), { type: 'stop', address: '' }, stops[stops.length - 1]]);
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Stop
            </Button>
          </div>
        </div>

        {/* Vehicle Type Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-500 font-medium">VEHICLE TYPE</h2>
            <Button variant="ghost" className="text-orange-500">
              <Info className="mr-2 h-4 w-4" />
              More Info
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
              >
                <div className="text-2xl mb-2">{vehicle.icon}</div>
                <div className="font-medium">{vehicle.name}</div>
                {vehicle.description && (
                  <div className="text-sm text-gray-500">{vehicle.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1">
        <Map />
      </div>
    </div>
  );
};

export default PlaceOrder;