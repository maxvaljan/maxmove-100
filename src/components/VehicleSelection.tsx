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
  const [isSectionVisible, setSectionVisible] = useState(false);
  const [isContentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Add a small delay to prevent rapid state changes
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            if (entry.target === sectionRef.current) {
              setSectionVisible(true);
            } else if (entry.target === contentRef.current) {
              setContentVisible(true);
            }
          });
        } else {
          // Only hide content when it's completely out of view
          if (entry.intersectionRatio === 0) {
            requestAnimationFrame(() => {
              if (entry.target === sectionRef.current) {
                setSectionVisible(false);
              } else if (entry.target === contentRef.current) {
                setContentVisible(false);
              }
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full space-y-4"
    >
      <h2 className={`text-xl font-semibold text-maxmove-900 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${
        isSectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
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
            className={`transform transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden will-change-transform
              ${isSectionVisible 
                ? 'opacity-100 translate-y-0 scale-100 hover:shadow-lg hover:-translate-y-1 hover:bg-maxmove-50/50' 
                : 'opacity-0 translate-y-8 scale-98'
              } ${isContentVisible ? 'p-4' : 'p-2'}`}
            style={{
              transitionDelay: `${index * 100}ms`,
              transform: `perspective(1000px) ${!isSectionVisible ? 'rotateX(-5deg)' : 'rotateX(0deg)'}`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 p-2 bg-maxmove-50 rounded-lg transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${
                isSectionVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-90 -rotate-12 opacity-0'
              } ${isContentVisible ? 'scale-100' : 'scale-95'}`}
                style={{
                  transitionDelay: `${index * 100 + 100}ms`
                }}
              >
                {vehicle.icon}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className={`font-semibold text-maxmove-900 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${
                  isSectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                } ${isContentVisible ? 'text-base' : 'text-sm'}`}
                  style={{
                    transitionDelay: `${index * 100 + 200}ms`
                  }}
                >
                  {vehicle.name}
                </h3>
                <p 
                  className={`text-sm text-maxmove-600 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${
                    isContentVisible ? 'opacity-100 translate-y-0 max-h-20' : 'opacity-0 translate-y-2 max-h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100 + 300}ms`
                  }}
                >
                  {vehicle.description}
                </p>
                <div 
                  className={`flex items-center gap-2 text-sm text-maxmove-500 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${
                    isContentVisible ? 'opacity-100 translate-x-0 max-h-20' : 'opacity-0 translate-x-2 max-h-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100 + 400}ms`
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