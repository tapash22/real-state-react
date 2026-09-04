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
                  ? "scale-[1.2] text-[var(--primary)] drop-shadow-md"
                  : "text-[var(--muted)]"
              }
            `}
          />
        </div>,
      );

      return L.divIcon({
        html,
        className: "property-marker-wrapper",
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
     * Mouse enters marker.
     *
     * Activate immediately.
     */
    const handleMouseOver = useCallback(() => {
      clearHoverTimeout();

      onHover(property.id);
    }, [clearHoverTimeout, onHover, property.id]);

    /*
     * Mouse leaves marker.
     *
     * Don't immediately close the popup.
     *
     * Leaflet can fire mouseout for tiny internal movements,
     * which causes the popup to bounce.
     */
    const handleMouseOut = useCallback(
      (event: L.LeafletMouseEvent) => {
        clearHoverTimeout();

        const markerElement = markerRef.current?.getElement();

        if (!markerElement) return;

        const relatedTarget = event.originalEvent.relatedTarget;

        /*
         * If the mouse is still somewhere inside the marker,
         * don't remove hover.
         */
        if (
          relatedTarget instanceof Node &&
          markerElement.contains(relatedTarget)
        ) {
          return;
        }

        /*
         * Small delay prevents:
         *
         * marker
         * ↓
         * tiny gap
         * ↓
         * marker
         *
         * from causing:
         *
         * open → close → open
         */
        hoverTimeoutRef.current = setTimeout(() => {
          onHover(null);
          hoverTimeoutRef.current = null;
        }, 120);
      },
      [clearHoverTimeout, onHover],
    );

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
          y: 10,
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
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
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
              <div className="property-card-image-wrapper">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-card-image"
                />

                <div className="property-card-price">
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

              <div className="property-card-content">
                <h3 className="property-card-title">{property.title}</h3>

                <div className="property-card-location">
                  {property.location}
                </div>

                <div className="property-card-details">
                  <span>{property.bedrooms} Beds</span>

                  <span>{property.bathrooms} Baths</span>

                  <span>
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
