import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapBounds, MapItem } from "../../data";
import { MapBoundsHandler } from "./MapBoundsHandler";
import { MapMarker } from "./MapMarker";
import { styles } from "./styles";
import { ViewportRecenterController } from "./ViewportRecenterController";

/*  Component Props  */

interface MapPanelProps {
  properties: MapItem[];
  center: [number, number];
  initialCenter: [number, number];
  hoveredId: number | null;
  onHover: (id: number | null) => void;
  onBoundsChange: (bounds: MapBounds) => void;
  interactive?: boolean;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  properties,
  center,
  initialCenter,
  hoveredId,
  onHover,
  onBoundsChange,
  interactive = true,
}) => {
  const [map, setMap] = useState<L.Map | null>(null);

  /*  Initial Bounds     */

  useEffect(() => {
    if (!map) return;
    /**
     * Leaflet can calculate incorrect dimensions if the
     * container was initially hidden or its size changed.
     */
    map.invalidateSize();

    const bounds = map.getBounds();

    onBoundsChange({
      north: bounds.getNorth(),
      east: bounds.getEast(),
      south: bounds.getSouth(),
      west: bounds.getWest(),
    });
  }, [map, onBoundsChange]);

  /*  Render  */
  return (
    <div
      style={styles.rightPanel}
      className="
          pointer-events-none
          absolute
          p-5
          z-[400]
          rounded-lg

          shadow-[
            inset_0_0_5px_3px_var(--map-inner-glow),
            inset_0_0_10px_8px_var(--map-glow-soft)
          ]
      drop-shadow-[0_10px_70px_var(--map-glow)]

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
      rounded-xl
      border-2
      border-[color-mix(in_srgb,var(--border)_70%,transparent)]
      bg-[color-mix(in_srgb,var(--nav-link)_15%,transparent)]
        drop-shadow-[0_10px_20px_var(--primary)]

      shadow-[
        0_0_25px_var(--map-glow-soft),
        0_10px_20px_var(--bg-bottom)
      ]
        "
      >
        {/* Base Map */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Programmatic Recenter */}

        <ViewportRecenterController center={center} />

        {/* Bounds Handler */}

        <MapBoundsHandler onBoundsChange={onBoundsChange} />

        {/* Property Markers */}

        {properties.map((property) => (
          <MapMarker
            key={property.id}
            property={property}
            isHighlighted={hoveredId === property.id}
            onHover={onHover}
          />
        ))}
      </MapContainer>

      {/* Soft glass/cloud edge */}
      <div
        className="
      pointer-events-none
      absolute
      inset-5
      z-[400]
      rounded-lg

      shadow-[
        inset_0_0_35px_10px_var(--map-inner-glow)
      ]
    "
      />
    </div>
  );
};
