import React from "react";
import { PropertyLike } from "../../data";
import { styles } from "./styles";

interface PropertyCardProps {
  property: PropertyLike;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isMobile?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = React.memo(
  ({ property, isHovered, onMouseEnter, onMouseLeave, isMobile = false }) => {
    const title = property.title || property.name || "Property";
    const propertyType = property.type || property.propertyType || "Rental";
    const rating = property.rating ?? undefined;
    const currency = property.currency || "€";
    const price = property.price ?? 0;
    const image = property.image || "";

    const combinedCardStyle: React.CSSProperties = {
      ...styles.card(isHovered),
      flexShrink: isMobile ? 0 : 1,
      width: isMobile ? "290px" : "100%",
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
            src={image}
            alt={title}
            style={styles.cardImage}
            loading="lazy"
          />
        </div>

        <div style={styles.cardBody}>
          <div style={styles.cardMeta}>
            <span style={{ textTransform: "capitalize" }}>{propertyType}</span>
            {rating !== undefined && (
              <span style={{ fontWeight: "bold" }}>★ {rating}</span>
            )}
          </div>

          <h3 style={styles.cardTitle}>{title}</h3>

          <div style={styles.cardPrice}>
            From {currency}
            {price}/month
          </div>
        </div>
      </div>
    );
  },
);
