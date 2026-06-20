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

  // Local view-only filter states
  const [activeTab, setActiveTab] = useState("Anyone");
  const [localPrice, setLocalPrice] = useState("All Prices");
  const [localProperty, setLocalProperty] = useState("All Types");

  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  // ─── NEW STATE FOR MOBILE DIALOG ───
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    23.7925, 90.4078,
  ]);

  // ─── SCREEN RESPONSIVENESS LISTENER ───
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 💾 STORAGE ENGINE
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

  // Dynamic Map Positioning Matrix Adjustments
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

      // STAGE 1: Apply Global Search Values
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

      // STAGE 2: Apply Sub-Filters
      if (localProperty !== "All Types") {
        baseResults = baseResults.filter(
          (item: any) =>
            item.type?.toLowerCase() === localProperty.toLowerCase().trim(),
        );
      }

      if (localPrice !== "All Prices") {
        const digits = localPrice.match(/\d+/g);
        if (digits && digits.length >= 2) {
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

  // Shared filter bar props to avoid code duplication
  const filterBarProps = {
    activeTab,
    setActiveTab,
    localPrice,
    setLocalPrice,
    localProperty,
    setLocalProperty,
    priceList: prices || ["All Prices", "300-600", "600-900", "900+"],
    propertyList: properties || ["All Types", "Apartment", "House", "Studio"],
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white dark:bg-zinc-950 overflow-hidden relative">
      {/* Decoupled Filter Bar */}
      {/* ─── DESKTOP FILTER BAR: Only renders on md screens and up ─── */}
      <div className="hidden md:block">
        <FilterBar {...filterBarProps} />
      </div>

      {/* ─── MOBILE FILTER BUTTON: Sticky floating action button on mobile ─── */}
      {isMobile && (
        <button
          onClick={() => setIsFilterDialogOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:bg-emerald-700 active:scale-95 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Filters
        </button>
      )}

      {/* ─── MOBILE FILTER DIALOG (MODAL) ─── */}
      {isMobile && isFilterDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          {/* Backdrop click closer */}
          <div
            className="absolute inset-0"
            onClick={() => setIsFilterDialogOpen(false)}
          />

          {/* Dialog Container */}
          <div className="relative bg-white dark:bg-zinc-900 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl p-6 shadow-xl z-10 max-h-[85vh] overflow-y-auto transform transition-transform animate-slide-up">
            <div className="flex justify-between items-center mb-4 border-b pb-2 border-zinc-100 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Filter Search
              </h3>
              <button
                onClick={() => setIsFilterDialogOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Injected Filter Bar inside Mobile Container */}
            <div className="py-2">
              <FilterBar {...filterBarProps} />
            </div>

            {/* Apply Action Button */}
            <button
              onClick={() => setIsFilterDialogOpen(false)}
              className="mt-6 w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main View Area Split Matrix */}
      <div
        style={isMobile ? styles.mobileContainer : styles.desktopContainer}
        className={`flex-1 ${isMobile ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        {/* Map Section Wrapper */}
        <div
          style={isMobile ? styles.mobileMapWrapper : styles.desktopMapWrapper}
          className="border-none lg:border-4 border-(--border) rounded-lg shadow-lg relative flex-shrink-0"
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

        {/* Properties Cards List Feed Section Wrapper */}
        {(!isMobile || hasProperties) && (
          <div
            style={
              isMobile ? styles.mobileListWrapper : styles.desktopListWrapper
            }
            className={`w-full bg-white dark:bg-zinc-950 ${isMobile ? "h-auto overflow-visible" : "h-full overflow-y-scroll overflow-x-hidden scrollbar-thin  "}`}
          >
            <div className="px-2 py-4 lg:px-4 lg:py-6 ">
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <GsapLoader searchType={globalProperty || "Properties"} />
                </div>
              ) : !hasProperties ? (
                <NoProperties />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 justify-center items-stretch ">
                  {filteredProperties.map((house: House) => (
                    <Link
                      to={`/property/${house.id}`}
                      key={house.id}
                      className={`no-underline block focus:outline-none rounded-xl transition-all duration-200 ${
                        hoveredId === house.id ? " scale-[1.01] shadow-md" : ""
                      }`}
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
