import React from "react";
import { Highlight } from "../../data";

interface HighlightCardProps {
  highlight: Highlight;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ highlight }) => {
  return (
    <div className="flex flex-col border-2 border-[var(--border)] rounded-lg overflow-hidden space-y-2">
      <img
        src={highlight.image}
        alt={highlight.title}
        className="w-full h-28 object-cover rounded-tl-xl rounded-tr-xl"
      />
      <div className="p-3 space-y-1">
        <h3 className="font-bold text-[var(--text)] text-sm tracking-wider">
          {highlight.title}
        </h3>
        <p className="text-xs text-[var(--text)] leading-relaxed tracking-wider">
          {highlight.description}
        </p>
      </div>
    </div>
  );
};
