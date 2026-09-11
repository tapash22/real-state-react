import { useCallback, useEffect, useMemo, useState } from "react";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { MapPanel } from "../components/map-search/MapPanel";
import { styles } from "../components/map-search/styles";
import { mockDatabaseFetch } from "../components/map-search/utils";
import { MapBounds, Property } from "../types/types";
// Import your shared global House Context & Cards
import { Link } from "react-router-dom";
import { NoProperties } from "../components/empty/NoProperties";
import { FilterBar } from "../components/filter/FilterBar";
import { HouseCard } from "../components/house/HouseCard";
import { GsapLoader } from "../components/loader/GsapLoader";
import { useHouseContext } from "../hooks/useHouseContext";
import {
  DEFAULT_PRICE,
  DEFAULT_PROPERTY,
  DEFAULT_TAB,
  getPriceRange,
  isDefaultPrice,
  isDefaultProperty,
  prepareMapProperty,
  TABS,
} from "../utils/propertyFilters";

export default function RealEstateSearchModule() {
  const {
    houses,
    properties,
    prices,
    isLoading: isHouseDataLoading,
  } = useHouseContext();
  // Read search parameters from current URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query parameters with fallbacks
  const appliedCountry = searchParams.get("country") || "";

  const appliedProperty = searchParams.get("property") || "";

  const appliedPrice = searchParams.get("price") || "";

  const appliedTab = searchParams.get("tab") || DEFAULT_TAB;

  const [localPrice, setLocalPrice] = useState(appliedPrice || DEFAULT_PRICE);

  const [localProperty, setLocalProperty] = useState(
    appliedProperty || DEFAULT_PROPERTY,
  );

  const [activeTab, setActiveTab] = useState(appliedTab || DEFAULT_TAB);

  // 3. Prioritize URL values over context default placeholders

  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  // const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  // ─── NEW STATE FOR MOBILE DIALOG ───
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    23.7925, 90.4078,
  ]);

  /**
   * Your new HouseContext provides:
   *
   * properties = ["property any type", "Apartment", ...]
   *
   * But the FilterDrawer UI currently uses:
   *
   * "All Types"
   *
   * So we normalize the UI list here.
   */
  const propertyList = useMemo(() => {
    const filteredProperties = properties.filter(
      (property) => !property.toLowerCase().includes("any type"),
    );

    return [DEFAULT_PROPERTY, ...filteredProperties];
  }, [properties]);

  /**
   * Normalize price options for the FilterDrawer.
   */
  const priceList = useMemo(() => {
    const filteredPrices = prices.filter((price) => !isDefaultPrice(price));

    return [DEFAULT_PRICE, ...filteredPrices];
  }, [prices]);

  /* Sync URL -> Drawer Draft State */
  useEffect(() => {
    setLocalPrice(appliedPrice || DEFAULT_PRICE);

    setLocalProperty(appliedProperty || DEFAULT_PROPERTY);

    setActiveTab(appliedTab || DEFAULT_TAB);
  }, [appliedPrice, appliedProperty, appliedTab]);

  /* Responsive Screen Listener */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Dynamic Map Center */
  useEffect(() => {
    if (!appliedCountry) {
      return;
    }

    const normalizedCountry = appliedCountry.toLowerCase().trim();

    const matchingHouse = houses.find(
      (house) => house.country?.toLowerCase().trim() === normalizedCountry,
    );

    if (matchingHouse) {
      setMapCenter([matchingHouse.lat, matchingHouse.lng]);
    }
  }, [appliedCountry, houses]);

  /* Recent Search Storage */
  useEffect(() => {
    if (!appliedCountry) {
      return;
    }

    const currentSearchPayload = {
      timestamp: new Date().toISOString(),
      searchedCountry: appliedCountry,
      searchedPropertyType: appliedProperty || DEFAULT_PROPERTY,
      searchedPriceRange: appliedPrice || "Any Budget",
      targetDemographic: appliedTab,
    };

    try {
      const existingHistory = JSON.parse(
        localStorage.getItem("recent_searches") || "[]",
      );

      const isSameSearch =
        existingHistory[0]?.searchedCountry ===
          currentSearchPayload.searchedCountry &&
        existingHistory[0]?.searchedPropertyType ===
          currentSearchPayload.searchedPropertyType &&
        existingHistory[0]?.searchedPriceRange ===
          currentSearchPayload.searchedPriceRange &&
        existingHistory[0]?.targetDemographic ===
          currentSearchPayload.targetDemographic;

      if (!isSameSearch) {
        const updatedHistory = [currentSearchPayload, ...existingHistory].slice(
          0,
          10,
        );

        localStorage.setItem("recent_searches", JSON.stringify(updatedHistory));
      }
    } catch {
      localStorage.removeItem("recent_searches");
    }
  }, [appliedCountry, appliedProperty, appliedPrice, appliedTab]);

  /* Filter Houses */
  const filteredProperties = useMemo(() => {
    let results = [...houses];

    /* 1. Country */
    if (appliedCountry) {
      const normalizedCountry = appliedCountry.toLowerCase().trim();

      results = results.filter(
        (house) => house.country?.toLowerCase().trim() === normalizedCountry,
      );
    }

    /* 2. Property Type */
    if (!isDefaultProperty(appliedProperty)) {
      const normalizedProperty = appliedProperty.toLowerCase().trim();

      results = results.filter(
        (house) => house.type?.toLowerCase().trim() === normalizedProperty,
      );
    }

    /* 3. Price */
    if (!isDefaultPrice(appliedPrice)) {
      const { min, max } = getPriceRange(appliedPrice);

      results = results.filter((house) => {
        const housePrice = Number(house.price);

        return housePrice >= min && housePrice <= max;
      });
    }

    /* 4. Demographic */
    if (appliedTab !== DEFAULT_TAB) {
      const demographicKeyword = appliedTab.toLowerCase().replace(/s$/, "");

      results = results.filter((house) => {
        const targetString = `
          ${house.type || ""}
          ${house.description || ""}
        `.toLowerCase();

        return targetString.includes(demographicKeyword);
      });
    }

    /* 5. Map Bounds */
    if (mapBounds) {
      const mapProperties = results.map(prepareMapProperty);

      const boundedResults = mockDatabaseFetch(
        mapBounds,
        mapProperties,
      ) as Property[];

      /**
       * Preserve your previous behavior:
       *
       * If the map returns properties,
       * use those properties.
       *
       * If it returns zero,
       * keep the normal filter results.
       */
      if (boundedResults.length > 0) {
        const boundedIds = new Set(
          boundedResults.map((property) => String(property.id)),
        );

        results = results.filter((house) => boundedIds.has(String(house.id)));
      }
    }

    return results;
  }, [
    houses,
    appliedCountry,
    appliedProperty,
    appliedPrice,
    appliedTab,
    mapBounds,
  ]);

  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (isHouseDataLoading) {
      setIsFiltering(false);
      return;
    }

    setIsFiltering(true);

    const timer = window.setTimeout(() => {
      setIsFiltering(false);
    }, 120);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    isHouseDataLoading,
    appliedCountry,
    appliedProperty,
    appliedPrice,
    appliedTab,
    mapBounds,
  ]);

  const isLoading = isHouseDataLoading || isFiltering;

  /* Map Bounds */
  const handleBoundsChange = useCallback((bounds: MapBounds) => {
    setMapBounds(bounds);
  }, []);

  /* Apply Filter Drawer */
  const handleApplyFilters = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);

    /* Property */
    if (!isDefaultProperty(localProperty)) {
      nextParams.set("property", localProperty);
    } else {
      nextParams.delete("property");
    }

    /* Price */
    if (!isDefaultPrice(localPrice)) {
      nextParams.set("price", localPrice);
    } else {
      nextParams.delete("price");
    }

    /* Demographic */
    if (activeTab !== DEFAULT_TAB) {
      nextParams.set("tab", activeTab);
    } else {
      nextParams.delete("tab");
    }
    setSearchParams(nextParams);
    setIsFilterDialogOpen(false);
  }, [searchParams, localProperty, localPrice, activeTab, setSearchParams]);

  /* Clear Filters */
  const handleClearFilters = useCallback(() => {
    /**
     * Clear ALL search filters.
     *
     * This removes country as well because the user selected
     * "Clear Filters".
     */
    setSearchParams({});

    setLocalPrice(DEFAULT_PRICE);

    setLocalProperty(DEFAULT_PROPERTY);

    setActiveTab(DEFAULT_TAB);

    setMapBounds(null);
  }, [setSearchParams]);

  /* Filter Count */
  const filterCount = useMemo(() => {
    return (
      (appliedProperty && !isDefaultProperty(appliedProperty) ? 1 : 0) +
      (appliedPrice && !isDefaultPrice(appliedPrice) ? 1 : 0) +
      (appliedTab !== DEFAULT_TAB ? 1 : 0)
    );
  }, [appliedProperty, appliedPrice, appliedTab]);

  const hasProperties = filteredProperties.length > 0;

  const mapProperties = useMemo(() => {
    return filteredProperties.map(prepareMapProperty);
  }, [filteredProperties]);

  return (
    <div
      className="
        relative
        flex
        h-screen
        w-full
        flex-col
        overflow-hidden
        bg-[var(--bg)]
        px-2
        py-0
        lg:px-8
      "
    >
      {/* FILTER TOOLBAR */}
      <div
        className="
          flex
          w-full
          flex-col
          items-center
          justify-between
          space-y-0
          border-b-2
          border-[var(--border)]
          bg-[var(--bg)]
          py-3
          lg:flex-row
          lg:p-3
        "
      >
        {/* DEMOGRAPHIC TABS */}
        <div
          className="
            flex
            items-center
            gap-4
            overflow-x-auto
            scrollbar-none
            bg-[var(--bg)]
            p-2
            text-sm
            font-medium
          "
        >
          {TABS.map((tab) => {
            const isActive = appliedTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams);

                  if (tab === DEFAULT_TAB) {
                    nextParams.delete("tab");
                  } else {
                    nextParams.set("tab", tab);
                  }

                  setSearchParams(nextParams);
                }}
                className={`
                  relative
                  whitespace-nowrap
                  tracking-wide
                  transition-colors
                  ${
                    isActive
                      ? `
                        rounded-lg
                        bg-[var(--card)]
                        p-3
                        text-sm
                        font-bold
                        text-[var(--text)]
                        shadow-md
                        lg:p-4
                        lg:shadow-sm
                      `
                      : `
                        text-sm
                        font-normal
                        text-[var(--muted)]
                        hover:text-[var(--text)]
                      `
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* FILTER BUTTON */}
        <div className="flex w-full items-center justify-end lg:w-auto">
          <button
            type="button"
            onClick={() => setIsFilterDialogOpen(true)}
            className="
              flex
              items-center
              space-x-3
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--card)]
              px-4
              py-2
              text-sm
              font-medium
              text-[var(--text)]
              shadow-sm
              shadow-[var(--primary)]
              transition-colors
            "
          >
            <LuSlidersHorizontal
              size={16}
              className="font-extrabold text-[var(--text)]"
            />

            <span
              className="
                text-sm
                font-semibold
                tracking-wider
                text-[var(--text)]
              "
            >
              Filters
            </span>

            <span
              className="
                flex
                h-auto
                w-auto
                items-center
                justify-center
                rounded-full
                border-2
                border-[var(--border)]
                bg-[var(--bg)]
                px-2
                py-1
                text-sm
                font-semibold
                text-[var(--text)]
              "
            >
              {filterCount}
            </span>
          </button>
        </div>
      </div>

      {/* FILTER DRAWER */}
      <FilterBar
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        isMobile={isMobile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        localPrice={localPrice}
        setLocalPrice={setLocalPrice}
        localProperty={localProperty}
        setLocalProperty={setLocalProperty}
        priceList={priceList}
        propertyList={propertyList}
      />

      {/* MAIN CONTENT */}
      <div
        style={isMobile ? styles.mobileContainer : styles.desktopContainer}
        className={`
          flex-1
          ${isMobile ? "overflow-y-auto" : "overflow-hidden"}
        `}
      >
        {/* MAP */}
        <div
          style={isMobile ? styles.mobileMapWrapper : styles.desktopMapWrapper}
          className="
            relative
            flex-shrink-0
            rounded-2xl
            border-b-2
            border-[var(--border)]
            p-3
            shadow-lg
          "
        >
          <MapPanel
            properties={mapProperties}
            center={mapCenter}
            initialCenter={mapCenter}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onBoundsChange={handleBoundsChange}
            interactive={true}
          />
        </div>

        {/* PROPERTY LIST */}
        {(!isMobile || hasProperties) && (
          <div
            style={
              isMobile ? styles.mobileListWrapper : styles.desktopListWrapper
            }
            className={`
              w-full
              bg-[var(--bg)]
              ${
                isMobile
                  ? `
                    h-auto
                    overflow-visible
                    border-b-2
                    border-[var(--border)]
                  `
                  : `
                    h-full
                    overflow-x-hidden
                    overflow-y-scroll
                    border-r-2
                    border-[var(--border)]
                    scrollbar-thin
                  `
              }
            `}
          >
            <div className="px-2 py-4 lg:px-4 lg:py-6">
              {/* LOADING */}
              {isLoading ? (
                <div className="flex h-48 items-center justify-center">
                  <GsapLoader searchType={appliedProperty || "Properties"} />
                </div>
              ) : !hasProperties ? (
                /* EMPTY STATE */
                <NoProperties />
              ) : (
                /* PROPERTY CARDS */
                <div
                  className="
                    grid
                    grid-cols-1
                    items-stretch
                    justify-center
                    gap-5
                    lg:grid-cols-2
                    lg:gap-6
                  "
                >
                  {filteredProperties.map((house) => (
                    <Link
                      to={`/property/${house.id}`}
                      key={house.id}
                      className={`
                          block
                          rounded-xl
                          no-underline
                          transition-all
                          duration-200
                          focus:outline-none
                          ${
                            hoveredId === house.id
                              ? `
                                scale-[1.01]
                                shadow-md
                              `
                              : ""
                          }
                        `}
                      onMouseEnter={() => setHoveredId(Number(house.id))}
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
