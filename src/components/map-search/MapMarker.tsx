import L from "leaflet";
import React, { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapItem } from "../../types/types";

interface MapMarkerProps {
  property: MapItem;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;

          background-color: ${isHighlighted ? "#ff5a5f" : "white"}; 
          color: ${isHighlighted ? "white" : "#222"}; 
          border: 1px solid ${isHighlighted ? "#ff5a5f" : "#dddddd"}; 
          
          padding: 6px 12px;
          border-radius: 999px;

          font-weight: 600;
          font-size: 12px;

          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          white-space: nowrap;

          transform: ${isHighlighted ? "scale(1.08)" : "scale(1)"};
          transition: transform 0.15s ease;
        ">
          ${property.price ? `€${property.price}` : property.name}
        </div>
      `,
        // ✅ IMPORTANT: let it auto size
        iconSize: undefined,
        iconAnchor: undefined,
      });
    }, [property, isHighlighted]);

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
          <div
            style={{
              fontFamily: "sans-serif",
              textAlign: "center",
              padding: "6px 2px",
            }}
          >
            {/* IMAGE */}
            {property.image && (
              <img
                src={property.image}
                alt={property.title || property.name}
                style={{
                  width: "100%",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            )}

            {/* TITLE */}
            <div
              style={{
                marginTop: "8px",
                fontWeight: 600,
                fontSize: "14px",
                color: "#222",
                textAlign: "center",
              }}
            >
              {property.title || property.name}
            </div>

            {/* PRICE */}
            {property.price && (
              <div
                style={{
                  marginTop: "4px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#ff5a5f",
                  textAlign: "center",
                }}
              >
                €{property.price}/mo
              </div>
            )}
          </div>
        </Popup>
      </Marker>
    );
  },
);

MapMarker.displayName = "MapMarker";
