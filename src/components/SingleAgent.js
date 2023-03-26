import React, { useState } from "react";
import house1 from "../assets/house1.jpg";
import { RiMapPinLine } from "react-icons/ri";

function SingleAgent(props) {
  const [list, setList] = useState(false);

  return (
    <div>
      <div
        className="rounded-2xl opacity-90 hover:opacity-100 overflow-hidden"
        onMouseOver={() => setList(true)}
        onMouseLeave={() => setList(false)}
      >
        <div className="relative">
          <img
            src={house1}
            alt=""
            className="w-full relative min-h-[300px]  "
          />

          <div className="shadow-1 bg-white border-b-4 my-2 border-violet-600">
            <h2 className="text-large font-semibold">name</h2>
            <p className="text-sm font-normal mb-2">status</p>
          </div>
          <div className="absolute top-1 left-1 z-50">
            {list ? (
              <div className="flex justify-start items-start border-2 mx-auto w-full  rounded-lg">
                <ul className='border-x-slate-100'>

                   <li className='flex justify-center items-center list-none my-3'>
                        <RiMapPinLine className="text-violet-900 text-2xl font-medium"/>
                    </li>
                    <li className='flex justify-center items-center list-none  my-3'>
                        <RiMapPinLine className="text-violet-900 text-2xl font-medium"/>
                    </li>
                    <li className='flex justify-center items-center list-none  my-3'>
                        <RiMapPinLine className="text-violet-900 text-2xl font-medium"/>
                    </li>
                </ul>
                </div>

            ) : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAgent;
