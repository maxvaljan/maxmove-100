import { useQuery } from "@tanstack/react-query";
import { Bike, Car, CarFront, Truck, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      return <Bike className="w-12 h-12 text-[#FF6B35]" />;
    case 'car':
      return <Car className="w-12 h-12 text-[#FF6B35]" />;
    case 'mpv':
      return <CarFront className="w-12 h-12 text-[#FF6B35]" />;
    case 'van':
      return <Truck className="w-12 h-12 text-[#FF6B35]" />;
    default:
      return <Car className="w-12 h-12 text-[#FF6B35]" />;
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-400 uppercase">Vehicle Type</h2>
          <Button variant="ghost" className="text-[#FF6B35]">
            <Info className="w-4 h-4 mr-2" />
            More Info
          </Button>
        </div>
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-3">
        <h2 className="text-lg font-semibold text-gray-400 uppercase">Vehicle Type</h2>
        <p className="text-red-500">Error loading vehicles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-400 uppercase">Vehicle Type</h2>
        <Button variant="ghost" className="text-[#FF6B35]">
          <Info className="w-4 h-4 mr-2" />
          More Info
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {vehicles?.map((vehicle) => (
          <Card 
            key={vehicle.id} 
            className="p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6B35] transition-colors"
          >
            <div className="mb-4">
              {getVehicleIcon(vehicle.category)}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{vehicle.name}</h3>
            {vehicle.max_weight && (
              <p className="text-sm text-gray-500 mt-1">
                Weight&lt;{vehicle.max_weight}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelection;