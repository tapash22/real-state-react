import React, { useState } from 'react';
import house1 from '../assets/house1.jpg';
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
          <img
            src={house1}
            alt=""
            className="w-full relative min-h-[300px]  "
          />
          {/* <div className="absolute "> */}
            {list ? (
              <div className="flex justify-start items-start border-2 mx-auto w-full  rounded-lg">
                <ul className='-mt-64 ml-2 z-50'>
                    <li className='flex justify-center items-center list-none w-10 h-10 rounded-full bg-violet-600 my-2'>
                        <RiMapPinLine className="text-white text-3xl font-bold"/>
                    </li>
                    <li className='flex justify-center items-center list-none w-10 h-10 rounded-full bg-violet-600 my-2'>
                        <RiMapPinLine className="text-white text-3xl font-bold"/>
                    </li>
                    <li className='flex justify-center items-center list-none w-10 h-10 rounded-full bg-violet-600'>
                        <RiMapPinLine className="text-white text-3xl font-bold"/>
                    </li>
                </ul>
                </div>

            ) : ''}
          {/* </div> */}
          <div className='shadow-1 bg-white border-b-4 my-2 border-violet-600'>
            <h2 className='text-large font-semibold'>name</h2>
            <p className='text-sm font-normal mb-2'>status</p>
          </div>
        </div>
      </div>
    );
}

export default SingleAgent;