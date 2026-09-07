import type { MapItem } from "../../data";

export const getMarkerLayers = (hoveredId: number | null) => [
  {
    name: "normalMarkers",
    zIndex: 400,
    isHighlighted: false,
    filter: (property: MapItem) => property.id !== hoveredId,
  },
  {
    name: "activeMarker",
    zIndex: 700,
    isHighlighted: true,
    filter: (property: MapItem) => property.id === hoveredId,
  },
];
