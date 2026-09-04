import L from "leaflet";
import React, { useCallback, useEffect, useMemo } from "react";
import { useMapEvents } from "react-leaflet";

import { MapBounds } from "../../data";
import { debounce } from "./utils";

interface MapBoundsHandlerProps {
  onBoundsChange: (bounds: MapBounds) => void;
  interactive?: boolean;
}

export const MapBoundsHandler: React.FC<MapBoundsHandlerProps> = ({
  onBoundsChange,
  interactive = true,
}) => {
  /**
   * Convert Leaflet's LatLngBounds into our application's
   * MapBounds structure.
   */
  const handleBoundsChange = useCallback(
    (bounds: L.LatLngBounds | null) => {
      if (!bounds) return;

      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      onBoundsChange({
        north: northEast.lat,
        east: northEast.lng,
        south: southWest.lat,
        west: southWest.lng,
      });
    },
    [onBoundsChange],
  );

  /**
   * Prevent onBoundsChange from firing continuously while
   * the user is dragging or zooming the map.
   */
  const debouncedChange = useMemo(
    () =>
      debounce((bounds: L.LatLngBounds | null) => {
        handleBoundsChange(bounds);
      }, 200),
    [handleBoundsChange],
  );

  /**
   * Listen for viewport changes.
   */
  const map = useMapEvents(
    interactive
      ? {
          zoomend: () => {
            debouncedChange(map.getBounds());
          },

          dragend: () => {
            debouncedChange(map.getBounds());
          },
        }
      : {},
  );

  /**
   * Cleanup debounce when component unmounts.
   */
  useEffect(() => {
    return () => {
      debouncedChange.cancel?.();
    };
  }, [debouncedChange]);

  return null;
};

MapBoundsHandler.displayName = "MapBoundsHandler";
