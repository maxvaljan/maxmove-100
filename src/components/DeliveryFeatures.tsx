import { DollarSign, Clock, Truck, Shield, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DeliveryFeatures = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    {
      src: "/lovable-uploads/01ec132b-c367-4e95-9389-96294b1140dd.png",
      alt: "Maxmove delivery team loading boxes into a truck",
    },
    {
      src: "/lovable-uploads/462a0b5e-62c8-472a-999a-27c0aeaddfe6.png",
      alt: "Maxmove movers handling packages with care",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col items-start relative">
          <Carousel 
            className="w-full" 
            opts={{ loop: true }}
            onSelect={(api) => {
              setCurrentSlide(api?.selectedScrollSnap() || 0);
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-2xl w-full h-[500px] object-cover shadow-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-4 w-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const carouselElement = document.querySelector('[data-embla-container]');
                  if (carouselElement) {
                    const emblaApi = (carouselElement as any).__embla;
                    emblaApi?.scrollTo(index);
                  }
                }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  currentSlide === index 
                    ? "bg-maxmove-600 w-6" 
                    : "bg-maxmove-300 hover:bg-maxmove-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-maxmove-800">
              Your 24/7 delivery partner
            </h2>
            <p className="text-2xl sm:text-3xl text-maxmove-600 font-semibold">
              Fast. Simple. Affordable.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <DollarSign className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Affordable</h3>
                <p className="text-maxmove-600">Transparent pricing with no hidden costs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Speedy order matching</h3>
                <p className="text-maxmove-600">Match orders and deliver your goods immediately.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Truck className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Reliable driver network</h3>
                <p className="text-maxmove-600">Different vehicle types and courier services for all kinds of delivery needs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Shield className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Safe delivery</h3>
                <p className="text-maxmove-600">Professional and trained drivers ensure all your goods safely reach their destination.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Real-time tracking</h3>
                <p className="text-maxmove-600">In-app tracking allows you and the receiver to track your order in real time during the delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryFeatures;