import { BiArea, BiBath, BiBed, BiBoltCircle, BiStar } from "react-icons/bi";
import type { House } from "../../data";

type HouseProps = {
  house: House;
};

export function HouseCard({ house }: HouseProps) {
  const { type, image, country, address, bedroom, bathroom, surface, price } =
    house;

  return (
    <div className="group relative w-full h-full flex">
      {/* SHADOW-ADAPTIVE CARD CONTAINER */}
      <div
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          // Re-engineered layered shadow system using CSS variable tones
          // to perfectly mirror structural layers in light and dark layouts
          boxShadow: `
            4px 4px 0px var(--bg),
            10px 10px 0px rgba(0, 0, 0, 0.03),
            14px 14px 0px rgba(0, 0, 0, 0.02),
            0px 20px 40px rgba(0, 0, 0, 0.06)
          `,
        }}
        className="
          relative z-10 overflow-hidden rounded-[24px] border w-full flex flex-col justify-between
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          group-hover:-translate-y-2 group-hover:scale-[1.01]
          
          /* Shadow adjustments for active themes on hover scale */
          shadow-lg hover:shadow-xl 
          dark:shadow-black/20 dark:hover:shadow-black/50
          cursor-pointer
        "
      >
        <div>
          {/* MEDIA HERO */}
          <div className="relative overflow-hidden aspect-[4/3] w-full bg-black/5">
            <img
              src={image}
              alt={address}
              className="
                h-full w-full object-cover
                transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                group-hover:scale-105
              "
            />

            {/* FLOATING STATUS BADGE */}
            <div className="absolute left-4 top-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 shadow-sm">
              Confirmed
            </div>
          </div>

          {/* METRICS & DESCRIPTION CONTAINER */}
          <div className="p-5">
            {/* TAXONOMY / CHIPS */}
            <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold tracking-wide">
              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1">
                {type}
              </span>
              <span
                style={{
                  backgroundColor: "rgba(20, 184, 166, 0.12)",
                  color: "var(--button-bg)",
                }}
                className="rounded-full px-3 py-1"
              >
                {country}
              </span>
            </div>

            {/* IDENTITY METADATA ROW */}
            <div className="flex items-start justify-between gap-3">
              <h3
                style={{ color: "var(--text-heading)" }}
                className="text-lg font-bold tracking-tight line-clamp-1 truncate transition-colors duration-300"
              >
                {address}
              </h3>

              <div
                style={{ color: "var(--text-heading)" }}
                className="flex items-center gap-1 text-sm font-bold shrink-0"
              >
                <BiStar className="text-amber-400 text-base" />
                <span>4.8</span>
                <span
                  style={{ color: "var(--text-paragraph)" }}
                  className="font-normal text-xs opacity-80"
                >
                  (62)
                </span>
              </div>
            </div>

            {/* SELLING VALUE MARKER */}
            <div
              style={{ color: "var(--text-paragraph)" }}
              className="mt-2.5 flex items-center gap-1.5 text-sm transition-colors duration-300"
            >
              <BiBoltCircle
                style={{ color: "var(--button-bg)" }}
                className="text-lg shrink-0"
              />
              <span className="line-clamp-1 truncate">
                Modern living with premium access
              </span>
            </div>

            {/* INTERIOR PROPERTY SPECIFICATIONS */}
            <div
              style={{
                color: "var(--text-paragraph)",
                borderColor: "var(--border)",
              }}
              className="my-4 pt-4 border-t flex items-center gap-4 text-xs font-bold transition-all duration-300"
            >
              <div className="flex items-center gap-1.5">
                <BiBed className="text-lg opacity-80" />
                <span>{bedroom} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BiBath className="text-lg opacity-80" />
                <span>{bathroom} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BiArea className="text-lg opacity-80" />
                <span>{surface}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM PRICE & BOOKING STATUS FOOTER ROW */}
        <div
          style={{ borderColor: "var(--border)" }}
          className="border-t p-5 flex flex-wrap items-center justify-between gap-2 pt-4 mt-auto"
        >
          <div
            style={{ color: "var(--text-paragraph)" }}
            className="text-xs font-semibold"
          >
            From{" "}
            <span
              style={{ color: "var(--text-heading)" }}
              className="text-2xl font-extrabold tracking-tight block sm:inline"
            >
              Tk {price}
            </span>{" "}
            /mo
          </div>

          <div
            style={{ color: "var(--text-heading)" }}
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
