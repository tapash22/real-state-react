import React from "react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

function House({ house }) {
  const {
    name,
    type,
    image,
    country,
    address,
    bedroom,
    bathroom,
    surface,
    year,
    price,
  } = house;
  return (
    <div className="bg-white shadow-1 my-3 rounded-lg p-5 rounded-tl-[40px] w-full max-w-[350px] hover:shadow-2xl cursor-pointer transition">
      <img src={image} alt="" className="mb-8 h-[180px] w-full rounded-sm" />
      <div className="mb-4 text-sm flex gap-x-2">
        <div className="bg-green-300 rounded-full text-white px-3 py-1">
          {type}
        </div>
        <div className="bg-violet-500 rounded-full text-white px-3 py-1">
          {country}
        </div>
      </div>
      <div className="text-lg font-semibold max-w-[260px]">{address}</div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <BiBed />
          </div>
          <div>{bedroom}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <BiBath />
          </div>
          <div>{bathroom}</div>
        </div>
        <div className="flex items-center text-gray-600 gap-1">
          <div className="text-[20px]">
            <BiArea />
          </div>
          <div>{surface}</div>
        </div>
      </div>
      <div className="text-lg font-semibold text-violet-500 mb-4 text-start">
        {price}
      </div>
    </div>
  );
}

export default House;
