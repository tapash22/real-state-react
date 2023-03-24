import React, { useState } from "react";

function Place(props) {
  const [text, setText] = useState(false);
  return (
    <div>
      <div
        className="border-2 border-violet-200 rounded-2xl opacity-90 hover:opacity-100 mb-8"
        onMouseOver={() => setText(true)}
        onMouseLeave={() => setText(false)}
      >
        <img
          src={props.place.image}
          alt=""
          className="w-full relative min-h-[350px] rounded-xl p-1"
        />
        <div className="absolute z-50 w-full ">
          {text ? (
            <div className="flex justify-center -mt-20  mx-auto w-full rounded-lg">
              <p className="p-2 flex flex-col  w-[150px] bg-violet-300">
                <span className="text-center text-sm text-violet-500 font-bold">
                   {props.place.title}
                </span>
                <span className="text-center text-sm font-normal">{props.place.sq}</span>
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
