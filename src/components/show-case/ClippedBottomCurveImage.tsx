import React from "react";
import landlord_header from "../../assets/landlord_header.jpg";

export function ClippedBottomCurveImage(): React.JSX.Element {
  return (
    <section className="relative w-full overflow-hidden bg-transparent px-0">
      {/* 1. Inward Bottom-Curve Definition Only (Top is completely flat) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="innerBottomCurveOnly" clipPathUnits="objectBoundingBox">
            {/* Starts at top-left (0,0), goes straight to top-right (1,0), 
              drops down the right edge to Y=0.94, curves gracefully inward 
              up to Y=0.82 on the left, and closes out.
            */}
            <path d="M0,0 L1,0 L1,0.78 C0.75,1 0.25,1 0,0.78 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 2. Full-Width Main Frame Container */}
      <div className="relative w-full h-[380px] sm:h-[4200px] md:h-[650px]">
        {/* The Clipped Image Container */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: "url(#innerBottomCurveOnly)" }}
        >
          {/* Dark Overlay Tint for Typography Contrast */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          <img
            src={landlord_header}
            alt="Rent out quickly and with confidence"
            className="w-full h-full object-cover transform scale-100 transition-transform duration-1000 ease-out"
          />
        </div>
      </div>
    </section>
  );
}
