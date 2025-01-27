import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, ChevronDown, Info, Clock } from "lucide-react";
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
          <Button variant="outline" className="bg-white flex items-center text-gray-700 hover:text-gray-900">
            <Clock className="mr-2 h-4 w-4 text-orange-500" />
            Place Past Order
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white text-gray-700 hover:text-gray-900">
                Import Addresses <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem>From CSV</DropdownMenuItem>
              <DropdownMenuItem>From Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Route Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-medium text-gray-500 tracking-wider">
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
                  className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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
              className="w-full justify-start text-orange-500 hover:text-orange-600 hover:bg-orange-50"
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
            <h2 className="text-xs font-medium text-gray-500 tracking-wider">VEHICLE TYPE</h2>
            <Button 
              variant="ghost" 
              className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 h-8 px-2"
            >
              <Info className="mr-2 h-4 w-4" />
              More Info
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors bg-white"
              >
                <div className="text-2xl mb-2">{vehicle.icon}</div>
                <div className="font-medium text-sm text-gray-900">{vehicle.name}</div>
                {vehicle.description && (
                  <div className="text-xs text-gray-500 mt-1">{vehicle.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
        <Map />
      </div>
    </div>
  );
};

export default PlaceOrder;