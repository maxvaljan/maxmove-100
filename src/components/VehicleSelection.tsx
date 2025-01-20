import { useEffect, useRef, useState } from "react";
import { Bike, Car, Truck, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VehicleType {
  name: string;
  icon: JSX.Element;
  description: string;
  dimensions: string;
  maxWeight: string;
}

const vehicles: VehicleType[] = [
  {
    name: "Bike/Motorcycle",
    icon: <Bike className="h-8 w-8 text-maxmove-500" />,
    description: "Perfect for small goods, with a faster order pickup time",
    dimensions: "0.4 x 0.3 x 0.3 Meter",
    maxWeight: "Up to 8 kg"
  },
  {
    name: "Car",
    icon: <Car className="h-8 w-8 text-maxmove-500" />,
    description: "Car delivery of medium size items",
    dimensions: "0.7 x 0.5 x 0.5 Meter",
    maxWeight: "Up to 20 kg"
  },
  {
    name: "Van (up to 3.5t)",
    icon: <Truck className="h-8 w-8 text-maxmove-500" />,
    description: "Van delivery of multiple medium-large size items",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 400 kg"
  },
  {
    name: "Light Truck (3.5-7.5t)",
    icon: <Truck className="h-8 w-8 text-maxmove-500" />,
    description: "Light truck for larger deliveries",
    dimensions: "2.3 x 1.2 x 1.2 Meter",
    maxWeight: "Up to 800 kg"
  },
  {
    name: "Medium Truck (7.5-12t)",
    icon: <Truck className="h-10 w-10 text-maxmove-500" />,
    description: "Medium truck for heavy deliveries",
    dimensions: "2.9 x 1.4 x 1.7 Meter",
    maxWeight: "Up to 1200 kg"
  },
  {
    name: "Heavy Truck (>12t)",
    icon: <Truck className="h-12 w-12 text-maxmove-500" />,
    description: "Heavy truck for industrial equipment",
    dimensions: "7.5 x 2.4 x 2.3 Meter",
    maxWeight: "Up to 5000 kg"
  },
  {
    name: "Towing Service",
    icon: <Car className="h-8 w-8 text-maxmove-500" />,
    description: "Towing service for cars and motorcycles",
    dimensions: "4.8 x 2.1 x 1.8 Meter",
    maxWeight: "Up to 2800 kg"
  },
  {
    name: "Refrigerated Vehicle",
    icon: <Snowflake className="h-8 w-8 text-maxmove-500" />,
    description: "Temperature-controlled transport",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 400 kg"
  }
];

const VehicleSelection = () => {
  const [sectionVisibility, setSectionVisibility] = useState(0);
  const [contentVisibility, setContentVisibility] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = Math.min(Math.max(entry.intersectionRatio, 0), 1);
            setSectionVisibility(ratio);
          } else {
            setSectionVisibility(0);
          }
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // Create thresholds from 0 to 1 in 0.05 steps
      }
    );

    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = Math.min(Math.max(entry.intersectionRatio, 0), 1);
            setContentVisibility(ratio);
          } else {
            setContentVisibility(0);
          }
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
      }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    if (contentRef.current) {
      contentObserver.observe(contentRef.current);
    }

    return () => {
      sectionObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  const getVisibilityClass = (index: number, threshold: number) => {
    const visibilityRatio = contentVisibility - (index * 0.1);
    return visibilityRatio > threshold;
  };

  return (
    <div 
      ref={sectionRef}
      className="w-full space-y-4"
    >
      <h2 className={`text-xl font-semibold text-maxmove-900 transition-all duration-600 ease-in-out ${
        sectionVisibility > 0.2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        Available Vehicles
      </h2>
      <div 
        ref={contentRef}
        className="space-y-4"
      >
        {vehicles.map((vehicle, index) => (
          <Card 
            key={index} 
            className={`transform transition-all duration-600 ease-in-out overflow-hidden
              ${sectionVisibility > 0.2 
                ? 'opacity-100 translate-y-0 hover:shadow-md cursor-pointer' 
                : 'opacity-0 translate-y-10'
              } ${getVisibilityClass(index, 0.5) ? 'p-4' : 'p-2'}`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 p-2 bg-maxmove-50 rounded-lg transition-all duration-600 ease-in-out ${
                sectionVisibility > 0.2 ? 'scale-100' : 'scale-95'
              } ${getVisibilityClass(index, 0.5) ? 'scale-100' : 'scale-90'}`}
              >
                {vehicle.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className={`font-semibold text-maxmove-900 transition-all duration-600 ease-in-out ${
                  sectionVisibility > 0.2 ? 'opacity-100' : 'opacity-0'
                } ${getVisibilityClass(index, 0.5) ? 'text-base' : 'text-sm'}`}
                >
                  {vehicle.name}
                </h3>
                <p 
                  className={`text-sm text-maxmove-600 transition-all duration-600 ease-in-out ${
                    getVisibilityClass(index, 0.6) ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-4 max-h-0'
                  }`}
                >
                  {vehicle.description}
                </p>
                <div 
                  className={`flex items-center gap-2 text-sm text-maxmove-500 transition-all duration-600 ease-in-out ${
                    getVisibilityClass(index, 0.7) ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-4 max-h-0'
                  }`}
                >
                  <span>📏 {vehicle.dimensions}</span>
                  <span>•</span>
                  <span>⚖️ {vehicle.maxWeight}</span>
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
