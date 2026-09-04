import { MapBounds, Property } from "../../types/types";

/**
 * Limits the rate at which a function can fire.
 */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
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
