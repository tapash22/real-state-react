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
        }}
        className="
          relative z-10 overflow-hidden rounded-[24px] border w-full flex flex-col justify-between
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
          group-hover:-translate-y-2 group-hover:scale-[1.01]
          
          /* Shadow adjustments for active themes on hover scale */
          shadow-lg hover:shadow-xl 
          dark:shadow-black/20 dark:hover:shadow-black/50
          cursor-pointer
          custom-neo-shadow
          space-y-2
        "
      >
        <div className="">
          {/* MEDIA HERO */}
          <div className="relative overflow-hidden aspect-[5/3] lg:aspect-[4/3] w-full bg-black/5">
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
            <div className="absolute left-4 top-4 rounded-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-2 text-xs lg:text-sm font-semibold tracking-wider text-slate-900 dark:text-slate-100 shadow-lg">
              Confirmed
            </div>
          </div>

          {/* METRICS & DESCRIPTION CONTAINER */}
          <div className="p-3 lg:p-5 space-y-3">
            {/* TAXONOMY / CHIPS */}
            <div className=" flex flex-wrap items-center gap-2 tracking-wide ">
              <span className="rounded-full bg-emerald-500/10 text-xs lg:text-sm font-normal lg:font-medium text-emerald-600 dark:text-emerald-400 px-2 py-1">
                {type}
              </span>
              <span
                style={{
                  backgroundColor: "rgba(20, 184, 166, 0.12)",
                  color: "var(--button-bg)",
                }}
                className="rounded-full px-2 py-1 text-xs lg:text-sm font-normal lg:font-medium"
              >
                {country}
              </span>
            </div>

            {/* IDENTITY METADATA ROW */}
            <div className="flex items-start justify-between gap-3">
              <h3
                style={{ color: "var(--text-heading)" }}
                className="text-md lg:text-lg font-medium lg:font-bold tracking-tight line-clamp-1 truncate transition-colors duration-300"
              >
                {address}
              </h3>

              <div
                style={{ color: "var(--text-heading)" }}
                className="flex items-center justify-center gap-1 text-sm font-bold shrink-0"
              >
                <BiStar className="text-amber-400 text-base" />
                <span>4.8</span>
                <span
                  style={{ color: "var(--text-paragraph)" }}
                  className="font-normal tracking-wider text-xs opacity-80"
                >
                  (62)
                </span>
              </div>
            </div>

            {/* SELLING VALUE MARKER */}
            <div
              style={{ color: "var(--text-paragraph)" }}
              className="flex items-center gap-1 lg:gap-2 text-sm transition-colors duration-300"
            >
              <BiBoltCircle
                style={{ color: "var(--button-bg)" }}
                className="text-lg shrink-0"
              />
              <span className="line-clamp-1 truncate text-sm lg:text-lg font-normal lg:font-medium tracking-wide">
                Modern living with premium access
              </span>
            </div>
          </div>
        </div>
        {/* INTERIOR PROPERTY SPECIFICATIONS */}
        <div
          style={{
            color: "var(--text-paragraph)",
            borderColor: "var(--border)",
          }}
          className="p-3 border-t border-b border-[var(--border)] grid grid-cols-3 gap-1 text-xs font-bold transition-all duration-300   "
        >
          <div className="flex items-center gap-1 lg:gap-2">
            <BiBed className="text-sm lg:text-lg opacity-80" />
            <span className="text-xs font-semibold tracking-wide">
              {bedroom} Beds
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BiBath className="text-sm lg:text-lg opacity-80 " />
            <span className="text-xs font-semibold tracking-wide">
              {bathroom} Baths
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <BiArea className="text-sm lg:text-lg opacity-80 text-white" />
            <span className="text-xs font-semibold tracking-wide">
              {surface}
            </span>
          </div>
        </div>
        {/* INTERIOR PROPERTY SPECIFICATIONS END*/}

        {/* BOTTOM PRICE & BOOKING STATUS FOOTER ROW */}
        <div
          style={{ borderColor: "var(--border)" }}
          className="p-3 lg:p-5 flex flex-wrap items-center justify-between gap-2 "
        >
          <div
            style={{ color: "var(--text-paragraph)" }}
            className="space-x-1 flex items-center"
          >
            <span className="text-xs font-medium lg:font-bold tracking-wide">
              From
            </span>
            <span
              style={{ color: "var(--text-heading)" }}
              className="text-md lg:text-2xl font-bold lg:font-extrabold tracking-tight block sm:inline"
            >
              Tk {price}
            </span>
            <span className="text-xs font-medium lg:font-bold tracking-wide">
              /mo
            </span>
          </div>

          <div
            style={{ color: "var(--text-heading)" }}
            className="flex items-center gap-1 lg:gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium lg:text-xl lg:font-bold tracking-tight">
              Available now
            </span>
          </div>
        </div>
        {/* BOTTOM PRICE & BOOKING STATUS FOOTER ROW END*/}
      </div>
    </div>
  );
}
