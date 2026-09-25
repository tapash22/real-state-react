interface GlowMarkerIconProps {
  isHighlighted: boolean;
  size?: number;
}

export const GlowMarkerIcon = ({
  isHighlighted,
  size = 40,
}: GlowMarkerIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`transition-all duration-300 ease-out ${
        isHighlighted ? "scale-110" : "scale-100"
      }`}
    >
      <defs>
        {/* 1. Linear Gradient: Dark Core Center -> Light Outer Edges */}
        <linearGradient id="glowPinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" /> {/* Top Light */}
          <stop offset="50%" stopColor="#3b0764" /> {/* Center Dark Core */}
          <stop offset="100%" stopColor="#a855f7" /> {/* Bottom Light */}
        </linearGradient>

        {/* 2. Glow Filter for Outer Light Halo */}
        <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2.5"
            floodColor="#a855f7"
            floodOpacity="0.9"
          />
        </filter>
      </defs>

      {/* Outer Border Ring */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        stroke="#c084fc"
        strokeWidth="1.5"
        className={`transition-all duration-300 ${
          isHighlighted ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ transformOrigin: "center" }}
      />

      {/* Main Location Pin Icon (Single Path) */}
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill={isHighlighted ? "url(#glowPinGradient)" : "#9ca3af"}
        filter={isHighlighted ? "url(#outerGlow)" : "none"}
        className="transition-all duration-200"
      />
    </svg>
  );
};
