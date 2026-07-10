import React, { useMemo } from "react";
import { FlexibleCardProps, ProfileData, StatData } from "../types";

// Encapsulated default fallbacks (Immutable Domain Constants)
const DEFAULT_PROFILE: ProfileData = {
  name: "MADISON BARNETT",
  bio: "I get my inspiration from the fictional world. I'm a social geek. Completely exploit 24/365 catalysts for change whereas high standards in action items. Conveniently whiteboard multifunctional benefits without enabled leadership.",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
};

const DEFAULT_STATS: StatData[] = [
  { id: 1, value: "14K+", label: "Happy Client" },
  { id: 2, value: "15K+", label: "Project Done" },
  { id: 3, value: "4.7", label: "Client review" },
  { id: 4, value: "20+", label: "Years Experience" },
];

const FlexibleCard: React.FC<FlexibleCardProps> = ({
  layout = "stats",
  shape = "rectangle",
  data = null,
}) => {
  // Memoize layout container shape utility mappings
  const containerShapeClasses = useMemo((): string => {
    switch (shape) {
      case "circle":
        return "rounded-full aspect-square flex flex-col justify-center items-center overflow-hidden";
      case "triangle":
        return "[clip-path:polygon(50%_0%,0%_100%,100%_100%)] pt-14 pb-4 px-8";
      case "hexagonal":
        return "[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] py-10 px-8";
      case "rectangle":
      default:
        return "rounded-sm py-8 px-6";
    }
  }, [shape]);

  // Memoize image clipping mask independently to map with layout contexts
  const avatarShapeClasses = useMemo((): string => {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "hexagonal":
        return "[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]";
      case "triangle":
        return "[clip-path:polygon(50%_0%,0%_100%,100%_100%)]";
      case "rectangle":
      default:
        return "rounded-sm";
    }
  }, [shape]);

  // --- RENDERING STRATEGY 1: PROFILE LAYOUT ---
  if (layout === "profile") {
    const profile = (data as ProfileData) || DEFAULT_PROFILE;
    return (
      <div className="max-w-md p-6 bg-white font-serif text-gray-700 shadow-sm border border-gray-100 rounded-lg">
        <h1 className="font-sans text-xl font-medium tracking-wider text-gray-800 mb-6 uppercase">
          {profile.name}
        </h1>
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <div className="flex-shrink-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className={`w-24 h-24 object-cover border border-gray-100 shadow-sm transition-all duration-300 ${avatarShapeClasses}`}
            />
          </div>
          <p className="text-[15px] leading-relaxed text-center sm:text-left font-serif">
            {profile.bio}
          </p>
        </div>
      </div>
    );
  }

  // --- RENDERING STRATEGY 2: STATS LAYOUT ---
  const stats = (data as StatData[]) || DEFAULT_STATS;
  return (
    <div className="relative inline-block p-6 sm:p-10 bg-white font-sans w-full max-w-4xl mx-auto">
      {/* Decorative Structural Dot Grid */}
      <div
        aria-hidden="true"
        className="absolute left-2 bottom-2 sm:left-6 sm:bottom-6 z-0 grid grid-cols-5 gap-2 sm:gap-3 w-[80px] sm:w-[100px] pointer-events-none select-none"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={`portfolio-dot-${i}`}
            className="w-1 h-1 bg-[#00a896] rounded-full opacity-60"
          />
        ))}
      </div>

      {/* Grid Alignment Wrapper */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`
              bg-white w-full max-w-[260px] sm:min-w-[220px] text-center
              shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_8px_rgba(0,0,0,0.02)]
              transition-all duration-300 ease-in-out hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]
              ${containerShapeClasses}
            `}
          >
            <div className={shape === "triangle" ? "translate-y-4" : ""}>
              <h2 className="m-0 mb-1 text-3xl sm:text-[40px] font-bold text-[#00a896] tracking-tight leading-none">
                {stat.value}
              </h2>
              <p className="m-0 text-xs sm:text-sm font-semibold text-gray-500 break-words px-2">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexibleCard;
