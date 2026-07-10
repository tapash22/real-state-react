import React, { useMemo } from "react";
import { StatItem, StatsGridProps } from "../types";

// Default encapsulated domain fallback dataset (immutable)
const DEFAULT_METRICS: StatItem[] = [
  { id: 1, value: "14K+", label: "Happy Client" },
  { id: 2, value: "15K+", label: "Project Done" },
  { id: 3, value: "4.7", label: "Client review" },
  { id: 4, value: "20+", label: "Years Experience" },
];

const StatsGrid: React.FC<StatsGridProps> = ({
  shape = "rectangle",
  metrics = DEFAULT_METRICS,
}) => {
  // Memoize shape utility mappings to avoid recalculation loops on external re-renders
  const shapeClasses = useMemo((): string => {
    switch (shape) {
      case "circle":
        return "rounded-full aspect-square flex flex-col justify-center items-center overflow-hidden p-6";
      case "triangle":
        return "[clip-path:polygon(50%_0%,0%_100%,100%_100%)] pt-16 pb-6 px-8 bg-white";
      case "hexagonal":
        return "[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] py-10 px-8";
      case "rectangle":
      default:
        return "rounded-sm py-8 px-6";
    }
  }, [shape]);

  return (
    <div className="relative inline-block p-4 sm:p-10 bg-white font-sans w-full max-w-4xl mx-auto">
      {/* Decorative Brand Accent Backdrop (Teal Dot Matrix Grid) */}
      <div
        aria-hidden="true"
        className="absolute left-2 bottom-2 sm:left-6 sm:bottom-6 z-0 grid grid-cols-5 gap-2 sm:gap-3 w-[80px] sm:w-[100px] pointer-events-none select-none"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={`dot-matrix-${i}`}
            className="w-1 h-1 bg-[#00a896] rounded-full opacity-60"
          />
        ))}
      </div>

      {/* Structured Content Grid System */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {metrics.map((stat) => (
          <div
            key={stat.id}
            className={`
              bg-white w-full max-w-[280px] sm:min-w-[220px] text-center 
              shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_8px_rgba(0,0,0,0.02)]
              transition-all duration-300 ease-in-out hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)]
              ${shapeClasses}
            `}
          >
            {/* Context Adjustment: Compensates vertical alignment gaps for non-rectangular clippaths */}
            <div className={shape === "triangle" ? "translate-y-2" : ""}>
              <h2 className="m-0 mb-1 text-3xl sm:text-[42px] font-bold text-[#00a896] tracking-tight leading-none">
                {stat.value}
              </h2>
              <p className="m-0 text-xs sm:text-sm font-semibold text-gray-600 break-words">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
