// In markerLayers.ts

import { PropertyLike } from "../../data";

export interface MarkerLayer {
  name: string;
  zIndex: number;
  isHighlighted: boolean;
  filter: (property: PropertyLike) => boolean; // Updated from MapItem to PropertyLike
}

export const getMarkerLayers = (hoveredId: number | null): MarkerLayer[] => [
  {
    name: "unhighlighted",
    zIndex: 400,
    isHighlighted: false,
    filter: (property: PropertyLike) => property.id !== hoveredId,
  },
  {
    name: "highlighted",
    zIndex: 500,
    isHighlighted: true,
    filter: (property: PropertyLike) => property.id === hoveredId,
  },
];
