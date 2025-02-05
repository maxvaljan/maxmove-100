import { Card } from "@/components/ui/card";
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

interface VehicleCarouselProps {
  vehicles: VehicleType[];
}

const getVehicleIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'bike_motorcycle':
      return (
        <img
          src="/lovable-uploads/857953f5-80ec-4389-98bc-7097f4145a07.png"
          alt="Motorcycle"
          className="w-28 h-28 object-contain" // Increased from w-24 h-24
        />
      );
    case 'car':
      return (
        <img
          src="/lovable-uploads/9aeb519c-288d-4889-b33d-d9ebf206e955.png"
          alt="Car"
          className="w-40 h-24 object-contain" // Increased from w-32 h-20
        />
      );
    case 'van':
      return (
        <img
          src="/lovable-uploads/baaeb840-0046-4b19-819f-316e2b13590d.png"
          alt="Van"
          className="w-40 h-24 object-contain" // Increased from w-32 h-20
        />
      );
    case 'medium_truck':
      return (
        <img
          src="/lovable-uploads/c802a68b-329c-4fec-9635-bf2395559ecb.png"
          alt="Medium Truck"
          className="w-40 h-24 object-contain" // Increased from w-32 h-20
        />
      );
    case 'light_truck':
      return (
        <img
          src="/lovable-uploads/7d24556b-7600-4818-a036-be44d4d90890.png"
          alt="Light Truck"
          className="w-40 h-24 object-contain" // Increased from w-32 h-20
        />
      );
    case 'refrigerated':
      return (
        <img
          src="/lovable-uploads/d542a364-4c46-45aa-a73d-ef400b31db19.png"
          alt="Refrigerated Truck"
          className="w-28 h-28 object-contain" // Increased from w-24 h-24
        />
      );
    case 'towing':
      return (
        <img
          src="/lovable-uploads/5ca8634b-d37b-4eb6-8064-8cdafaffbf62.png"
          alt="Towing Truck"
          className="w-40 h-24 object-contain" // Increased from w-32 h-20
        />
      );
    case 'heavy_truck':
      return (
        <img
          src="/lovable-uploads/5fa106ee-51a2-432b-acfc-fe544b1c2a17.png"
          alt="Heavy Truck"
          className="w-44 h-28 object-contain" // Increased from w-36 h-24
        />
      );
    default:
      return (
        <img
          src="/lovable-uploads/9aeb519c-288d-4889-b33d-d9ebf206e955.png"
          alt="Default Vehicle"
          className="w-40 h-24 object-contain" // Increased from w-32 h-20
        />
      );
  }
};

const VehicleCarousel = ({ vehicles }: VehicleCarouselProps) => {
  if (!vehicles.length) return null;

  // Sort vehicles to show heavy trucks first
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (a.category === 'heavy_truck' && b.category !== 'heavy_truck') return -1;
    if (a.category !== 'heavy_truck' && b.category === 'heavy_truck') return 1;
    return 0;
  });

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        skipSnaps: true,
        dragFree: false
      }}
    >
      <CarouselContent className="-ml-4">
        {sortedVehicles.map((vehicle) => (
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
  );
};

export default VehicleCarousel;