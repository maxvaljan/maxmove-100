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
    name: "Van",
    icon: <i className="fi fi-rr-van text-[28px] text-maxmove-500"></i>,
    description: "Van delivery of multiple medium-large size items",
    dimensions: "1.6 x 1.2 x 1 Meter",
    maxWeight: "Up to 3.5t"
  },
  {
    name: "Light Truck",
    icon: <Truck className="w-7 h-7 text-maxmove-500" />,
    description: "Light truck for larger deliveries",
    dimensions: "2.3 x 1.2 x 1.2 Meter",
    maxWeight: "3.5-7.5t"
  },
  {
    name: "Medium Truck",
    icon: <Truck className="w-7 h-7 text-maxmove-500" />,
    description: "Medium truck for heavy deliveries",
    dimensions: "2.9 x 1.4 x 1.7 Meter",
    maxWeight: "7.5-12t"
  },
  {
    name: "Heavy Truck",
    icon: <Truck className="w-7 h-7 text-maxmove-500" />,
    description: "Heavy truck for industrial equipment",
    dimensions: "7.5 x 2.4 x 2.3 Meter",
    maxWeight: "Over 12t"
  },
  {
    name: "Towing Service",
    icon: <i className="fi fi-br-truck-tow text-[28px] text-maxmove-500"></i>,
    description: "Towing service for cars and motorcycles",
    dimensions: "4.8 x 2.1 x 1.8 Meter",
    maxWeight: "Up to 2.8t"
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
  const [isSectionVisible, setSectionVisible] = useState(false);
  const [isContentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        } else {
          setSectionVisible(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContentVisible(true);
        } else {
          setContentVisible(false);
        }
      },
      {
        threshold: 0.5,
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

  return (
    <div 
      ref={sectionRef}
      className="w-full space-y-3"
    >
      <h2 className={`text-lg font-semibold text-maxmove-900 transition-all duration-600 ease-in-out ${
        isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
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
              ${isSectionVisible 
                ? 'opacity-100 translate-y-0 hover:shadow-md cursor-pointer scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
              } ${isContentVisible ? 'p-3' : 'p-2'}`}
            style={{
              transitionDelay: `${index * 150}ms`
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`flex items-center justify-center flex-shrink-0 w-12 h-12 bg-maxmove-50 rounded-lg transition-all duration-600 ease-in-out ${
                isSectionVisible ? 'scale-100' : 'scale-95'
              } ${isContentVisible ? 'scale-100' : 'scale-90'}`}
                style={{
                  transitionDelay: `${index * 150 + 100}ms`
                }}
              >
                {vehicle.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className={`font-semibold text-maxmove-900 transition-all duration-600 ease-in-out ${
                  isSectionVisible ? 'opacity-100' : 'opacity-0'
                } ${isContentVisible ? 'text-sm' : 'text-xs'}`}
                  style={{
                    transitionDelay: `${index * 150 + 200}ms`
                  }}
                >
                  {vehicle.name}
                </h3>
                <p 
                  className={`text-xs text-maxmove-600 transition-all duration-600 ease-in-out ${
                    isContentVisible ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-4 max-h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 300}ms`
                  }}
                >
                  {vehicle.description}
                </p>
                <div 
                  className={`flex flex-col gap-1 text-xs text-maxmove-500 transition-all duration-600 ease-in-out ${
                    isContentVisible ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-4 max-h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150 + 400}ms`
                  }}
                >
                  <span>📏 {vehicle.dimensions}</span>
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
