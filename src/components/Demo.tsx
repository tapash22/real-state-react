import { Link } from "react-router-dom";

type DemoProps = {
  // add props later if needed
};

export function Demo(_props: DemoProps) {
  return (
    <div className="my-10 w-full px-10">
      <div className="mb-4 flex flex-col lg:flex-row bg-violet-700 rounded-xl p-8 w-full">
        {/* LEFT CONTENT */}
        <div className="w-full">
          <p className="text-sm font-medium text-start text-white/80">
            Experience before you decide
          </p>

          <h2 className="text-3xl py-3 tracking-wide text-start text-white font-bold leading-snug">
            Take a virtual tour of your future home before you visit
          </h2>

          <p className="text-white/80 text-sm mt-2 mb-4 text-start">
            Explore rooms, facilities, and surroundings through a guided video
            tour so you can make a confident decision without any confusion or
            time waste.
          </p>

          <Link
            to="/"
            className="text-white underline text-sm font-medium flex justify-start hover:text-white/80 transition"
          >
            Explore all video tours →
          </Link>
        </div>
      </div>
    </div>
  );
}
