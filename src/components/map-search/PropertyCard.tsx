import React from "react";
import { Property } from "../../types/types";
import { styles } from "./styles";

interface PropertyCardProps {
  property: Property;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isMobile?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = React.memo(
  ({ property, isHovered, onMouseEnter, onMouseLeave, isMobile = false }) => {
    const combinedCardStyle: React.CSSProperties = {
      ...styles.card(isHovered),
      flexShrink: isMobile ? 0 : 1, // Locks dimensions on mobile swiper
      width: isMobile ? "290px" : "100%", // Exact specifications mapping match
      minWidth: isMobile ? "290px" : "auto",
    };

    return (
      <div
        onMouseEnter={isMobile ? undefined : onMouseEnter}
        onMouseLeave={isMobile ? undefined : onMouseLeave}
        style={combinedCardStyle}
      >
        <div style={styles.imageWrapper}>
          <img
            src={property.image}
            alt={property.title}
            style={styles.cardImage}
            loading="lazy"
          />
        </div>

        <div style={styles.cardBody}>
          <div style={styles.cardMeta}>
            <span style={{ textTransform: "capitalize" }}>{property.type}</span>
            <span style={{ fontWeight: "bold" }}>★ {property.rating}</span>
          </div>

          <h3 style={styles.cardTitle}>{property.title}</h3>

          <div style={styles.cardPrice}>From €{property.price}/month</div>
        </div>
      </div>
    );
  },
);

PropertyCard.displayName = "PropertyCard";
