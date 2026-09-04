import React from "react";
import { IconType } from "react-icons";
import { Promotion } from "../../data";

interface PromoCardProps {
  /** Optional promo object */
  promo?: Promotion;
  /** Optional section title (used for Services or custom headers) */
  title?: string;
  /** Optional icon (e.g., "☀️", "☕") */
  Icon?: IconType;
  /** Optional array of bullet items / services */
  items?: string[];
}

export const PromoCard: React.FC<PromoCardProps> = ({
  promo,
  title,
  Icon,
  items,
}) => {
  // Resolve title, icon, description, and list items dynamically
  const displayTitle = title || promo?.title;
  const displayDescription = promo?.description;
  const displayList = items || promo?.bulletPoints;

  return (
    <div className="text-sm text-[var(--text)]">
      {displayTitle && (
        <div className="flex items-center gap-2 font-semibold text-[var(--text)] mb-1">
          {Icon && <Icon size={16} className="text-[var(--muted)] font-bold" />}
          {displayTitle}
        </div>
      )}

      {displayDescription && (
        <p className="text-[var(--text)] pl-6 mb-1">{displayDescription}</p>
      )}

      {displayList && displayList.length > 0 && (
        <ul className="list-disc pl-10 space-y-1 text-[var(--muted)]">
          {displayList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
