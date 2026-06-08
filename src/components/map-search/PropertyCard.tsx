import React from "react";
import { Property } from "../../types/types";
import { styles } from "./styles";

interface PropertyCardProps {
  property: Property;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = React.memo(
  ({ property, isHovered, onMouseEnter, onMouseLeave }) => {
    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styles.card(isHovered)}
      >
        <div style={styles.imageWrapper}>
          <img
            src={property.image}
            alt={property.title}
            style={styles.cardImage}
          />
        </div>
        <div style={styles.cardBody}>
          <div style={styles.cardMeta}>
            <span>{property.type}</span>
            <span>★ {property.rating}</span>
          </div>
          <h3 style={styles.cardTitle}>{property.title}</h3>
          <div style={styles.cardPrice}>From €{property.price}/month</div>
        </div>
      </div>
    );
  },
);

PropertyCard.displayName = "PropertyCard";
