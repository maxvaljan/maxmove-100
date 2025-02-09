
import { Card } from "@/components/ui/card";
import VehicleIcon from "./VehicleIcon";
import { formatWeight, formatDimensions } from "@/utils/vehicleUtils";
import { ArrowUpRight } from "lucide-react";

interface VehicleType {
  id: string;
  name: string;
  category: string;
  description: string;
  dimensions: string;
  max_weight: string;
}

interface VehicleCardProps {
  vehicle: VehicleType;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card 
      className="p-6 flex flex-col items-center justify-center cursor-pointer hover:border-maxmove-900 transition-all duration-300 h-[50.4rem] group relative overflow-hidden bg-maxmove-50"
    >
      <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-2">
        <VehicleIcon category={vehicle.category} name={vehicle.name} />
      </div>
      <h3 className="text-lg font-medium text-maxmove-900 transition-transform duration-300 group-hover:-translate-y-2">
        {vehicle.name}
      </h3>
      <div className="absolute inset-x-0 bottom-0 bg-maxmove-900 text-white p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <p className="text-sm">{vehicle.description}</p>
        <p className="text-xs mt-1">{formatWeight(vehicle.max_weight)}</p>
        <p className="text-xs">{formatDimensions(vehicle.dimensions)}</p>
      </div>
      <ArrowUpRight className="absolute bottom-2 right-2 w-5 h-5 text-maxmove-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
};

export default VehicleCard;

