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
  pane: string;
}

export const MapMarker = React.memo(function MapMarker({
  property,
  isHighlighted,
  onHover,
  pane,
}: MapMarkerProps) {
  const markerRef = useRef<L.Marker | null>(null);

  const animationRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Used to delay closing the popup.
   *
   * This gives the user enough time to move:
   *
   * marker → popup
   *
   * without the popup disappearing.
   */
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
   * -----------------------------------------
   * Schedule popup close
   * -----------------------------------------
   */
  const scheduleClose = useCallback(() => {
    clearHoverTimeout();

    hoverTimeoutRef.current = setTimeout(() => {
      onHover(null);
      hoverTimeoutRef.current = null;
    }, 180);
  }, [clearHoverTimeout, onHover]);

  /*
   * Marker icon
   */
  const icon = useMemo(() => {
    const html = renderToStaticMarkup(
      <div
        className={`
    relative
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
        {/* Outline */}
        {isHighlighted && (
          <FaLocationDot
            size={44}
            className="
        absolute
        inset-0
        text-[#8a88e0]
      "
          />
        )}

        {/* Main icon */}
        <FaLocationDot
          size={30}
          className={`
      relative
      fill-current
      transition-all
      duration-200
      ease-out
      ${
        isHighlighted
          ? `
            scale-[1.2]
            text-[#7c3aed]
          `
          : "text-[#9ca3af]"
      }
    `}
        />
      </div>,
    );

    return L.divIcon({
      html,
      className: "property-marker-wrapper",
      iconSize: [40, 40],
      iconAnchor: [21, 40],
    });
  }, [isHighlighted]);

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
      pane={pane}
      icon={icon}
      eventHandlers={{
        mouseover: () => {
          clearHoverTimeout();
          onHover(property.id);
        },

        mouseout: () => {
          scheduleClose();
        },
      }}
    >
      <Popup
        className="property-popup"
        closeButton={false}
        closeOnClick={false}
        autoClose={false}
        /*
         * Move popup DOWN from the geographic point.
         *
         * This allows the marker to visually sit
         * above the card.
         */
        offset={[0, -10]}
        eventHandlers={{
          add: animatePopup,
        }}
      >
        <div
          className="property-popup-inner"
          data-property-id={property.id}
          onMouseEnter={() => {
            /*
             * User reached the card.
             * Cancel the pending close.
             */
            clearHoverTimeout();
            onHover(property.id);
          }}
          onMouseLeave={() => {
            /*
             * User left the card.
             */
            scheduleClose();
          }}
        >
          <div className="property-card">
            <div className="flex flex-col w-full space-y-2">
              <img
                src={property.image}
                alt={property.title}
                className="property-card-image rounded-md"
              />
              <div className="flex justify-center items-center whitespace-nowrap text-lg font-semibold tracking-wide border-t border-b border-[var(--border)] p-0">
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

            <div className="flex flex-col space-y-2 justify-start text-sm py-1">
              <h3 className="font-semibold">{property.title}</h3>
              <div className="font-normal">{property.location}</div>
              <div className="flex py-2 gap-1 font-medium border-t border-b-2 border-[var(--border)]">
                <span className="tracking-wide">{property.bedrooms} Beds</span>

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
});
