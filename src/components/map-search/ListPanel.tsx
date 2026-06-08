import React from "react";
import { Property } from "../../types/types";
import { PropertyCard } from "./PropertyCard";
import { styles } from "./styles";

interface ListPanelProps {
  properties: Property[];
  isLoading: boolean;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}

export const ListPanel: React.FC<ListPanelProps> = ({
  properties,
  isLoading,
  hoveredId,
  setHoveredId,
}) => {
  return (
    <div style={styles.leftPanel}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {isLoading
            ? "Updating viewport..."
            : `${properties.length} spaces found`}
        </h2>
        <p style={styles.subtitle}>Prices include utility parameters.</p>
      </div>

      <div style={styles.grid(isLoading)}>
        {properties.map((prop) => (
          <PropertyCard
            key={prop.id}
            property={prop}
            isHovered={hoveredId === prop.id}
            onMouseEnter={() => setHoveredId(prop.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      {!isLoading && properties.length === 0 && (
        <div style={styles.emptyState}>
          No rentals found in this map view. Pan or zoom out to find listings!
        </div>
      )}
    </div>
  );
};
