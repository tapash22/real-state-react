import { useCallback, useEffect, useRef, useState } from "react";
import { MapBounds, MapItem, cityExploreProperties } from "../../data";
import { SectionHeader } from "../header-section/SectionHeader";
// into this reusable component handle Generic type
import { useAppData } from "../../hooks/useAppData";
import { Tabs } from "../property-tabs/Tabs";
import { MapPanel } from "./MapPanel";

export const MapPage = () => {
  /*  State  */
  const [, setBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // react query use for local data
  const { data, isLoading } = useAppData();

  /**
   * Keeps the hover-clear timeout in the parent.
   * Marker A → null → Marker B
   * when moving quickly between markers.
   */
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bangladeshCenter: [number, number] = data?.bangladeshCenter ?? [
    23.685, 90.3563,
  ];

  /*  Properties  */
  const properties: MapItem[] = cityExploreProperties.slice(0, 7);

  /*  tabs  */
  const tabs = properties.map((property) => ({
    id: property.id,
    label: property.name,
  }));

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
      <div className="w-full bg-white flex justify-center items-center p-5">
        <div
          className="card"
          style={{ boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)" }}
        >
          this is
        </div>
      </div>

      <SectionHeader
        tagTitle="Explore cities"
        headerTitle="Your next base could be here"
      />

      {/*  CITY NAVIGATION  */}
      <Tabs items={tabs} activeId={hoveredId} onChange={handleHover} />

      {/*  MAP  */}
      <div
        className="
            relative
            h-[80vh]
            w-full
            overflow-hidden
            rounded-2xl
            shadow-lg shadow-[var(--shadow)]
          "
      >
        {!isLoading && data && (
          <MapPanel
            properties={properties}
            center={bangladeshCenter}
            initialCenter={bangladeshCenter}
            hoveredId={hoveredId}
            onHover={handleHover}
            onBoundsChange={handleBoundsChange}
            interactive={false}
          />
        )}
      </div>
    </section>
  );
};
