/**
 * Represents an individual statistical metric payload.
 */
export interface StatItem {
  id: string | number;
  value: string;
  label: string;
}

/**
 * Supported geometric clipping variations for the component container boundaries.
 */
export type GeometricShape = "rectangle" | "circle" | "triangle" | "hexagonal";

/**
 * Public prop definitions for the safe ingestion configuration of StatsGrid.
 */
export interface StatsGridProps {
  shape?: GeometricShape;
  metrics?: StatItem[];
}
