import { useCallback, useContext, useEffect, useState } from "react";
import { MapPanel } from "../components/map-search/MapPanel";
import { styles } from "../components/map-search/styles";
import { mockDatabaseFetch } from "../components/map-search/utils";
import { MapBounds, Property } from "../types/types";

// Import your shared global House Context & Cards
import { Link } from "react-router-dom";
import {
  HouseContext,
  type HouseContextType,
} from "../components/HouseContext";
import { NoProperties } from "../components/empty/NoProperties";
import { FilterBar } from "../components/filter/FilterBar";
import { HouseCard } from "../components/house/HouseCard";
import { GsapLoader } from "../components/loader/GsapLoader";
import { House, houseData } from "../data";

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

// this use for using search type to show UI
//   globalProperty

export default function RealEstateSearchModule() {
  const context = useContext(HouseContext);

  const {
    country,
    property: globalProperty,
    price: globalPrice,
    properties,
    prices,
  } = (context || {
    country: "Select your place",
    property: "Select type",
    price: "Choose your price",
    properties: ["All Types", "Apartment", "House", "Studio"],
    prices: ["All Prices", "300-600", "600-900", "900+"],
    setProperty: () => {},
    setPrice: () => {},
  }) as HouseContextType;

  // 2. Local view-only filter states (Does not bleed back into global context)
  const [activeTab, setActiveTab] = useState("Anyone");
  const [localPrice, setLocalPrice] = useState("All Prices");
  const [localProperty, setLocalProperty] = useState("All Types");

  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  // Set initial focal point to Dhaka Center (near Gulshan/Dhanmondi data cluster)
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    23.7925, 90.4078,
  ]);

  // ─── 3. SCREEN RESPONSIVENESS LISTENER ───
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 💾 STORAGE ENGINE (Fixed variable references here)
  useEffect(() => {
    if (!country || country === "Select your place") return;

    const currentSearchPayload = {
      timestamp: new Date().toISOString(),
      searchedCountry: country,
      searchedPropertyType:
        globalProperty !== "Select type" ? globalProperty : "All Types",
      searchedPriceRange:
        globalPrice !== "Choose your price" ? globalPrice : "Any Budget",
      targetDemographic: activeTab,
    };

    const existingHistory = JSON.parse(
      localStorage.getItem("recent_searches") || "[]",
    );

    if (
      existingHistory[0]?.searchedCountry !== country ||
      existingHistory[0]?.searchedPropertyType !== globalProperty
    ) {
      const updatedHistory = [currentSearchPayload, ...existingHistory].slice(
        0,
        10,
      );
      localStorage.setItem("recent_searches", JSON.stringify(updatedHistory));
    }
  }, [country, globalProperty, globalPrice, activeTab]);

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

  // Filter Engine Combining Global Context + Local Sub-Filters
  useEffect(() => {
    setIsLoading(true);
    const networkLatency = setTimeout(() => {
      const preparedData = houseData.map((house) => ({
        ...house,
        lat: house.lat,
        lng: house.lng,
        title: house.name,
        price: parseInt(house.price, 10),
      }));

      let baseResults = preparedData;

      // ─── STAGE 1: Apply Global Search Values ───
      if (country && country !== "Select your place" && country !== "All") {
        baseResults = baseResults.filter(
          (item: any) =>
            item.country?.toLowerCase() === country.toLowerCase().trim(),
        );
      }

      if (
        globalProperty &&
        globalProperty !== "Select type" &&
        globalProperty !== "All" &&
        globalProperty !== "property any type"
      ) {
        baseResults = baseResults.filter(
          (item: any) =>
            item.type?.toLowerCase() === globalProperty.toLowerCase().trim(),
        );
      }

      if (
        globalPrice &&
        globalPrice !== "Choose your price" &&
        globalPrice !== "All"
      ) {
        const digits = globalPrice.match(/\d+/g);
        if (digits && digits.length >= 2) {
          const minBudget = parseInt(digits[0] || "0", 10);
          const maxBudget = parseInt(digits[1] || "99999999", 10);
          baseResults = baseResults.filter(
            (item: any) => item.price >= minBudget && item.price <= maxBudget,
          );
        }
      }

      // ─── STAGE 2: Apply Sub-Filters (From page's FilterBar) ───
      if (localProperty !== "All Types") {
        baseResults = baseResults.filter(
          (item: any) =>
            item.type?.toLowerCase() === localProperty.toLowerCase().trim(),
        );
      }

      if (localPrice !== "All Prices") {
        const digits = localPrice.match(/\d+/g);
        if (digits && digits.length >= 2) {
          const minBudget = parseInt(digits[0], 10);
          const maxBudget = parseInt(digits[1], 10);
          baseResults = baseResults.filter(
            (item: any) => item.price >= minBudget && item.price <= maxBudget,
          );
        }
      }

      if (activeTab !== "Anyone") {
        baseResults = baseResults.filter((item: any) => {
          const targetString =
            `${item.type} ${item.description || ""}`.toLowerCase();
          return targetString.includes(activeTab.toLowerCase().slice(0, -1));
        });
      }

      // Map boundary tracking adjustments
      if (mapBounds) {
        const boundedResults = mockDatabaseFetch(
          mapBounds,
          baseResults as unknown as Property[],
        ) as typeof preparedData;
        if (boundedResults.length > 0) baseResults = boundedResults;
      }

      setFilteredProperties(baseResults);
      setIsLoading(false);
    }, 120);

    return () => clearTimeout(networkLatency);
  }, [
    mapBounds,
    country,
    globalProperty,
    globalPrice,
    activeTab,
    localPrice,
    localProperty,
  ]);

  // Filter Engine Combining Global Context + Local Sub-Filters
  useEffect(() => {
    setIsLoading(true);
    const networkLatency = setTimeout(() => {
      const preparedData = houseData.map((house) => ({
        ...house,
        lat: house.lat,
        lng: house.lng,
        title: house.name,
        price: parseInt(house.price, 10),
      }));

      let baseResults = preparedData;

      // ─── STAGE 1: Apply Global Search Values ───
      if (country && country !== "Select your place" && country !== "All") {
        baseResults = baseResults.filter(
          (item: any) =>
            item.country?.toLowerCase() === country.toLowerCase().trim(),
        );
      }

      if (
        globalProperty &&
        globalProperty !== "Select type" &&
        globalProperty !== "All" &&
        globalProperty !== "property any type"
      ) {
        baseResults = baseResults.filter(
          (item: any) =>
            item.type?.toLowerCase() === globalProperty.toLowerCase().trim(),
        );
      }

      if (
        globalPrice &&
        globalPrice !== "Choose your price" &&
        globalPrice !== "All"
      ) {
        const digits = globalPrice.match(/\d+/g);
        if (digits && digits.length >= 2) {
          const minBudget = parseInt(digits[0] || "0", 10);
          const maxBudget = parseInt(digits[1] || "99999999", 10);
          baseResults = baseResults.filter(
            (item: any) => item.price >= minBudget && item.price <= maxBudget,
          );
        }
      }

      // ─── STAGE 2: Apply Sub-Filters (From page's FilterBar) ───
      if (localProperty !== "All Types") {
        baseResults = baseResults.filter(
          (item: any) =>
            item.type?.toLowerCase() === localProperty.toLowerCase().trim(),
        );
      }

      if (localPrice !== "All Prices") {
        const digits = localPrice.match(/\d+/g);
        if (digits && digits.length >= 2) {
          // Adding || "" ensures a string is always passed to parseInt, fixing the error
          const minBudget = parseInt(digits[0] || "0", 10);
          const maxBudget = parseInt(digits[1] || "99999999", 10);

          baseResults = baseResults.filter(
            (item: any) => item.price >= minBudget && item.price <= maxBudget,
          );
        }
      }

      if (activeTab !== "Anyone") {
        baseResults = baseResults.filter((item: any) => {
          const targetString =
            `${item.type} ${item.description || ""}`.toLowerCase();
          return targetString.includes(activeTab.toLowerCase().slice(0, -1));
        });
      }

      // Map boundary tracking adjustments
      if (mapBounds) {
        const boundedResults = mockDatabaseFetch(
          mapBounds,
          baseResults as unknown as Property[],
        ) as typeof preparedData;
        if (boundedResults.length > 0) baseResults = boundedResults;
      }

      setFilteredProperties(baseResults);
      setIsLoading(false);
    }, 120);

    return () => clearTimeout(networkLatency);
  }, [
    mapBounds,
    country,
    globalProperty,
    globalPrice,
    activeTab,
    localPrice,
    localProperty,
  ]);

  const handleBoundsChange = useCallback((bounds: MapBounds) => {
    setMapBounds(bounds);
  }, []);

  const hasProperties = filteredProperties.length > 0;

  if (!context) return null;

  return (
    <div className="flex flex-col w-full h-screen bg-white dark:bg-zinc-950">
      {/* FilterBar acting completely decoupled from landing search context variables */}

      <FilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        localPrice={localPrice}
        setLocalPrice={setLocalPrice}
        localProperty={localProperty}
        setLocalProperty={setLocalProperty}
        priceList={prices || ["All Prices", "300-600", "600-900", "900+"]}
        propertyList={
          properties || ["All Types", "Apartment", "House", "Studio"]
        }
      />

      {/* Main Panel View Area */}
      <div
        style={isMobile ? styles.mobileContainer : styles.desktopContainer}
        className="flex-1 overflow-hidden"
      >
        <div
          style={isMobile ? styles.mobileMapWrapper : styles.desktopMapWrapper}
          className="border-8 border-(--border) rounded-lg shadow-lg relative"
        >
          <MapPanel
            properties={filteredProperties as unknown as Property[]}
            center={mapCenter}
            initialCenter={mapCenter}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onBoundsChange={handleBoundsChange}
          />
        </div>

        {/* List Grid view feed context display */}
        {(!isMobile || hasProperties) && (
          <div
            style={
              isMobile ? styles.mobileListWrapper : styles.desktopListWrapper
            }
            className="flex flex-col h-full bg-white dark:bg-zinc-950"
          >
            <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <GsapLoader searchType={globalProperty || "Properties"} />
                </div>
              ) : !hasProperties ? (
                <NoProperties />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 justify-center items-stretch">
                  {filteredProperties.map((house: House) => (
                    <Link
                      to={`/property/${house.id}`}
                      key={house.id}
                      className={`no-underline block focus:outline-none rounded-xl transition-all duration-200 ${hoveredId === house.id ? "ring-2 ring-emerald-500 scale-[1.01] shadow-md" : ""}`}
                      onMouseEnter={() => setHoveredId(house.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <HouseCard house={house} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
