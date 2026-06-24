import React from "react";

type CurveSectionProps = {
  backgroundColor?: string;
  showTopCurve?: boolean;
  showBottomCurve?: boolean;
  curveHeight?: number;
  imageUrl?: string; // Target background image asset pass-through
  imageAlt?: string;
  children?: React.ReactNode;
};

export function CurveSection({
  backgroundColor = "var(--bg)",
  showTopCurve = false,
  showBottomCurve = true,
  curveHeight = 100,
  imageUrl,
  imageAlt = "Section background layout",
  children,
}: CurveSectionProps) {
  // Determine which clip path path data to apply based on active curves
  const getClipPathData = () => {
    if (showTopCurve && showBottomCurve) {
      // Both curves active: Clips dynamic curves out of both top and bottom edges
      return "M0,0.22 C0.25,0 0.75,0 1,0.22 L1,0.78 C0.75,1 0.25,1 0,0.78 Z";
    }
    if (showTopCurve) {
      // Only Top Curve active: Flat bottom, clipped curve top
      return "M0,0.22 C0.25,0 0.75,0 1,0.22 L1,1 L0,1 Z";
    }
    // Only Bottom Curve active (Default fallback): Flat top, clipped curve bottom
    return "M0,0 L1,0 L1,0.78 C0.75,1 0.25,1 0,0.78 Z";
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* 1. Global Scaling ClipPath Defs Container */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="dynamicCurveClip" clipPathUnits="objectBoundingBox">
            <path d={getClipPathData()} />
          </clipPath>
        </defs>
      </svg>

      {/* 2. Core Structural Canvas Area */}
      <div
        className="w-full relative z-0"
        style={{
          clipPath: !imageUrl ? "url(#dynamicCurveClip)" : undefined,
          backgroundColor: backgroundColor,
          height: curveHeight,
        }}
      >
        {imageUrl && (
          /* Wrapped background image layer */
          <div
            className="absolute w-full h-full overflow-hidden z-10"
            style={{
              clipPath: "url(#dynamicCurveClip)",
              top: showTopCurve ? `-${curveHeight}px` : "0px",
              bottom: showBottomCurve ? `-${curveHeight}px` : "0px",
              height: `calc(100% + ${showTopCurve ? curveHeight : 0}px + ${showBottomCurve ? curveHeight : 0}px)`,
            }}
          >
            {/* Contrast tint layer */}
            <div className="absolute inset-0  z-10 pointer-events-none" />
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover transform scale-100 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        {/* Foreground Content Interface */}
        <div className="relative z-20 w-full h-full">{children}</div>

        {/* 3. DYNAMIC BOTTOM BLUR OVERLAY LAYER */}
        {showBottomCurve && (
          <div
            className="absolute left-0 right-0 bottom-0 z-15 pointer-events-none"
            style={{
              height: `${curveHeight}px`,
              // This clips the blur box exactly to your curve matrix
              clipPath: "url(#dynamicCurveClip)",
              // High-end frosted glass backdrop blur setting
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(20px)", // Safari compatibility
              // Optional: adds a slight color modifier to emphasize the edge transition
              backgroundColor: backgroundColor,
            }}
          />
        )}
      </div>
    </section>
  );
}
