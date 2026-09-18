import L from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

interface ViewportRecenterControllerProps {
  center: [number, number];
  zoomStep?: number;
  maxZoom?: number;
  onManualRecenter?: () => void;
}

// Custom Leaflet Pulsing Pin Icon for Live Location
const currentLocationIcon = L.divIcon({
  className: "custom-location-pin",
  html: `
    <div class="relative flex items-center justify-center h-8 w-8">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-5 w-5 bg-cyan-500 border-2 border-white shadow-lg"></span>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export function ViewportRecenterController({
  center,
  zoomStep = 1,
  maxZoom = 16,
  onManualRecenter,
}: ViewportRecenterControllerProps) {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [showLocation, setShowLocation] = useState<boolean>(false);

  /**
   * Helper to force pixel-accurate container midpoint alignment
   */
  const centerOnLocation = useCallback(
    (targetCoords: [number, number], targetZoom: number) => {
      if (!map) return;

      map.invalidateSize();
      map.stop();

      const containerSize = map.getSize();
      const centerPoint = L.point(containerSize.x / 2, containerSize.y / 2);

      const targetLatLng = L.latLng(targetCoords[0], targetCoords[1]);
      const targetPoint = map.project(targetLatLng, targetZoom);

      const topLeftPoint = targetPoint.subtract(centerPoint);
      const correctedCenterLatLng = map.unproject(topLeftPoint, targetZoom);

      map.setView(correctedCenterLatLng, targetZoom, { animate: false });

      requestAnimationFrame(() => {
        map.panTo(targetLatLng, { animate: true, duration: 0.8 });
      });
    },
    [map],
  );

  // Prevent map dragging/clicking through the UI button container
  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  /**
   * On Click: Check Geolocation support & permissions
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    // 1. Check if browser supports Geolocation API
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setIsSuccess(false);

    if (onManualRecenter) {
      onManualRecenter();
    }

    // 2. Request current GPS coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const coords: [number, number] = [lat, lng];

        // Store user position and reveal marker on map
        setUserCoords(coords);
        setShowLocation(true);

        const currentZoom = map.getZoom();
        const nextZoom = Math.min(currentZoom + zoomStep, maxZoom);

        // Center map directly on live GPS coordinates
        centerOnLocation(coords, nextZoom);

        setIsLocating(false);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      },
      (error) => {
        setIsLocating(false);
        setIsSuccess(false);

        // 3. Show browser alerts depending on the error type
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "Location access denied. Please enable location permissions in your browser settings to use this feature.",
            );
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is currently unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get your location timed out.");
            break;
          default:
            alert("An unknown error occurred while trying to fetch location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  /**
   * Hide location marker handler
   */
  const handleHideLocation = () => {
    setShowLocation(false);
  };

  if (!onManualRecenter) {
    return null;
  }

  return (
    <>
      {/* Location Pin renders strictly when showLocation is true */}
      {showLocation && userCoords && (
        <Marker position={userCoords} icon={currentLocationIcon}>
          <Popup className="custom-popup">
            <div className="flex flex-col items-center gap-2 p-1 text-center">
              <span className="text-xs font-bold text-gray-800 dark:text-gray-100">
                You are here
              </span>
              <button
                type="button"
                onClick={handleHideLocation}
                className="rounded-lg bg-red-500/80 px-2 py-1 text-[10px] font-medium text-white transition-colors hover:bg-red-600"
              >
                Hide Location
              </button>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Control Button */}
      <div
        ref={containerRef}
        className="leaflet-bottom leaflet-right !mb-6 !mr-6 pointer-events-auto z-[1000]"
      >
        <button
          type="button"
          onClick={handleClick}
          disabled={isLocating}
          className="
            group relative flex items-center gap-2.5 overflow-hidden
            rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5
            text-xs font-semibold text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
            backdrop-blur-xl transition-all duration-300
            hover:border-white/40 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105
            active:scale-95 disabled:pointer-events-none disabled:opacity-50
            dark:border-white/10 dark:bg-gray-900/40 dark:text-gray-100 dark:hover:bg-gray-900/60
          "
          title="Recenter Map to My Location"
        >
          {/* Ambient Hover Glow */}
          <span className="absolute -inset-x-2 -inset-y-2 -z-10 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-teal-500/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Dynamic Icons */}
          {isSuccess ? (
            <svg
              className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_28px_rgba(52,211,153,0.8)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : isLocating ? (
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]"></span>
            </span>
          ) : (
            <svg
              className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          )}

          <span className="tracking-wide drop-shadow-sm">
            {isLocating ? "Locating..." : isSuccess ? "Centered!" : "Recenter"}
          </span>
        </button>
      </div>
    </>
  );
}
