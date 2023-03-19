import React, { useState } from "react";
import house1 from "../assets/house1.jpg";

function Place(props) {
  const [text, setText] = useState(false);
  return (
    <div>
      <div
        className="border-2 border-violet-400 rounded-2xl opacity-90 hover:opacity-100"
        onMouseOver={() => setText(true)}
        onMouseLeave={() => setText(false)}
      >
        <img
          src={house1}
          alt=""
          className="w-full relative min-h-[350px] rounded-xl p-1"
        />
        <div className="absolute ml-20 z-50 ">
          {text ? (
            <div className="flex justify-center -mt-20 border-2 mx-auto w-full  rounded-lg">
              <p className="p-2 flex flex-col bg-gray-200 px-">
                <span className="text-center text-sm text-violet-500 font-bold">
                   Site full name 
                </span>
                <span className="text-center text-sm font-normal">1800</span>
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Place;
