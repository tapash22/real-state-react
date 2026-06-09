import { Place } from "../../data";

type PlaceProps = {
  place: Place;
};

export function PlaceCard({ place }: PlaceProps) {
  return (
    <div
      style={{ borderColor: "var(--border)" }}
      className="relative border rounded-2xl mb-0 lg:mb-8 overflow-hidden group shadow-sm bg-black/5 transition-all duration-300"
    >
      {/* IMAGE */}
      <img
        src={place.image}
        alt={place.title}
        className="w-full h-[380px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 border-2 rounded-2xl border-(--border)"
      />

      {/* GRADIENT OVERLAY (Guarantees card content pops beautifully) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

      {/* HOVER CONTENT CARD */}
      <div className="absolute inset-0 flex items-end justify-center p-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-80 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
        <div
          style={{
            backgroundColor: "var(--card)",
          }}
          className="w-full text-center border-b-4 border-(--border) rounded-tl-lg rounded-tr-lg p-2 shadow-xl backdrop-blur-md space-y-2"
        >
          <p
            style={{ color: "var(--text-heading)" }}
            className="text-xl font-bold tracking-tight transition-colors duration-300"
          >
            {place.title}
          </p>
          <p
            style={{ color: "var(--text-paragraph)" }}
            className="text-sm font-semibold tracking-wide uppercase  opacity-100 transition-colors duration-300"
          >
            {place.sq}
          </p>
        </div>
      </div>
    </div>
  );
}
