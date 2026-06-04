import { BiArea, BiBath, BiBed, BiBoltCircle, BiStar } from "react-icons/bi";

import type { House } from "../../data";

type HouseProps = {
  house: House;
};

export function HouseCard({ house }: HouseProps) {
  const { type, image, country, address, bedroom, bathroom, surface, price } =
    house;

  return (
    <div className="group relative w-full ">
      {/* CARD */}
      <div
        className="
          relative z-10 overflow-hidden rounded-[30px]
          border border-[#dbe3ea]
          bg-white
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:-translate-y-3
          group-hover:scale-[1.03]
          group-hover:shadow-2xl
          cursor-pointer
        "
        style={{
          boxShadow: `
            4px 4px 0 #f4f7fa,
            10px 10px 0 #e9eef4,
            14px 14px 0 #dde6ef,
            0 20px 50px rgba(15, 23, 42, 0.06)
          `,
        }}
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={address}
            className="
              h-[220px] w-full object-cover
              transition-transform duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-105
            "
          />

          {/* CONFIRMED BADGE */}
          <div
            className="
              absolute left-3 top-3
              rounded-full bg-white
              px-4 py-2
              text-sm font-semibold
              text-[#0f2f45]
              shadow-md
            "
          >
            Confirmed
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5">
          {/* TYPE + COUNTRY */}
          <div className="mb-4 flex gap-2 text-sm">
            <div className="rounded-full bg-green-400 px-3 py-1 text-white">
              {type}
            </div>

            <div className="rounded-full bg-violet-500 px-3 py-1 text-white">
              {country}
            </div>
          </div>

          {/* TITLE + RATING */}
          <div className="flex items-center justify-between gap-3">
            <h3
              className="
                line-clamp-2
                text-xl
                whitespace-nowrap
                font-bold
                tracking-wider
                text-[#072b45]
              "
            >
              {address}
            </h3>

            <div className="flex justify-center items-center gap-1 whitespace-nowrap text-sm">
              <BiStar className="text-[18px] text-yellow-400" />

              <span className="font-semibold text-sm">4.8</span>

              <span className="font-semibold text-sm">(62)</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-3 flex items-center gap-2 text-[15px] text-slate-600">
            <BiBoltCircle className="text-xl font-medium" />

            <span className="font-medium text-sm tracking-wide text-wrap leading-7 text-start">
              Modern living with premium
            </span>
          </div>

          {/* FEATURES */}
          <div className="my-5 flex flex-row justify-start items-center gap-5">
            <div className="flex flex-row justify-between gap-2 items-center text-gray-600">
              <BiBed className="text-xl font-bold" />
              <span className="font-bold text-sm">{bedroom}</span>
            </div>

            <div className="flex flex-row justify-between gap-2 items-center text-gray-600">
              <BiBath className="text-xl font-bold" />
              <span className="font-bold text-sm">{bathroom}</span>
            </div>

            <div className="flex flex-row justify-between gap-2 items-center text-gray-600">
              <BiArea className="text-xl font-bold" />
              <span className="font-bold text-sm">{surface}</span>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-slate-600 flex justify-start items-center gap-2 text-sm font-semibold">
            From
            <span className="text-3xl font-bold text-[#072b45]">
              Tk {price}
            </span>
            /month
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex items-center gap-2
            border-t border-gray-200
            px-5 py-4
            font-semibold text-[#072b45]
          "
        >
          <span className="h-[10px] w-[10px] rounded-full bg-green-500" />

          <span>Available now</span>
        </div>
      </div>
    </div>
  );
}
