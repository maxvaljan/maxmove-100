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
  const [hasInitialized, setHasInitialized] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Prevent animations on initial load
    const timer = setTimeout(() => {
      setHasInitialized(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = cardsRef.current.findIndex(ref => ref === entry.target);
          if (cardIndex === -1) return;

          if (entry.isIntersecting) {
            setVisibleCards(prev => [...new Set([...prev, cardIndex])]);
          } else {
            // Only hide if element is completely out of view
            if (entry.intersectionRatio === 0) {
              setVisibleCards(prev => prev.filter(index => index !== cardIndex));
            }
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5, 1.0],
        rootMargin: '50px',
      }
    );

    cardsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [hasInitialized]);

  if (!hasInitialized) {
    return (
      <div className="w-full space-y-4 opacity-0">
        <h2 className="text-xl font-semibold text-maxmove-900">Available Vehicles</h2>
        <div className="space-y-4">
          {vehicles.map((_, index) => (
            <Card key={index} className="p-4" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="w-full space-y-4">
      <h2 className="text-xl font-semibold text-maxmove-900 transition-all duration-500">
        Available Vehicles
      </h2>
      <div className="space-y-4">
        {vehicles.map((vehicle, index) => (
          <Card 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className={`transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform overflow-hidden
              ${visibleCards.includes(index) 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-10'
              } hover:shadow-lg hover:-translate-y-1 hover:bg-maxmove-50/50`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-start gap-4 p-4">
              <div className={`flex-shrink-0 p-2 bg-maxmove-50 rounded-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                visibleCards.includes(index) 
                  ? 'opacity-100 scale-100 rotate-0' 
                  : 'opacity-0 scale-0 rotate-45'
              }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`
                }}
              >
                {vehicle.icon}
              </div>
              <div className="flex-1 space-y-1 overflow-hidden">
                <h3 className={`font-semibold text-maxmove-900 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                  ${visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100 + 300}ms`
                  }}
                >
                  {vehicle.name}
                </h3>
                <p className={`text-sm text-maxmove-600 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                  ${visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100 + 400}ms`
                  }}
                >
                  {vehicle.description}
                </p>
                <div className={`flex items-center gap-2 text-sm text-maxmove-500 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform
                  ${visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100 + 500}ms`
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
