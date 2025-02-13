
import { useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// Use the DriverStatus from the Database types
type DriverStatus = Database["public"]["Enums"]["DriverStatus"];

// Define the parameters expected by the RPC function
type UpdateDriverLocationParams = {
  p_driver_id: string | undefined;
  p_latitude: number;
  p_longitude: number;
  p_status: Database["public"]["Enums"]["DriverStatus"];
}

const LocationUpdater = () => {
  const updateDriverLocation = useCallback(async (position: GeolocationPosition) => {
    try {
      const user = await supabase.auth.getUser();
      
      const params: UpdateDriverLocationParams = {
        p_driver_id: user.data.user?.id,
        p_latitude: position.coords.latitude,
        p_longitude: position.coords.longitude,
        p_status: 'available'
      };

      const { error } = await supabase
        .rpc('update_driver_location', params);

      if (error) {
        console.error('Error updating location:', error);
        toast.error('Failed to update location');
      }
    } catch (err) {
      console.error('Error in location update:', err);
      toast.error('Failed to update location');
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      updateDriverLocation,
      (error) => {
        console.error('Geolocation error:', error);
        toast.error('Failed to get location');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [updateDriverLocation]);

  return null;
};

export default LocationUpdater;
