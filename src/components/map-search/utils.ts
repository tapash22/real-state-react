import { MapBounds, Property } from "../../types/types";

/**
 * Limits the rate at which a function can fire.
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      if (timeout) clearTimeout(timeout);
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const mockDatabaseFetch = (
  bounds: MapBounds | null,
  database: Property[],
): Property[] => {
  // If bounds don't exist or haven't fully expanded from zero, return everything
  // if (!bounds) return database;
  if (!bounds || (bounds.north === 0 && bounds.south === 0)) {
    return database;
  }
  return database.filter((prop) => {
    return (
      prop.lat >= bounds.south &&
      prop.lat <= bounds.north &&
      prop.lng >= bounds.west &&
      prop.lng <= bounds.east
    );
  });
};
