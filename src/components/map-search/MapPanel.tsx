import L from "leaflet";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, Pane, TileLayer } from "react-leaflet";
import { MapBounds, PropertyLike } from "../../data";
import { MapBoundsHandler } from "./MapBoundsHandler";
import { MapMarker } from "./MapMarker";
import { getMarkerLayers } from "./markerLayers";
import { styles } from "./styles";
import { ViewportRecenterController } from "./ViewportRecenterController";

/* Component Props */
export interface MapPanelProps {
  properties: PropertyLike[];
  center: [number, number];
  initialCenter: [number, number];
  hoveredId: number | null;
  onHover?: (id: number | null) => void;
  setHoveredId?: (id: number | null) => void;
  onBoundsChange?: (bounds: MapBounds) => void;
  interactive?: boolean;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  properties,
  center,
  initialCenter,
  hoveredId,
  onHover,
  setHoveredId,
  onBoundsChange,
  interactive = true,
}) => {
  const [map, setMap] = useState<L.Map | null>(null);

  /* Hover Handler                                                            */
  const handleHover = useCallback(
    (id: number | null) => {
      if (onHover) {
        onHover(id);
        return;
      }

      if (setHoveredId) {
        setHoveredId(id);
      }
    },
    [onHover, setHoveredId],
  );

  /* Bounds Handler                                                           */
  const handleBoundsChange = useCallback(
    (bounds: MapBounds) => {
      onBoundsChange?.(bounds);
    },
    [onBoundsChange],
  );

  /* Marker Layers                                                            */
  const markerLayers = useMemo(() => getMarkerLayers(hoveredId), [hoveredId]);

  /* Initial Map Setup                                                        */
  useEffect(() => {
    if (!map) {
      return;
    }

    /*
     * Leaflet sometimes calculates its size before
     * the container has reached its final dimensions.
     *
     * invalidateSize() forces Leaflet to recalculate
     * the map dimensions.
     */
    map.invalidateSize();

    if (!onBoundsChange) {
      return;
    }

    const bounds = map.getBounds();

    handleBoundsChange({
      north: bounds.getNorth(),
      east: bounds.getEast(),
      south: bounds.getSouth(),
      west: bounds.getWest(),
    });
  }, [map, onBoundsChange, handleBoundsChange]);

  return (
    <div
      style={styles.rightPanel}
      className="
        pointer-events-auto
        absolute
        p-2 lg:p-5
        z-[400]
        rounded-lg
        backdrop-blur-md
      "
    >
      <MapContainer
        ref={setMap}
        center={initialCenter}
        zoom={12}
        style={styles.mapElement}
        dragging={interactive}
        scrollWheelZoom={interactive}
        doubleClickZoom={interactive}
        touchZoom={interactive}
        boxZoom={interactive}
        keyboard={interactive}
        zoomControl={interactive}
        className="
          relative
          h-full
          w-full
          overflow-hidden
          rounded-2xl
          border-4
          border-[color-mix(in_srgb,var(--border)_45%,transparent)]
          drop-shadow-[5px_5px_25px_var(--primary)]
          shadow-sm
        "
      >
        {/* Base Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Layered Markers */}
        {markerLayers.map((layer) => (
          <Pane
            key={layer.name}
            name={layer.name}
            style={{ zIndex: layer.zIndex }}
          >
            {properties.filter(layer.filter).map((property) => (
              <MapMarker
                key={property.id}
                property={property}
                isHighlighted={layer.isHighlighted}
                onHover={handleHover}
                pane={layer.name}
              />
            ))}
          </Pane>
        ))}

        {/* Viewport & Bounds Controllers */}
        <ViewportRecenterController center={center} />
        {onBoundsChange && (
          <MapBoundsHandler onBoundsChange={handleBoundsChange} />
        )}
      </MapContainer>

      {/* Glass Outer Ring Frame */}
      <div
        className="
          pointer-events-none
          absolute
          inset-5
          z-[400]
          rounded-lg
          shadow-[inset_0_0_35px_10px_var(--map-inner-glow)]
        "
      />
    </div>
  );
};
