import React from "react";
import land_lord from "../../assets/landlord_page.jpg";

export function ClippedTopCurveImage(): React.JSX.Element {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--bg)] px-0">
      {/* 1. Fluid Responsive SVG ClipPath */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="premiumDualWaveSmall" clipPathUnits="objectBoundingBox">
            <path d="M0,0.25 C0.25,0 0.75,0 1,0.25 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 
        2. Dynamic Aspect-Ratio Wrapper:
        Forces the banner container to dynamically scale its height relative to its width 
        on mobile, tablet, and desktop screens so the image has room to cover.
      */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[20/9] min-h-[400px]">
        {/* The Clipped Image Layer Container */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: "url(#premiumDualWaveSmall)" }}
        >
          {/* Subtle Contrast Tint Overlay */}
          <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

          {/* Enforced Edge-to-Edge Fluid Cover Asset */}
          <img
            src={land_lord}
            alt="Rent out quickly and with confidence"
            className="absolute inset-0 w-full h-full object-fill block transform scale-105"
          />
        </div>

        {/* 3. Responsive Blur & Fade Glass Overlays */}
        {/* Top Frosted Blur Wave */}
        <div
          className="absolute top-0 inset-x-0 h-[10%] min-h-[30px] max-h-[60px] pointer-events-none z-20 backdrop-blur-[2px]"
          style={{
            clipPath: "url(#premiumDualWaveSmall)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
        {/* Bottom Frosted Blur Wave */}
        <div
          className="absolute bottom-0 inset-x-0 h-[10%] min-h-[30px] max-h-[60px] pointer-events-none z-20 backdrop-blur-[2px]"
          style={{
            clipPath: "url(#premiumDualWaveSmall)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
