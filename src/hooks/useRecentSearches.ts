import { useEffect, useState } from "react";
import { DEFAULT_PROPERTY } from "../utils/propertyFilters";

export type SearchPayload = {
  timestamp: string;
  searchedCountry: string;
  searchedPropertyType: string;
  searchedPriceRange: string;
  targetDemographic: string;
};

type UseRecentSearchesOptions = {
  appliedCountry: string;
  appliedProperty: string;
  appliedPrice: string;
  appliedTab: string;
};

const STORAGE_KEY = "recent_searches";
const MAX_HISTORY = 10;

export function useRecentSearches({
  appliedCountry,
  appliedProperty,
  appliedPrice,
  appliedTab,
}: UseRecentSearchesOptions) {
  const [recentSearches, setRecentSearches] = useState<SearchPayload[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!appliedCountry) {
      return;
    }

    const currentSearchPayload: SearchPayload = {
      timestamp: new Date().toISOString(),
      searchedCountry: appliedCountry,
      searchedPropertyType: appliedProperty || DEFAULT_PROPERTY,
      searchedPriceRange: appliedPrice || "Any Budget",
      targetDemographic: appliedTab,
    };

    try {
      const existingHistory: SearchPayload[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]",
      );

      const latestSearch = existingHistory[0];
      const isSameSearch =
        latestSearch?.searchedCountry ===
          currentSearchPayload.searchedCountry &&
        latestSearch?.searchedPropertyType ===
          currentSearchPayload.searchedPropertyType &&
        latestSearch?.searchedPriceRange ===
          currentSearchPayload.searchedPriceRange &&
        latestSearch?.targetDemographic ===
          currentSearchPayload.targetDemographic;

      if (!isSameSearch) {
        const updatedHistory = [currentSearchPayload, ...existingHistory].slice(
          0,
          MAX_HISTORY,
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
        setRecentSearches(updatedHistory);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setRecentSearches([]);
    }
  }, [appliedCountry, appliedProperty, appliedPrice, appliedTab]);

  return { recentSearches };
}
