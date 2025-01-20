import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";

const Book = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-maxmove-50 to-white">
      <Navbar />
      
      {/* Main container with fixed height and padding */}
      <div className="container mx-auto px-4 h-[calc(100vh-80px)] pt-20">
        {/* Flex container for form and map */}
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Form Section - Left Side */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <h1 className="text-4xl font-bold text-maxmove-900 mb-6">
              Book a Delivery
            </h1>
            
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="relative">
                <Input
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-maxmove-400" />
              </div>

              <div className="relative">
                <Input
                  placeholder="Dropoff location"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-maxmove-400" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full justify-start pl-10"
                  >
                    <Calendar className="absolute left-3 h-4 w-4 text-maxmove-400" />
                    Today
                  </Button>
                </div>
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full justify-start pl-10"
                  >
                    <Clock className="absolute left-3 h-4 w-4 text-maxmove-400" />
                    Now
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-maxmove-800 hover:bg-maxmove-900 text-white">
                See prices
              </Button>
            </div>
          </div>

          {/* Map Section - Right Side */}
          <div className="w-full lg:w-2/3 h-full">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;