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

const getVehicleIcon = (category: string, name?: string) => {
  // Special case for 12t and 24t trucks
  if (category === 'heavy_truck' && (name === '12t Truck' || name === '24t Truck')) {
    return (
      <img
        src="/lovable-uploads/ba6e097a-64d5-4fda-a014-cadf72ca6c51.png"
        alt={name}
        className="w-44 h-28 object-contain"
      />
    );
  }

  switch (category.toLowerCase()) {
    case 'bike_motorcycle':
      return (
        <img
          src="/lovable-uploads/857953f5-80ec-4389-98bc-7097f4145a07.png"
          alt="Motorcycle"
          className="w-28 h-28 object-contain"
        />
      );
    case 'car':
      return (
        <img
          src="/lovable-uploads/9aeb519c-288d-4889-b33d-d9ebf206e955.png"
          alt="Car"
          className="w-40 h-24 object-contain"
        />
      );
    case 'van':
      return (
        <img
          src="/lovable-uploads/7af2546d-2388-456f-b825-72a74dd81844.png"
          alt="Van"
          className="w-40 h-24 object-contain"
        />
      );
    case 'medium_truck':
      return (
        <img
          src="/lovable-uploads/caf7c9fe-60a7-4102-b774-af963f25b124.png"
          alt="Medium Truck"
          className="w-40 h-24 object-contain"
        />
      );
    case 'light_truck':
      return (
        <img
          src="/lovable-uploads/7d24556b-7600-4818-a036-be44d4d90890.png"
          alt="Light Truck"
          className="w-40 h-24 object-contain"
        />
      );
    case 'refrigerated':
      return (
        <img
          src="/lovable-uploads/d542a364-4c46-45aa-a73d-ef400b31db19.png"
          alt="Refrigerated Truck"
          className="w-28 h-28 object-contain"
        />
      );
    case 'towing':
      return (
        <img
          src="/lovable-uploads/5ca8634b-d37b-4eb6-8064-8cdafaffbf62.png"
          alt="Towing Truck"
          className="w-40 h-24 object-contain"
        />
      );
    case 'heavy_truck':
      return (
        <img
          src="/lovable-uploads/050d7ae9-feac-4a7e-9916-4f1388359109.png"
          alt="Heavy Truck"
          className="w-44 h-28 object-contain"
        />
      );
    default:
      return (
        <img
          src="/lovable-uploads/9aeb519c-288d-4889-b33d-d9ebf206e955.png"
          alt="Default Vehicle"
          className="w-40 h-24 object-contain"
        />
      );
  }
};

const VehicleCarousel = ({ vehicles }: VehicleCarouselProps) => {
  if (!vehicles.length) return null;

  // Custom sorting function to arrange vehicles
  const sortedVehicles = [...vehicles].sort((a, b) => {
    // First, handle express vehicles order
    if (a.category === 'car' && b.category === 'van') return -1;
    if (a.category === 'van' && b.category === 'car') return 1;

    // Then handle heavy trucks order
    if (a.category === 'heavy_truck' && b.category === 'heavy_truck') {
      const order = ['Heavy Truck', '12t Truck', '24t Truck', 'Hazardous Transport'];
      const aIndex = order.indexOf(a.name);
      const bIndex = order.indexOf(b.name);
      return aIndex - bIndex;
    }

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
                {getVehicleIcon(vehicle.category, vehicle.name)}
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