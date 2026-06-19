import React from "react";
import land_lord from "../../assets/landlord_page.jpg";

export function ClippedTopCurveImage(): React.JSX.Element {
  return (
    <section className="relative w-full overflow-hidden bg-transparent px-0">
      {/* 1. Dual Inward Curve Definition (Same asymmetric style top and bottom) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="dualInnerCurves" clipPathUnits="objectBoundingBox">
            {/* - Top path starts at (0, 0.18) and curves up to (1, 0.06) 
              - Bottom path starts at (1, 0.94) and curves up to (0, 0.82)
              This replicates the same fluid, asymmetric inner slope on both headers.
            */}
            <path
              d="M 0,0.18 
                 C 0.25,0.04 0.65,0.16 1,0.06
                 L 1,0.94 
                 C 0.65,0.84 0.25,0.96 0,0.82 
                 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* 2. Full-Width Main Frame Container */}
      <div className="relative w-full h-[420px] sm:h-[500px] md:h-[650px]">
        {/* The Clipped Image Container */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: "url(#dualInnerCurves)" }}
        >
          {/* Dark Overlay Tint for Typography Contrast */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          <img
            src={land_lord}
            alt="Thikana Luxury Portfolio Banner"
            className="w-full h-full object-cover transform scale-100 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* 3. Text Overlay Layer */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pb-4">
            <div className="max-w-xl space-y-4 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight drop-shadow-sm">
                Rent out quickly and <br className="hidden sm:inline" /> with
                confidence
              </h1>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed drop-shadow-sm opacity-90">
                Easily attract your perfect tenant while enjoying a safe rental
                journey. HousingAnywhere is the award-winning online platform
                for mid-to-long-term rentals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
