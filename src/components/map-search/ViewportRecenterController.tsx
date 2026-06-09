// src/components/map-search/ViewportRecenterController.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface ViewportRecenterControllerProps {
  center: [number, number];
}

/**
 * Navigation utility component for React-Leaflet.
 * Smoothly repositions the root canvas frame whenever coordinate targets update.
 */
export function ViewportRecenterController({
  center,
}: ViewportRecenterControllerProps) {
  const map = useMap(); // Accesses the Leaflet map instance safely

  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      // Smoothly pans and zooms the map over to the target country coordinates
      // Zoom level 7 is perfect for displaying broad regional boundaries (Bangladesh, India, etc.)
      map.flyTo(center, 7, {
        animate: true,
        duration: 1.5, // Animate transit over 1.5 seconds
      });
    }
  }, [center, map]);

  return null; // This component operates silently without rendering visual elements
}
