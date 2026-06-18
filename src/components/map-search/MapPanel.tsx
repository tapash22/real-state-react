import L from "leaflet";
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { MapBounds, MapItem } from "../../types/types";

import { MapMarker } from "./MapMarker";
import { styles } from "./styles";
import { debounce } from "./utils";

import { ViewportRecenterController } from "./ViewportRecenterController";

interface MapBoundsHandlerProps {
  onBoundsChange: (bounds: MapBounds) => void;
}

const MapBoundsHandler: React.FC<MapBoundsHandlerProps> = ({
  onBoundsChange,
}) => {
  const debouncedChange = useMemo(
    () =>
      debounce((bounds: L.LatLngBounds | null) => {
        if (!bounds) return;
        onBoundsChange({
          north: bounds.getNorthEast().lat,
          east: bounds.getNorthEast().lng,
          south: bounds.getSouthWest().lat,
          west: bounds.getSouthWest().lng,
        });
      }, 200),
    [onBoundsChange],
  );

  const map = useMapEvents({
    // drag: () => debouncedChange(map.getBounds()),
    zoomend: () => debouncedChange(map.getBounds()),
    dragend: () => debouncedChange(map.getBounds()),
  });

  return null;
};

// 2. Add 'center' prop right here into your component interface contract
interface MapPanelProps {
  properties: MapItem[];
  center: [number, number]; //  Added this line
  initialCenter: [number, number];
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  onBoundsChange: (bounds: MapBounds) => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  properties,
  center, //  3. Destructure the center property value here
  initialCenter,
  hoveredId,
  setHoveredId,
  onBoundsChange,
}) => {
  const [map, setMap] = useState<L.Map | null>(null);

  // Safely trigger initial boundaries calculation once the map instance attaches to state
  useEffect(() => {
    if (!map) return;

    map.invalidateSize();

    const bounds = map.getBounds();

    onBoundsChange({
      north: bounds.getNorthEast().lat,
      east: bounds.getNorthEast().lng,
      south: bounds.getSouthWest().lat,
      west: bounds.getSouthWest().lng,
    });
  }, [map]);

  return (
    <div style={styles.rightPanel}>
      <MapContainer
        center={initialCenter}
        zoom={12}
        style={styles.mapElement}
        ref={setMap} // <-- React Leaflet automatically hooks your state setter here safely
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🗺️ 4. Injected your brand-new external recenter helper file component */}
        <ViewportRecenterController center={center} />

        <MapBoundsHandler onBoundsChange={onBoundsChange} />

        {properties.map((prop) => (
          <MapMarker
            key={prop.id}
            property={prop}
            isHighlighted={hoveredId === prop.id}
            onHover={setHoveredId}
          />
        ))}
      </MapContainer>
    </div>
  );
};
