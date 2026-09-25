import L from "leaflet";
import React, { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";

interface CurrentLocationMarkerProps {
  position: [number, number];
}

export const CurrentLocationMarker: React.FC<CurrentLocationMarkerProps> = ({
  position,
}) => {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "current-location-marker",
        html: `
          <span class="current-location-marker__pulse"></span>
          <span class="current-location-marker__dot"></span>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    [],
  );

  return (
    <Marker position={position} icon={icon} pane="current-location">
      <Popup>
        Current location
        <br />
        {position[0].toFixed(6)}, {position[1].toFixed(6)}
      </Popup>
    </Marker>
  );
};
