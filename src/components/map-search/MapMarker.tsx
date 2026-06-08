import L from "leaflet";
import React, { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { Property } from "../../types/types";

interface MapMarkerProps {
  property: Property;
  isHighlighted: boolean;
  onHover: (id: number | null) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = React.memo(
  ({ property, isHighlighted, onHover }) => {
    const customIcon = useMemo(() => {
      return L.divIcon({
        className: "custom-price-marker",
        html: `
        <div style="
          background-color: ${isHighlighted ? "#ff5a5f" : "white"}; 
          color: ${isHighlighted ? "white" : "#222"}; 
          border: 1px solid ${isHighlighted ? "#ff5a5f" : "#dddddd"}; 
          padding: 5px 10px; 
          border-radius: 20px; 
          font-weight: bold; 
          font-size: 13px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          white-space: nowrap;
          transition: transform 0.1s ease;
          transform: ${isHighlighted ? "scale(1.08)" : "scale(1)"};
        ">
          €${property.price}
        </div>
      `,
        iconSize: [75, 28],
        iconAnchor: [37, 14],
      });
    }, [property.price, isHighlighted]);

    return (
      <Marker
        position={[property.lat, property.lng]}
        icon={customIcon}
        eventHandlers={{
          mouseover: () => onHover(property.id),
          mouseout: () => onHover(null),
        }}
      >
        <Popup closeButton={false}>
          <div style={{ width: "130px", fontFamily: "sans-serif" }}>
            <img
              src={property.image}
              alt=""
              style={{
                width: "100%",
                height: "75px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <strong style={{ display: "block", marginTop: "4px" }}>
              €{property.price}/mo
            </strong>
          </div>
        </Popup>
      </Marker>
    );
  },
);

MapMarker.displayName = "MapMarker";
