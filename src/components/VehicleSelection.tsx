import { useQuery } from "@tanstack/react-query";
import { Bike, Car, CarFront, Truck, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[250px] h-48 flex-none bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
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
      
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            skipSnaps: true,
            dragFree: false
          }}
        >
          <CarouselContent className="-ml-4">
            {vehicles?.map((vehicle) => (
              <CarouselItem key={vehicle.id} className="pl-4 basis-[250px]">
                <Card 
                  className="p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6B35] transition-colors h-48"
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 border-[#FF6B35] text-[#FF6B35] hover:text-[#FF6B35]" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 border-[#FF6B35] text-[#FF6B35] hover:text-[#FF6B35]" />
        </Carousel>
      </div>
    </div>
  );
};

export default VehicleSelection;