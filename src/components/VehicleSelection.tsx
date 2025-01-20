import { useEffect, useRef, useState } from "react";
import { Bike, Car, Truck, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";
import '@flaticon/flaticon-uicons/css/all/all.css';

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
    icon: <Bike className="w-7 h-7 text-maxmove-500" />,
    description: "Perfect for small goods, with a faster order pickup time",
    dimensions: "0.4 x 0.3 x 0.3 Meter",
    maxWeight: "Up to 8 kg"
  },
  {
    name: "Car",
    icon: <Car className="w-7 h-7 text-maxmove-500" />,
    description: "Car delivery of medium size items",
    dimensions: "0.7 x 0.5 x 0.5 Meter",
    maxWeight: "Up to 20 kg"
  },
  {
    name: "Van (up to 3.5t)",
    icon: <i className="fi fi-rr-van text-[28px] text-maxmove-500"></i>,
    description: "Van delivery of multiple medium-large size items",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 400 kg"
  },
  {
    name: "Light Truck (3.5-7.5t)",
    icon: <Truck className="w-7 h-7 text-maxmove-500" />,
    description: "Light truck for larger deliveries",
    dimensions: "2.3 x 1.2 x 1.2 Meter",
    maxWeight: "Up to 800 kg"
  },
  {
    name: "Medium Truck (7.5-12t)",
    icon: <Truck className="w-7 h-7 text-maxmove-500" />,
    description: "Medium truck for heavy deliveries",
    dimensions: "2.9 x 1.4 x 1.7 Meter",
    maxWeight: "Up to 1200 kg"
  },
  {
    name: "Heavy Truck (>12t)",
    icon: <Truck className="w-7 h-7 text-maxmove-500" />,
    description: "Heavy truck for industrial equipment",
    dimensions: "7.5 x 2.4 x 2.3 Meter",
    maxWeight: "Up to 5000 kg"
  },
  {
    name: "Towing Service",
    icon: <i className="fi fi-br-truck-tow text-[28px] text-maxmove-500"></i>,
    description: "Towing service for cars and motorcycles",
    dimensions: "4.8 x 2.1 x 1.8 Meter",
    maxWeight: "Up to 2800 kg"
  },
  {
    name: "Refrigerated Vehicle",
    icon: <Snowflake className="w-7 h-7 text-maxmove-500" />,
    description: "Temperature-controlled transport",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 400 kg"
  }
];

const VehicleSelection = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContentVisible(true);
        } else {
          setContentVisible(false);
        }
      },
      {
        threshold: 0.3, // Adjusted threshold to 0.3 (30%)
        rootMargin: '0px 0px -30% 0px' // This makes the trigger point 30% lower
      }
    );

    if (contentRef.current) {
      contentObserver.observe(contentRef.current);
    }

    return () => {
      contentObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full space-y-3">
      <h2 className="text-xl font-semibold text-maxmove-900">
        Available Vehicles
      </h2>
      <div 
        ref={contentRef}
        className="space-y-3"
      >
        {vehicles.map((vehicle, index) => (
          <Card 
            key={index} 
            className={`transform transition-all duration-600 ease-in-out overflow-hidden
              ${isContentVisible 
                ? 'opacity-100 translate-y-0 hover:shadow-md cursor-pointer' 
                : 'opacity-0 translate-y-10'
              } ${isContentVisible ? 'p-4' : 'p-2'}`}
            style={{
              transitionDelay: `${index * 150}ms`
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-maxmove-50 rounded-lg">
                {vehicle.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-maxmove-900">
                  {vehicle.name}
                </h3>
                <p 
                  className={`text-sm text-maxmove-600 transition-all duration-600 ease-in-out ${
                    isContentVisible ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-4 max-h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 100}ms`
                  }}
                >
                  {vehicle.description}
                </p>
                <div 
                  className={`flex items-center gap-2 text-sm text-maxmove-500 transition-all duration-600 ease-in-out ${
                    isContentVisible ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-4 max-h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 200}ms`
                  }}
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