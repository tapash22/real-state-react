import { mockDatabaseFetch } from "../components/map-search/utils";
import type { House, MapBounds } from "../data";
import type { Property } from "../types/types";

/* Constants */
export const DEFAULT_TAB = "Anyone";
export const DEFAULT_PROPERTY = "All Types";
export const DEFAULT_PRICE = "All Prices";

export const TABS = [
  "Anyone",
  "Students",
  "Professionals",
  "Families",
] as const;

/* Types */
export type PropertyFilterTab = (typeof TABS)[number];

export type PriceRange = {
  min: number;
  max: number;
};

export type HouseFilterOptions = {
  country?: string;
  property?: string;
  price?: string;
  tab?: PropertyFilterTab | string;
  mapBounds?: MapBounds | null;
};

export type ApplyFilterParamsOptions = {
  property: string;
  price: string;
  tab: PropertyFilterTab | string;
};

/* Property Helpers */
/** Check whether a property filter means "no property filter".*/
export function isDefaultProperty(value: string): boolean {
  const normalized = value.toLowerCase().trim();
  return (
    normalized === "" ||
    normalized === "all" ||
    normalized === "all types" ||
    normalized.includes("any type") ||
    normalized.includes("select type")
  );
}

/** Check whether a price filter means "no price filter". */
export function isDefaultPrice(value: string): boolean {
  const normalized = value.toLowerCase().trim();
  return (
    normalized === "" ||
    normalized === "all" ||
    normalized === "all prices" ||
    normalized.includes("any budget") ||
    normalized.includes("choose your price")
  );
}
/** Builds the processed property list with DEFAULT_PROPERTY prepended */
export function buildPropertyList(properties: string[] = []): string[] {
  const filteredProperties = properties.filter(
    (property) => !property.toLowerCase().includes("any type"),
  );
  return [DEFAULT_PROPERTY, ...filteredProperties];
}

/** Builds the processed price list with DEFAULT_PRICE prepended */
export function buildPriceList(prices: string[] = []): string[] {
  const filteredPrices = prices.filter((price) => !isDefaultPrice(price));
  return [DEFAULT_PRICE, ...filteredPrices];
}

export function applyFilterParams(
  searchParams: URLSearchParams,
  { property, price, tab }: ApplyFilterParamsOptions,
): URLSearchParams {
  const nextParams = new URLSearchParams(searchParams);

  /* Property */
  if (!isDefaultProperty(property)) {
    nextParams.set("property", property);
  } else {
    nextParams.delete("property");
  }

  /* Price */
  if (!isDefaultPrice(price)) {
    nextParams.set("price", price);
  } else {
    nextParams.delete("price");
  }

  /* Demographic */
  if (tab !== DEFAULT_TAB) {
    nextParams.set("tab", tab);
  } else {
    nextParams.delete("tab");
  }

  return nextParams;
}

/* Price Helpers */
/**
 * Convert price range text into min/max values.
 * Supported examples:
 * "300-600"   -> 300 to 600
 * "600-900"   -> 600 to 900
 * "3000+"     -> 3000 to Infinity
 * "All Prices" -> no restriction
 */
export function getPriceRange(value: string): PriceRange {
  if (isDefaultPrice(value)) {
    return {
      min: 0,
      max: Infinity,
    };
  }
  const normalized = value.replace(/,/g, "").trim();
  /* 3000+ */
  if (normalized.endsWith("+")) {
    const min = Number(normalized.replace("+", "").match(/\d+/)?.[0] ?? 0);

    return {
      min,
      max: Infinity,
    };
  }
  /* 300-600 */
  const digits = normalized.match(/\d+/g);
  if (!digits || digits.length === 0) {
    return {
      min: 0,
      max: Infinity,
    };
  }
  const min = Number(digits[0] ?? 0);
  const max = Number(digits[1] ?? Infinity);
  return {
    min,
    max,
  };
}
/* House Filtering */
export function filterHouses(
  houses: House[],
  {
    country = "",
    property = DEFAULT_PROPERTY,
    price = DEFAULT_PRICE,
    tab = DEFAULT_TAB,
    mapBounds = null,
  }: HouseFilterOptions,
): House[] {
  let results = [...houses];

  /* 1. Country */
  if (country) {
    const normalizedCountry = country.toLowerCase().trim();

    results = results.filter(
      (house) => house.country?.toLowerCase().trim() === normalizedCountry,
    );
  }
  /* 2. Property Type */
  if (!isDefaultProperty(property)) {
    const normalizedProperty = property.toLowerCase().trim();

    results = results.filter(
      (house) => house.type?.toLowerCase().trim() === normalizedProperty,
    );
  }
  /* 3. Price */
  if (!isDefaultPrice(price)) {
    const { min, max } = getPriceRange(price);

    results = results.filter((house) => {
      const housePrice = Number(house.price);

      return housePrice >= min && housePrice <= max;
    });
  }
  /* 4. Demographic */
  if (tab !== DEFAULT_TAB) {
    const demographicKeyword = tab.toLowerCase().replace(/s$/, "");
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

    /*
     * Preserve existing behavior:
     * - If map returns properties → use bounded properties
     * - If map returns zero → keep normal filter results
     */
    if (boundedResults.length > 0) {
      const boundedIds = new Set(
        boundedResults.map((property) => String(property.id)),
      );
      results = results.filter((house) => boundedIds.has(String(house.id)));
    }
  }
  return results;
}
/* Map Transformation */
/**
 * Convert a House into the shape expected by the map.
 * House.price is kept untouched for HouseCard.
 * Map data gets a numeric price.
 */
export function prepareMapProperty(house: House): Property {
  return {
    ...house,
    lat: house.lat,
    lng: house.lng,
    title: house.name,
    price: Number(house.price),
  } as unknown as Property;
}
