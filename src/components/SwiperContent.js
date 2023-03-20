import React from 'react';
import {AiFillStar} from 'react-icons/ai';

function SwiperContent(props) {
    return (
        <div className="flex flex-row  rounded-lg items-center bg-violet-300">
                  <div className=" w-1/2 h-[300px] p-4 flex justify-center items-center ">
                    <img src={props.image.image} alt="" className="w-2/4 h-[280px] rounded-lg" />
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className="border-2 p-4 rounded-lg w-[500px]">
                      <p className="text-sm font-normal text-start text-violet-600">
                        {props.image.title}
                      </p>
                      <h2 className="text-start text-2xl font-bold py-2 text-black mb-2 w-[250px]">
                        {props.image.tag}
                      </h2>
                      <p className=" text-sm font-normal text-justify mb-4 ">
                        {props.image.des}
                      </p>
                      <div className="flex flex-row justify-between">
                        <h2 className="text-sm font-semibold p-2 ">{props.image.name}</h2>
                        <p className="p-2 gap-1 flex flex-row">
                            <AiFillStar className='text-sm font-semibold text-white'/>
                            <AiFillStar className='text-sm font-semibold text-white'/>
                            <AiFillStar className='text-sm font-semibold text-white'/>
                            <AiFillStar className='text-sm font-semibold text-white'/>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
    );
}

export default SwiperContent;