import type { House } from "../data";
import type { Property } from "../types/types";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const DEFAULT_TAB = "Anyone";
export const DEFAULT_PROPERTY = "All Types";
export const DEFAULT_PRICE = "All Prices";

export const TABS = [
  "Anyone",
  "Students",
  "Professionals",
  "Families",
] as const;

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type PropertyFilterTab = (typeof TABS)[number];

export type PriceRange = {
  min: number;
  max: number;
};

/* -------------------------------------------------------------------------- */
/* Property Helpers                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a property filter means "no property filter".
 */
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

/**
 * Check whether a price filter means "no price filter".
 */
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

/* -------------------------------------------------------------------------- */
/* Price Helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Convert price range text into min/max values.
 *
 * Supported examples:
 *
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

/* -------------------------------------------------------------------------- */
/* Map Transformation                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Convert a House into the shape expected by the map.
 *
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
