import { Place } from "../../data";

type PlaceProps = {
  place: Place;
};
export function PlaceCard({ place }: PlaceProps) {
  return (
    <div className="relative border-2 border-violet-200 rounded-2xl opacity-90 hover:opacity-100 mb-8 overflow-hidden group">
      {/* IMAGE */}
      <img
        src={place.image}
        alt={place.title}
        className="w-full min-h-[350px] object-cover rounded-xl p-1"
      />

      {/* HOVER CONTENT */}
      <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="mb-6 bg-white border-2 border-gray-300 rounded-2xl px-4 py-2 shadow-lg">
          <p className="text-center text-lg text-violet-900 font-normal">
            {place.title}
          </p>
          <p className="text-center text-sm font-extralight text-violet-800">
            {place.sq}
          </p>
        </div>
      </div>
    </div>
  );
}
