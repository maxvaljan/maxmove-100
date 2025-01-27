import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Map from "./Map";
import { useState } from "react";

const vehicleTypes = [
  { id: 1, name: "Sedan", icon: <div>🚗</div> },
  { id: 2, name: "SUV", icon: <div>🚙</div> },
  { id: 3, name: "Truck", icon: <div>🚚</div> },
];

const PlaceOrder = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0].id);

  return (
    <div className="flex h-[calc(100vh-57px)]">
      <div className="w-1/2 p-6">
        {/* Top Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            Back
          </Button>
          <Button variant="outline" className="bg-white">
            Save as draft
          </Button>
        </div>

        {/* Route Section */}
        <div className="space-y-4 mt-6">
          <h2 className="text-sm text-gray-500 font-medium">
            ROUTE (MAX. 20 STOPS)
          </h2>
          <div className="space-y-3">
            <div className="relative">
              <Input placeholder="Pickup location" className="pl-10" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="relative">
              <Input placeholder="Drop-off location" className="pl-10" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            Add stop
          </Button>
        </div>

        {/* Vehicle Type Section */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-500 font-medium">VEHICLE TYPE</h2>
            <Button variant="ghost" className="text-orange-500">
              Compare vehicles
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {vehicleTypes.map((vehicle) => (
              <Button
                key={vehicle.id}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center gap-2 ${
                  selectedVehicle === vehicle.id
                    ? "border-orange-500 bg-orange-50"
                    : "bg-white"
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                {vehicle.icon}
                <span className="text-sm font-normal">{vehicle.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-1/2">
        <Map />
      </div>
    </div>
  );
};

export default PlaceOrder;
