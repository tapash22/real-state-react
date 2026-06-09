import { Link } from "react-router-dom";

type DemoProps = {
  // add props later if needed
};

export function Demo(_props: DemoProps) {
  return (
    <div className="my-0 w-fit lg:w-3/4 px-8 lg:px-16 ">
      <div
        style={{
          // Uses your primary brand color with a protective background mask for flawless text contrast
          backgroundImage: `linear-gradient(135deg, var(--button-bg) 0%, rgba(15, 23, 42, 0.9) 100%)`,
          borderColor: "var(--border)",
        }}
        className="relative overflow-hidden rounded-2xl p-5 md:p-12 w-full border shadow-xl shadow-gray-100/10 transition-all duration-300"
      >
        {/* Subtle Decorative Background Element for texture */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        {/* CONTENT HOLDER */}
        <div className="w-full max-w-3xl relative z-10 space-y-2 lg:space-y-0">
          <p className="text-xs font-extrabold uppercase tracking-widest text-white/70">
            Experience before you decide
          </p>

          <h2 className="text-xl md:text-4xl py-2 tracking-tight text-white font-extrabold leading-tight">
            Take a virtual tour of your future home before you visit
          </h2>

          <p className="text-white/80 text-sm md:text-base font-normal lg:font-medium lg:mb-6 leading-normal lg:leading-relaxed">
            Explore rooms, facilities, and surroundings through a guided video
            tour so you can make a confident decision without any confusion or
            time waste.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white font-medium lg:font-bold text-sm tracking-wide group"
          >
            <span className="underline decoration-2 underline-offset-4 group-hover:text-white/80 transition-colors">
              Explore all video tours
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
