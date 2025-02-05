import { useQuery } from "@tanstack/react-query";
import { Bike, Car, CarFront, Truck } from "lucide-react";
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
  switch (category.toLowerCase()) {
    case 'bike_motorcycle':
      return <Bike className="w-12 h-12 text-maxmove-900" />;
    case 'car':
      return <Car className="w-12 h-12 text-maxmove-900" />;
    case 'van':
      return <CarFront className="w-12 h-12 text-maxmove-900" />;
    case 'heavy_truck':
      return (
        <div className="w-12 h-12 relative">
          <img
            src="/lovable-uploads/2717fb29-1274-4445-ac02-fc36ac6bab3d.png"
            alt="24t Truck"
            className="w-12 h-12 text-maxmove-900"
          />
        </div>
      );
    case 'truck':
    case 'medium_truck':
      return <Truck className="w-12 h-12 text-maxmove-900" />;
    default:
      return <Car className="w-12 h-12 text-maxmove-900" />;
  }
};

const categoryOrder = [
  'bike_motorcycle',
  'car',
  'van',
  'medium_truck',
  'refrigerated',
  'towing',
  'light_truck',
  'medium_truck',
  'heavy_truck'
];

const VehicleSelection = () => {
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_types')
        .select('*');
      
      if (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
      }
      
      const sortedData = [...(data || [])].sort((a, b) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        return indexA - indexB;
      });
      
      return sortedData as VehicleType[];
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
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
        <Button variant="ghost" className="text-maxmove-900">
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
                  className="p-6 flex flex-col items-center justify-center cursor-pointer hover:border-maxmove-900 transition-all duration-300 h-48 group relative overflow-hidden bg-maxmove-50"
                >
                  <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                    {getVehicleIcon(vehicle.category)}
                  </div>
                  <h3 className="text-lg font-medium text-maxmove-900 transition-transform duration-300 group-hover:-translate-y-2">
                    {vehicle.name}
                  </h3>
                  <div className="absolute inset-x-0 bottom-0 bg-maxmove-900 text-white p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    <p className="text-sm">{vehicle.description}</p>
                    <p className="text-xs mt-1">Max weight: {vehicle.max_weight}</p>
                    <p className="text-xs">Dimensions: {vehicle.dimensions}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-maxmove-50 border-maxmove-900 text-maxmove-900 hover:text-maxmove-900" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-maxmove-50 border-maxmove-900 text-maxmove-900 hover:text-maxmove-900" />
        </Carousel>
      </div>
    </div>
  );
};

export default VehicleSelection;
