import React from "react";
import land_lord from "../../assets/landlord_page.jpg";

export function ShowcaseSection(): React.JSX.Element {
  return (
    <section className="relative w-full overflow-hidden bg-[#070D1F] py-20 px-4 md:px-12">
      {/* 1. Global Inline SVG Clip Path Definition (Hidden from view) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* objectBoundingBox scales coordinates elegantly from 0 to 1 based on container size */}
          <clipPath id="premiumShape" clipPathUnits="objectBoundingBox">
            <path
              d="M 0.5,0.02 
                     C 0.68,0.02 0.82,0.08 0.85,0.2 
                     C 0.88,0.32 0.98,0.34 0.98,0.5 
                     C 0.98,0.66 0.88,0.68 0.85,0.8 
                     C 0.82,0.92 0.68,0.98 0.5,0.98 
                     C 0.32,0.98 0.18,0.92 0.15,0.8 
                     C 0.12,0.68 0.02,0.66 0.02,0.5 
                     C 0.02,0.34 0.12,0.32 0.15,0.2 
                     C 0.18,0.08 0.32,0.02 0.5,0.02 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* 2. Main Content Layout Grid */}
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        {/* Left Features Column */}
        <div className="space-y-16 lg:col-span-3">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#D4AF37]">
              Premium features
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Thikana is a modern configuration real estate brokerage, signing
              and trusted promotions changes from all development.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#D4AF37]">
              Premium features & compliances
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Thikana provides analytic design, raw and compliance, features and
              combined premium features.
            </p>
          </div>
        </div>

        {/* Center Canvas: Clipped Image Container */}
        <div className="relative flex justify-center lg:col-span-6">
          {/* Subtle glowing backdrop matching the outer gold frame */}
          <div className="absolute inset-0 scale-95 bg-[#D4AF37]/10 blur-3xl rounded-full" />

          {/* Outer Border Frame container */}
          <div className="relative w-full max-w-lg aspect-[4/3] md:aspect-square flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 50,2 
                   C 68,2 82,8 85,20 
                   C 88,32 98,34 98,50 
                   C 98,66 88,68 85,80 
                   C 82,92 68,98 50,98 
                   C 32,98 18,92 15,80 
                   C 12,68 2,66 2,50 
                   C 2,34 12,32 15,20 
                   C 18,8 32,2 50,2 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.75"
              />
            </svg>

            {/* The Actual Clipped Image Element */}
            <div
              className="w-[96%] h-[96%] overflow-hidden bg-slate-800"
              style={{ clipPath: "url(#premiumShape)" }}
            >
              <img
                src={land_lord}
                alt="Thikana Luxury Interior Showcase"
                className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>

        {/* Right Features Column */}
        <div className="space-y-16 lg:col-span-3 lg:text-right">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#D4AF37]">
              Interior Design Philosophies
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Thikana is a unique rental apartment's rental design, showcasing
              layout architecture and exceptional premium home indicators.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#D4AF37]">
              Interior Design Philosophies
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Thikana is a conscious rental apartment, interrupting outstanding
              and concept to your apartments.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Bottom Brand Title */}
      <div className="absolute bottom-6 right-12 hidden md:block">
        <span className="text-3xl font-serif font-semibold tracking-wider text-[#D4AF37]/40 select-none">
          Thikana
        </span>
      </div>
    </section>
  );
}
