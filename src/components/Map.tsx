import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MapProps {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
}

const Map = ({ pickupLocation, dropoffLocation }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        console.log('Fetching Mapbox token...');
        const { data, error } = await supabase
          .from('api_keys')
          .select('key_value')
          .eq('key_name', 'mapbox_public_token')
          .single();

        if (error) {
          console.error('Error fetching Mapbox token:', error);
          toast.error('Error loading map. Please try again later.');
          return;
        }

        if (!data?.key_value) {
          console.error('No Mapbox token found');
          toast.error('Map configuration not found');
          return;
        }

        console.log('Mapbox token fetched successfully');
        setMapboxToken(data.key_value);
      } catch (err) {
        console.error('Unexpected error fetching Mapbox token:', err);
        toast.error('Error initializing map');
      }
    };

    fetchMapboxToken();
  }, []);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    try {
      console.log('Initializing map...');
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40], // Default center
        zoom: 9
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      console.log('Map initialized successfully');
    } catch (err) {
      console.error('Error initializing map:', err);
      toast.error('Error loading map');
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update markers when locations change
  useEffect(() => {
    if (!map.current) return;

    try {
      // Remove existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while (markers[0]) {
        markers[0].remove();
      }

      // Add pickup marker
      if (pickupLocation) {
        new mapboxgl.Marker({ color: '#4CAF50' })
          .setLngLat(pickupLocation)
          .addTo(map.current);
      }

      // Add dropoff marker
      if (dropoffLocation) {
        new mapboxgl.Marker({ color: '#F44336' })
          .setLngLat(dropoffLocation)
          .addTo(map.current);
      }

      // Fit bounds to show both markers
      if (pickupLocation && dropoffLocation) {
        const bounds = new mapboxgl.LngLatBounds()
          .extend(pickupLocation)
          .extend(dropoffLocation);

        map.current.fitBounds(bounds, {
          padding: 100,
          duration: 1000
        });
      }
    } catch (err) {
      console.error('Error updating markers:', err);
      toast.error('Error updating map markers');
    }
  }, [pickupLocation, dropoffLocation]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;