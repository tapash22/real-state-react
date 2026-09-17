import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

interface ViewportRecenterControllerProps {
  center: [number, number];
  zoom?: number | undefined;
  onManualRecenter?: (() => void) | undefined;
}

export function ViewportRecenterController({
  center,
  zoom,
  onManualRecenter,
}: ViewportRecenterControllerProps) {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Helper function to animate map to coordinates
  const flyToTarget = () => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.flyTo(center, zoom ?? 13, {
        animate: true,
        duration: 1.5,
      });
    }
  };

  // Automatically fly to location when props update
  useEffect(() => {
    flyToTarget();
  }, [center, zoom, map]);

  // Prevent map dragging/clicking through the UI button container
  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // 1. Force immediate flyTo animation to current known center
    flyToTarget();

    // 2. Re-trigger parent geolocation refetch if provided
    if (onManualRecenter) {
      onManualRecenter();
    }
  };

  return (
    <div
      ref={containerRef}
      className="leaflet-bottom leaflet-right !mb-6 !mr-6 pointer-events-auto z-[1000]"
    >
      <button
        type="button"
        onClick={handleClick}
        className="
          flex items-center gap-2
          rounded-xl border border-[color-mix(in_srgb,var(--border)_45%,transparent)]
          bg-white/90 px-3.5 py-2.5
          text-xs font-semibold text-gray-700
          shadow-lg backdrop-blur-md transition-all
          hover:bg-white hover:text-black hover:shadow-xl
          active:scale-95 dark:bg-gray-900/90 dark:text-gray-200
        "
        title="Recenter Map"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
        </span>
        Recenter
      </button>
    </div>
  );
}
