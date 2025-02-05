import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import VehicleCategorySelector from "./vehicle/VehicleCategorySelector";
import VehicleCarousel from "./vehicle/VehicleCarousel";

// Define which categories belong to express vs heavy
const expressCategories = ['bike_motorcycle', 'car', 'van', 'refrigerated', 'towing', 'light_truck'];
const heavyCategories = ['medium_truck', 'heavy_truck'];

const VehicleSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState<'express' | 'heavy'>('express');

  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: async () => {
      console.log('Fetching vehicle types...');
      const { data, error } = await supabase
        .from('vehicle_types')
        .select('*');
      
      if (error) {
        console.error('Error fetching vehicle types:', error);
        throw error;
      }
      
      console.log('Raw vehicle data:', data);
      
      // Create a Map to store unique vehicles by name AND category
      const uniqueVehiclesMap = new Map();
      
      // Only keep the first occurrence of each vehicle name
      data?.forEach(vehicle => {
        const key = `${vehicle.name}-${vehicle.category}`; // Create unique key combining name and category
        if (!uniqueVehiclesMap.has(key)) {
          uniqueVehiclesMap.set(key, vehicle);
        }
      });
      
      // Convert Map back to array
      const uniqueVehicles = Array.from(uniqueVehiclesMap.values());
      console.log('Filtered unique vehicles:', uniqueVehicles);
      
      return uniqueVehicles;
    }
  });

  if (isLoading) {
    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
          <Button variant="ghost" className="text-maxmove-900">
            More Info
          </Button>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[250px] h-48 flex-none bg-maxmove-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-3">
        <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
        <p className="text-red-500">Error loading vehicles. Please try again later.</p>
      </div>
    );
  }

  // Group vehicles by type (express vs heavy)
  const expressVehicles = vehicles?.filter(v => expressCategories.includes(v.category)) || [];
  const heavyVehicles = vehicles?.filter(v => heavyCategories.includes(v.category)) || [];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-maxmove-900 uppercase">Vehicle Type</h2>
        <Button variant="ghost" className="text-maxmove-900">
          More Info
        </Button>
      </div>
      
      <VehicleCategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {selectedCategory === 'express' && (
        <VehicleCarousel vehicles={expressVehicles} />
      )}
      
      {selectedCategory === 'heavy' && (
        <VehicleCarousel vehicles={heavyVehicles} />
      )}
    </div>
  );
};

export default VehicleSelection;