import { useCallback, useContext, useEffect, useState } from "react";
import { ListPanel } from "../components/map-search/ListPanel";
import { MapPanel } from "../components/map-search/MapPanel";
import { styles } from "../components/map-search/styles";
import { mockDatabaseFetch } from "../components/map-search/utils";
import { MapBounds, Property } from "../types/types";
// 1. Import your shared global House Context
import { HouseContext } from "../components/HouseContext";
import { houseData } from "../data";

type HouseContextType = {
  country: string;
  property: string;
  price: string;
};

// this is old data list which are implement
// const CENTRAL_DATABASE: Property[] = [
//   {
//     id: 1,
//     title: "Student residence in Calle de San Bernardo",
//     price: 786,
//     lat: 40.4255,
//     lng: -3.7075,
//     rating: 4.8,
//     type: "Social hub",
//     image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
//     country: "India",
//   },
//   {
//     id: 2,
//     title: "Private room in Calle de Batalla de Brunete",
//     price: 420,
//     lat: 40.4012,
//     lng: -3.6985,
//     rating: 3.4,
//     type: "3 housemates",
//     image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400",
//     country: "India",
//   },
//   {
//     id: 3,
//     title: "Private room in Calle del Aliso, Getafe",
//     price: 390,
//     lat: 40.305,
//     lng: -3.731,
//     rating: 4.7,
//     type: "3 housemates",
//     image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
//     country: "India",
//   },
//   {
//     id: 4,
//     title: "Luxury Apartment near Retiro Park",
//     price: 1066,
//     lat: 40.4153,
//     lng: -3.6749,
//     rating: 4.9,
//     type: "Entire apartment",
//     image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
//     country: "India",
//   },
// ];

export default function RealEstateSearchModule() {
  const context = useContext(HouseContext);

  const { country, property, price } = (context || {
    country: "Select your place",
    property: "Select type",
    price: "Choose your price",
  }) as HouseContextType;

  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  // Set the initial focal point strictly to Dhaka Center where your properties are located
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    23.7925,
    90.4078, // Center near Gulshan/Dhanmondi data cluster
  ]);

  // Handle screen resize for responsive layouts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBoundsChange = useCallback((bounds: MapBounds) => {
    setMapBounds(bounds);
  }, []);

  // 💾 FUTURE-PROOFING STORAGE ENGINE
  useEffect(() => {
    if (!country || country === "Select your place") return;

    const currentSearchPayload = {
      timestamp: new Date().toISOString(),
      searchedCountry: country,
      searchedPropertyType: property !== "Select type" ? property : "All Types",
      searchedPriceRange: price !== "Choose your price" ? price : "Any Budget",
    };

    const existingHistory = JSON.parse(
      localStorage.getItem("recent_searches") || "[]",
    );

    if (
      existingHistory[0]?.searchedCountry !== country ||
      existingHistory[0]?.searchedPropertyType !== property
    ) {
      const updatedHistory = [currentSearchPayload, ...existingHistory].slice(
        0,
        10,
      );
      localStorage.setItem("recent_searches", JSON.stringify(updatedHistory));
    }
  }, [country, property, price]);

  // 🔄 Dynamic Map Positioning Matrix Adjustments based on chosen country selection
  useEffect(() => {
    if (!country || country === "Select your place" || country === "All")
      return;

    const matchingProperty = houseData.find(
      (house) =>
        house.country.toLowerCase().trim() === country.toLowerCase().trim(),
    );

    if (matchingProperty) {
      setMapCenter([matchingProperty.lat, matchingProperty.lng]);
    }
  }, [country]);

  // 🔍 Central Query Filter Handler Engine
  useEffect(() => {
    setIsLoading(true);
    const networkLatency = setTimeout(() => {
      // Clean and map properties strictly utilizing built-in houseData coordinates
      const preparedData = houseData.map((house) => {
        return {
          ...house,
          lat: house.lat,
          lng: house.lng,
          title: house.name,
          price: parseInt(house.price, 10),
        };
      });

      // Apply global dropdown parameter criteria filters first
      let baseResults = preparedData;

      // 1. Evaluate Country Filters
      if (country && country !== "Select your place" && country !== "All") {
        baseResults = baseResults.filter(
          (item: any) =>
            item.country?.toLowerCase() === country.toLowerCase().trim(),
        );
      }

      // 2. Evaluate Property Structure Layout Types
      if (
        property &&
        property !== "Select type" &&
        property !== "All" &&
        property !== "property any type"
      ) {
        baseResults = baseResults.filter(
          (item: any) =>
            item.type?.toLowerCase() === property.toLowerCase().trim(),
        );
      }

      // 3. Evaluate Price Range Bounds
      if (price && price !== "Choose your price" && price !== "All") {
        const digits = price.match(/\d+/g);
        if (digits && digits.length >= 2) {
          const minBudget = parseInt(digits[0] || "0", 10);
          const maxBudget = parseInt(digits[1] || "99999999", 10);

          baseResults = baseResults.filter((item: any) => {
            return item.price >= minBudget && item.price <= maxBudget;
          });
        }
      }

      // Secondary boundary checks against map position
      if (mapBounds) {
        // We explicitly cast the return array BACK to our original rich shape type
        // to prevent TypeScript from complaining about missing fields from Property[]
        const boundedResults = mockDatabaseFetch(
          mapBounds,
          baseResults as unknown as Property[],
        ) as typeof preparedData;

        // Safety Fallback: If map viewport parameters strip away items,
        // maintain the global filtered dropdown choices on-screen
        if (boundedResults.length > 0) {
          baseResults = boundedResults;
        }
      }

      setFilteredProperties(baseResults);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(networkLatency);
  }, [mapBounds, country, property, price]);

  const hasProperties = filteredProperties.length > 0;

  return (
    <div style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {/* MAP DASHBOARD CONTAINER PLATFORM */}
      <div
        style={isMobile ? styles.mobileMapWrapper : styles.desktopMapWrapper}
        className="border-8 border-(--border) rounded-lg shadow-lg relative"
      >
        {/* Dynamic Context Scope Tag Indicator printing data on the screen */}
        <div className="absolute top-4 left-4 z-[400] bg-white/95 dark:bg-zinc-900/95 px-4 py-2 rounded-xl border border-(--border) text-xs font-bold shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active View: </span>
          <span
            style={{ color: "var(--button-bg)" }}
            className="capitalize font-extrabold"
          >
            {country !== "Select your place" ? country : "Global Explorer"}
          </span>
        </div>

        <MapPanel
          properties={filteredProperties as unknown as Property[]}
          center={mapCenter}
          initialCenter={mapCenter}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          onBoundsChange={handleBoundsChange}
        />

        {!isLoading && !hasProperties && (
          <div
            style={styles.mobileEmptyState}
            className="z-50 bg-white/95 dark:bg-zinc-900/95 p-3 rounded-lg text-sm font-semibold shadow-md border border-red-200"
          >
            📍 No rentals match your criteria in {country}. Try expanding
            filters!
          </div>
        )}
      </div>

      {/* RENDER LIST FEED AND META SUMMARY DATA */}
      {(!isMobile || hasProperties) && (
        <div
          style={
            isMobile ? styles.mobileListWrapper : styles.desktopListWrapper
          }
          className="flex flex-col h-full"
        >
          {/* Data Print Block: Clear readout panel highlighting active pipeline values */}
          <div className="px-6 py-4 border-b border-(--border) bg-gray-50/70 dark:bg-zinc-900/70 shadow-sm z-10">
            <div className="text-[10px] tracking-wider uppercase text-zinc-400 font-extrabold mb-1">
              Active Context Parameters Printout
            </div>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white capitalize tracking-tight">
              {property !== "Select type" ? property : "All Accommodations"} in{" "}
              {country !== "Select your place" ? country : "Any Region"}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[11px] bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md font-medium">
                🎯 Target: {country}
              </span>
              <span className="text-[11px] bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md font-medium">
                🏠 Type: {property}
              </span>
              <span className="text-[11px] bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md font-medium">
                💰 Budget Range: {price}
              </span>
            </div>
          </div>

          {/* Interactive Property Cards Stream */}
          <div className="flex-1 overflow-y-auto">
            <ListPanel
              properties={filteredProperties as unknown as Property[]}
              isLoading={isLoading}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}
    </div>
  );
}
