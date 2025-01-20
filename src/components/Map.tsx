import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from('api_keys')
        .select('key_value')
        .eq('key_name', 'mapbox_public_token')
        .single();

      if (error) {
        console.error('Error fetching Mapbox token:', error);
        return;
      }

      setMapboxToken(data.key_value);
    };

    fetchMapboxToken();
  }, []);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40], // Default center
      zoom: 9
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update markers when locations change
  useEffect(() => {
    if (!map.current) return;

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
  }, [pickupLocation, dropoffLocation]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;