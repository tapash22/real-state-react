import React from "react";
import { MapItem } from "../../types/types";
import { PropertyCard } from "./PropertyCard";
import { styles } from "./styles";

interface ListPanelProps {
  properties: MapItem[];
  isLoading: boolean;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  isMobile?: boolean;
}

export const ListPanel: React.FC<ListPanelProps> = ({
  properties,
  isLoading,
  hoveredId,
  setHoveredId,
  isMobile = false,
}) => {
  const hasProperties = properties.length > 0;

  return (
    <div style={isMobile ? undefined : styles.leftPanel}>
      {/* Only display header on Desktop Layouts */}
      {!isMobile && (
        <div style={styles.header}>
          <h2 style={styles.title}>
            {isLoading
              ? "Updating viewport..."
              : `${properties.length} spaces found`}
          </h2>
          <p style={styles.subtitle}>Prices include utility parameters.</p>
        </div>
      )}

      {/* Layout mapping track rendering block */}
      {hasProperties && (
        <div style={styles.grid(isLoading, isMobile)}>
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isHovered={hoveredId === prop.id}
              onMouseEnter={() => setHoveredId(prop.id)}
              onMouseLeave={() => setHoveredId(null)}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}

      {/* Desktop Native Empty State representation element */}
      {!isLoading && !hasProperties && !isMobile && (
        <div style={styles.emptyState}>
          <span style={{ fontSize: "24px" }}>📍</span>
          <div style={{ fontWeight: 600 }}>
            No rentals found in this map view.
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-secondary, #6b7280)",
              fontWeight: 400,
            }}
          >
            Pan or zoom out to find active listings!
          </div>
        </div>
      )}
    </div>
  );
};
