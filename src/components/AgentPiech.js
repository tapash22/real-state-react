import React from "react";


function AgentPiech(props) {
  return (
    <ul className="-mt-80 ml-2 z-50">
      <li className="flex justify-center items-center list-none w-10 h-10 rounded-full bg-violet-600 my-2">
        <RiMapPinLine className="text-white text-3xl font-bold" />
      </li>
      <li className="flex justify-center items-center list-none w-10 h-10 rounded-full bg-violet-600 my-2">
        <RiMapPinLine className="text-white text-3xl font-bold" />
      </li>
      <li className="flex justify-center items-center list-none w-10 h-10 rounded-full bg-violet-600">
        <RiMapPinLine className="text-white text-3xl font-bold" />
      </li>
    </ul>
  );
}

export default AgentPiech;
