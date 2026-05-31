import { BiArea, BiBath, BiBed } from "react-icons/bi";
import type { House } from "../../data";

type HouseProps = {
  house: House;
};

export function HouseCard({ house }: HouseProps) {
  const { type, image, country, address, bedroom, bathroom, surface, price } =
    house;

  return (
    <div className="bg-white shadow-1 my-3 rounded-lg p-5 w-full max-w-[350px] hover:shadow-2xl cursor-pointer transition">
      {/* IMAGE */}
      <img
        src={image}
        alt={address}
        className="mb-8 h-[180px] w-full rounded-sm object-cover"
      />

      {/* TAGS */}
      <div className="mb-4 text-sm flex gap-x-2">
        <div className="bg-green-300 rounded-full text-white px-3 py-1">
          {type}
        </div>

        <div className="bg-violet-500 rounded-full text-white px-3 py-1">
          {country}
        </div>
      </div>

      {/* ADDRESS */}
      <div className="text-lg font-semibold max-w-[260px]">{address}</div>

      {/* FEATURES */}
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <BiBed className="text-[20px]" />
          <div>{bedroom}</div>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
          <BiBath className="text-[20px]" />
          <div>{bathroom}</div>
        </div>

        <div className="flex items-center text-gray-600 gap-1">
          <BiArea className="text-[20px]" />
          <div>{surface}</div>
        </div>
      </div>

      {/* PRICE */}
      <div className="text-lg font-semibold text-violet-500 mb-4">
        Tk {price}
      </div>
    </div>
  );
}
