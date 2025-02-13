
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

const VehicleSelection = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0].id);

  return (
    <div className="space-y-4">
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
  );
};

export default VehicleSelection;
