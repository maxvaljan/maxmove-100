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
        const { data, error } = await supabase
          .from('api_keys')
          .select('key_value')
          .eq('key_name', 'mapbox_public_token')
          .single();

        if (error) {
          console.error('Error fetching Mapbox token:', error);
          toast.error('Error loading map');
          return;
        }

        if (!data?.key_value) {
          console.error('No Mapbox token found');
          toast.error('Map configuration not found');
          return;
        }

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
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [103.8198, 1.3521], // Singapore coordinates
        zoom: 11,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          showCompass: false
        }),
        'top-right'
      );

    } catch (err) {
      console.error('Error initializing map:', err);
      toast.error('Error loading map');
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current) return;

    try {
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while (markers[0]) {
        markers[0].remove();
      }

      if (pickupLocation) {
        new mapboxgl.Marker({ color: '#f97316' })
          .setLngLat(pickupLocation)
          .addTo(map.current);
      }

      if (dropoffLocation) {
        new mapboxgl.Marker({ color: '#f97316' })
          .setLngLat(dropoffLocation)
          .addTo(map.current);
      }

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
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;