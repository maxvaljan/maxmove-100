import { Bike, Car, Truck, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VehicleType {
  name: string;
  icon: JSX.Element;
  description: string;
  dimensions: string;
  maxWeight: string;
}

const vehicles: VehicleType[] = [
  {
    name: "Bike/Motorcycle",
    icon: <Bike className="h-8 w-8 text-maxmove-500" />,
    description: "Perfect for small goods, with a faster order pickup time",
    dimensions: "0.4 x 0.3 x 0.3 Meter",
    maxWeight: "Up to 8 kg"
  },
  {
    name: "Car",
    icon: <Car className="h-8 w-8 text-maxmove-500" />,
    description: "Car delivery of medium size items",
    dimensions: "0.7 x 0.5 x 0.5 Meter",
    maxWeight: "Up to 20 kg"
  },
  {
    name: "Van (up to 3.5t)",
    icon: <Truck className="h-8 w-8 text-maxmove-500" />,
    description: "Van delivery of multiple medium-large size items",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 400 kg"
  },
  {
    name: "Light Truck (3.5-7.5t)",
    icon: <Truck className="h-8 w-8 text-maxmove-500" />,
    description: "Light truck for larger deliveries",
    dimensions: "2.3 x 1.2 x 1.2 Meter",
    maxWeight: "Up to 800 kg"
  },
  {
    name: "Medium Truck (7.5-12t)",
    icon: <Truck className="h-10 w-10 text-maxmove-500" />,
    description: "Medium truck for heavy deliveries",
    dimensions: "2.9 x 1.4 x 1.7 Meter",
    maxWeight: "Up to 1200 kg"
  },
  {
    name: "Heavy Truck (>12t)",
    icon: <Truck className="h-12 w-12 text-maxmove-500" />,
    description: "Heavy truck for industrial equipment",
    dimensions: "7.5 x 2.4 x 2.3 Meter",
    maxWeight: "Up to 5000 kg"
  },
  {
    name: "Towing Service",
    icon: <Car className="h-8 w-8 text-maxmove-500" />,
    description: "Towing service for cars and motorcycles",
    dimensions: "4.8 x 2.1 x 1.8 Meter",
    maxWeight: "Up to 2800 kg"
  },
  {
    name: "Refrigerated Vehicle",
    icon: <Snowflake className="h-8 w-8 text-maxmove-500" />,
    description: "Temperature-controlled transport",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 400 kg"
  }
];

const VehicleSelection = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold text-maxmove-900">Available Vehicles</h2>
      <div className="space-y-4">
        {vehicles.map((vehicle, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-maxmove-50 rounded-lg">
                {vehicle.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-maxmove-900">{vehicle.name}</h3>
                <p className="text-sm text-maxmove-600">{vehicle.description}</p>
                <div className="flex items-center gap-2 text-sm text-maxmove-500">
                  <span>📏 {vehicle.dimensions}</span>
                  <span>•</span>
                  <span>⚖️ {vehicle.maxWeight}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelection;