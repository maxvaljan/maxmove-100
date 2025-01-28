import { useQuery } from "@tanstack/react-query";
import { Bike, Car, Truck, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";
import '@flaticon/flaticon-uicons/css/all/all.css';
import { supabase } from "@/integrations/supabase/client";

interface VehicleType {
  id: string;
  name: string;
  category: string;
  description: string;
  dimensions: string;
  max_weight: string;
}

const getVehicleIcon = (category: string) => {
  switch (category) {
    case 'bike_motorcycle':
      return <Bike className="w-7 h-7 text-maxmove-500" />;
    case 'car':
      return <Car className="w-7 h-7 text-maxmove-500" />;
    case 'van':
      return <i className="fi fi-rr-van text-[28px] text-maxmove-500"></i>;
    case 'refrigerated':
      return <Snowflake className="w-7 h-7 text-maxmove-500" />;
    case 'towing':
      return <i className="fi fi-br-truck-tow text-[28px] text-maxmove-500"></i>;
    default:
      return <Truck className="w-7 h-7 text-maxmove-500" />;
  }
};

const VehicleSelection = () => {
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_types')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
      }
      
      return data as VehicleType[];
    }
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-3">
        <h2 className="text-xl font-semibold text-maxmove-900">Loading vehicles...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-3">
        <h2 className="text-xl font-semibold text-maxmove-900">Error loading vehicles</h2>
        <p className="text-red-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <h2 className="text-xl font-semibold text-maxmove-900">
        Available Vehicles
      </h2>
      <div className="space-y-3">
        {vehicles?.map((vehicle) => (
          <Card key={vehicle.id} className="p-4 hover:shadow-md cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-maxmove-50 rounded-lg">
                {getVehicleIcon(vehicle.category)}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-maxmove-900 text-base">
                  {vehicle.name}
                </h3>
                <p className="text-sm text-maxmove-600">
                  {vehicle.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-maxmove-500">
                  <span>📏 {vehicle.dimensions}</span>
                  <span>•</span>
                  <span>⚖️ {vehicle.max_weight}</span>
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