import { useQuery } from "@tanstack/react-query";
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
      return (
        <img
          src="/lovable-uploads/857953f5-80ec-4389-98bc-7097f4145a07.png"
          alt="Motorcycle"
          className="w-24 h-24 object-contain" // Increased from 16x16 to 24x24
        />
      );
    case 'car':
      return (
        <img
          src="/lovable-uploads/9aeb519c-288d-4889-b33d-d9ebf206e955.png"
          alt="Car"
          className="w-32 h-20 object-contain" // Increased from 20x12 to 32x20
        />
      );
    case 'van':
      return (
        <img
          src="/lovable-uploads/baaeb840-0046-4b19-819f-316e2b13590d.png"
          alt="Van"
          className="w-32 h-20 object-contain" // Increased from 20x12 to 32x20
        />
      );
    case 'medium_truck':
      return (
        <img
          src="/lovable-uploads/a51067b5-cb5a-425b-b98b-bc4deb2074f8.png"
          alt="Medium Truck"
          className="w-32 h-20 object-contain" // Increased from 20x12 to 32x20
        />
      );
    case 'refrigerated':
      return (
        <img
          src="/lovable-uploads/d542a364-4c46-45aa-a73d-ef400b31db19.png"
          alt="Refrigerated Truck"
          className="w-24 h-24 object-contain" // Increased from 16x16 to 24x24
        />
      );
    case 'towing':
      return (
        <img
          src="/lovable-uploads/5ca8634b-d37b-4eb6-8064-8cdafaffbf62.png"
          alt="Towing Truck"
          className="w-32 h-20 object-contain" // Increased from 20x12 to 32x20
        />
      );
    case 'heavy_truck':
      return (
        <img
          src="/lovable-uploads/5fa106ee-51a2-432b-acfc-fe544b1c2a17.png"
          alt="Heavy Truck"
          className="w-36 h-24 object-contain" // Increased from 24x14 to 36x24
        />
      );
    default:
      return (
        <img
          src="/lovable-uploads/9aeb519c-288d-4889-b33d-d9ebf206e955.png"
          alt="Default Vehicle"
          className="w-32 h-20 object-contain" // Increased from 20x12 to 32x20
        />
      );
  }
}

// Define which categories belong to express vs heavy
const expressCategories = ['bike_motorcycle', 'car', 'van'];
const heavyCategories = ['light_truck', 'medium_truck', 'heavy_truck', 'towing', 'refrigerated'];

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
      
      return data as VehicleType[];
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

  // Group vehicles by type (express vs heavy)
  const expressVehicles = vehicles?.filter(v => expressCategories.includes(v.category)) || [];
  const heavyVehicles = vehicles?.filter(v => heavyCategories.includes(v.category)) || [];

  const renderVehicleGroup = (groupVehicles: VehicleType[], title: string) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-maxmove-700">{title}</h3>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          skipSnaps: true,
          dragFree: false
        }}
      >
        <CarouselContent className="-ml-4">
          {groupVehicles.map((vehicle) => (
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
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
        <Button variant="ghost" className="text-maxmove-900">
          More Info
        </Button>
      </div>
      
      {expressVehicles.length > 0 && renderVehicleGroup(expressVehicles, "Express Vehicles")}
      {heavyVehicles.length > 0 && renderVehicleGroup(heavyVehicles, "Heavy Vehicles")}
    </div>
  );
};

export default VehicleSelection;
