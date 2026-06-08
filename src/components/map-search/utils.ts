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
  if (!bounds) return database;
  return database.filter((prop) => {
    return (
      prop.lat >= bounds.south &&
      prop.lat <= bounds.north &&
      prop.lng >= bounds.west &&
      prop.lng <= bounds.east
    );
  });
};
