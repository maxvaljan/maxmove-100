
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import VehicleIcon from "./VehicleIcon";
import { formatWeight, formatDimensions } from "@/utils/vehicleUtils";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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
  isSelected?: boolean;
  onSelect?: () => void;
}

const VEHICLE_CARD_HEIGHT = "h-[18.2rem]";
const BASE_CARD_STYLES = "p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden";
const HOVER_ANIMATION_STYLES = "transition-transform duration-300 group-hover:-translate-y-2";
const INFO_PANEL_STYLES = "absolute inset-x-0 bottom-0 bg-maxmove-900 text-white p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0";

const VehicleCard = ({ vehicle, isSelected, onSelect }: VehicleCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/signin");
      return;
    }
    
    if (onSelect) {
      onSelect();
    }
    console.log("Vehicle selected:", vehicle);
  };

  return (
    <Card 
      className={cn(
        BASE_CARD_STYLES,
        VEHICLE_CARD_HEIGHT,
        isSelected ? 'bg-orange-50 border-orange-500' : 'bg-maxmove-50 hover:border-maxmove-900'
      )}
      onClick={handleCardClick}
    >
      <div className={HOVER_ANIMATION_STYLES}>
        <VehicleIcon category={vehicle.category} name={vehicle.name} />
      </div>
      
      <h3 className={cn("text-lg font-medium text-maxmove-900", HOVER_ANIMATION_STYLES)}>
        {vehicle.name}
      </h3>
      
      <div className={INFO_PANEL_STYLES}>
        <p className="text-sm">{vehicle.description}</p>
        <p className="text-xs mt-1">{formatWeight(vehicle.max_weight)}</p>
        <p className="text-xs">{formatDimensions(vehicle.dimensions)}</p>
      </div>
      
      <ChevronRight className="absolute bottom-2 right-2 w-5 h-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
};

export default VehicleCard;
