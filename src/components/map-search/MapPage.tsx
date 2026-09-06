import { useCallback, useEffect, useRef, useState } from "react";
import { MapBounds, MapItem, cityExploreProperties } from "../../data";
import { SectionHeader } from "../header-section/SectionHeader";
import { MapPanel } from "./MapPanel";

const bangladeshCenter: [number, number] = [23.685, 90.3563];

export const MapPage = () => {
  /*  State  */

  const [, setBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  /**
   * Keeps the hover-clear timeout in the parent.
   *
   * This prevents:
   *
   * Marker A → null → Marker B
   *
   * when moving quickly between markers.
   */

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*  Properties  */

  const properties: MapItem[] = cityExploreProperties.slice(0, 7);

  /*  Bounds Handler */

  const handleBoundsChange = useCallback((b: MapBounds) => {
    setBounds(b);
  }, []);

  /*  Hover Handler */

  const handleHover = useCallback((id: number | null) => {
    /**
     * Always clear previous timeout.
     */
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);

      hoverTimeoutRef.current = null;
    }

    /**
     * ENTER
     */

    if (id !== null) {
      setHoveredId(id);

      return;
    }
    /**
     * LEAVE
     * ----------------------------------------------
     * Don't immediately clear.
     * This prevents flickering when moving
     * between connected hover areas.
     */

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredId(null);

      hoverTimeoutRef.current = null;
    }, 100);
  }, []);

  /*  Cleanup  */

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      className="
        flex
        w-full
        flex-col
        items-center
        justify-center

        px-8
        transition-colors
        duration-300
        
        lg:px-16
      "
    >
      {/*  HEADER  */}

      <SectionHeader
        tagTitle="Explore cities"
        headerTitle="Your next base could be here"
      />

      {/*  CITY NAVIGATION  */}

      <div className="flex w-full items-center justify-center p-0 lg:p-4">
        <div
          className="
            grid
            w-full
            grid-cols-3
            gap-1
            lg:w-3/4
            lg:grid-cols-7
            lg:gap-4
            xl:w-1/2
          "
        >
          {properties.map((item) => {
            const isActive = hoveredId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => handleHover(item.id)}
                onMouseLeave={() => handleHover(null)}
                className={`
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  whitespace-nowrap
                  rounded-xs
                  border-b-2
                  text-center
                  text-sm
                  font-semibold
                  text-[var(--text)]
                  transition-all
                  duration-200
                  md:text-base
                  ${
                    isActive
                      ? "border-violet-500 opacity-100"
                      : "border-transparent"
                  }
                `}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/*  MAP  */}

      <div
        className="
            relative
            h-[80vh]
            w-full
            overflow-hidden
            rounded-xl

            border
            border-[color-mix(in_srgb,var(--border)_30%,transparent)]

            bg-[color-mix(in_srgb,var(--muted)_50%,transparent)]


            shadow-[
              0_0_5px_var(--map-glow-soft),
              0_20px_0px_var(--map-glow),
              0_20px_0px_color-mix(in_srgb,var(--map-glow)_35%,transparent)
            ]
              drop-shadow-[0_20px_70px_var(--map-glow-soft)]
          "
      >
        <MapPanel
          properties={properties}
          center={bangladeshCenter}
          initialCenter={bangladeshCenter}
          hoveredId={hoveredId}
          onHover={handleHover}
          onBoundsChange={handleBoundsChange}
          interactive={false}
        />
      </div>
    </section>
  );
};
