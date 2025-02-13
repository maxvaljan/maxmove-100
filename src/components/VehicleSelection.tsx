import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import VehicleCarousel from "./vehicle/VehicleCarousel";

interface VehicleSelectionProps {
  onVehicleSelect?: (vehicleId: string) => void;
}

const VehicleSelection = ({ onVehicleSelect }: VehicleSelectionProps) => {
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: async () => {
      console.log('Fetching vehicle types...');
      const { data, error } = await supabase
        .from('vehicle_types')
        .select('*');
      
      if (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
      }
      
      console.log('Raw vehicle data:', data);
      
      // Create a Map to store unique vehicles by normalized name AND category
      const uniqueVehiclesMap = new Map();
      
      // Only keep the first occurrence of each vehicle name
      data?.forEach(vehicle => {
        const normalizedKey = `${vehicle.name.toLowerCase()}-${vehicle.category}`; // Normalize the case
        if (!uniqueVehiclesMap.has(normalizedKey)) {
          uniqueVehiclesMap.set(normalizedKey, vehicle);
        }
      });
      
      // Convert Map back to array
      const uniqueVehicles = Array.from(uniqueVehiclesMap.values());
      console.log('Filtered unique vehicles:', uniqueVehicles);
      
      return uniqueVehicles;
    }
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
          <Button variant="ghost" className="text-maxmove-900">
            More Info
          </Button>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[250px] h-48 flex-none bg-maxmove-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-3">
        <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
        <p className="text-red-500">Error loading vehicles. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
        <Button variant="ghost" className="text-maxmove-900">
          More Info
        </Button>
      </div>
      
      <VehicleCarousel 
        vehicles={vehicles || []}
        onVehicleSelect={onVehicleSelect}
      />
    </div>
  );
};

export default VehicleSelection;
