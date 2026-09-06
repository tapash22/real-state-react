import gsap from "gsap";
import L from "leaflet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import { FiDollarSign } from "react-icons/fi";
import { Marker, Popup } from "react-leaflet";
import type { MapItem } from "../../data";

interface MapMarkerProps {
  property: MapItem;
  isHighlighted: boolean;
  onHover: (id: number | null) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = React.memo(
  ({ property, isHighlighted, onHover }) => {
    const markerRef = useRef<L.Marker | null>(null);

    const animationRef = useRef<gsap.core.Timeline | null>(null);

    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /*
     * Marker icon
     */
    const icon = useMemo(() => {
      const html = renderToStaticMarkup(
        <div
          className={`
            property-marker
            flex
            h-[42px]
            w-[42px]
            items-center
            justify-center
            cursor-pointer
            transition-transform
            duration-200
            ease-out
            ${isHighlighted ? "scale-[1.15]" : "scale-100"}
        `}
        >
          <FaLocationDot
            size={30}
            className={`
              transition-all duration-200 ease-out
              ${
                isHighlighted
                  ? "scale-[1.2] text-[var(--primary)] drop-shadow-md z-50"
                  : "text-[var(--muted)]"
              }
            `}
          />
        </div>,
      );

      return L.divIcon({
        html,
        className: "property-marker",
        iconSize: [42, 42],
        iconAnchor: [21, 42],
      });
    }, [isHighlighted]);

    /*
     * Clear pending hover timeout.
     */
    const clearHoverTimeout = useCallback(() => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    }, []);

    /*
     * Open / close popup from React hover state.
     */
    useEffect(() => {
      const marker = markerRef.current;

      if (!marker) return;

      if (isHighlighted) {
        marker.openPopup();
      } else {
        marker.closePopup();
      }
    }, [isHighlighted]);

    /*
     * Popup animation.
     */
    const animatePopup = useCallback(() => {
      requestAnimationFrame(() => {
        const popup = document.querySelector(
          `.property-popup [data-property-id="${property.id}"]`,
        );

        if (!(popup instanceof HTMLElement)) return;

        const card = popup.querySelector(".property-card");

        if (!(card instanceof HTMLDivElement)) return;

        animationRef.current?.kill();

        gsap.set(card, {
          autoAlpha: 0,
          scale: 0.9,
          y: 0,
          transformOrigin: "bottom center",
        });

        animationRef.current = gsap.timeline().to(card, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.25,
          ease: "back.out(1.4)",
        });
      });
    }, [property.id]);

    /*
     * Cleanup.
     */
    useEffect(() => {
      return () => {
        clearHoverTimeout();
        animationRef.current?.kill();
      };
    }, [clearHoverTimeout]);

    return (
      <Marker
        ref={markerRef}
        position={[property.lat, property.lng]}
        icon={icon}
        eventHandlers={{
          mouseover: () => {
            onHover(property.id);
          },

          mouseout: () => {
            onHover(null);
          },
        }}
      >
        <Popup
          className="property-popup"
          closeButton={false}
          closeOnClick={false}
          autoClose={false}
          eventHandlers={{
            add: animatePopup,
          }}
        >
          <div className="property-popup-inner" data-property-id={property.id}>
            <div className="property-card">
              <div className="flex flex-col w-full space-y-2">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-card-image rounded-md"
                />
                <div className="flex justify-center items-center whitespace-nowrap text-lg font-semibold tracking-wide border-t border-b border-[var-(--border)]">
                  {property.currency === "$" ? (
                    <FiDollarSign
                      size={20}
                      className="text-[var(--muted)] font-bold"
                    />
                  ) : (
                    "€"
                  )}
                  <p></p>
                  {property.price}
                </div>
              </div>

              <div className="flex flex-col space-y-2 justify-start text-sm">
                <h3 className="font-semibold">{property.title}</h3>
                <div className="font-normal">{property.location}</div>
                <div className="flex py-2 gap-1 font-medium border-t border-b border-[var-(--border)]">
                  <span className="tracking-wide">
                    {property.bedrooms} Beds
                  </span>

                  <span className="tracking-wide">
                    {property.bathrooms} Baths
                  </span>

                  <span className="tracking-wide">
                    {property.area} {property.areaUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  },
);

MapMarker.displayName = "MapMarker";
