import React from "react";
import image from "../../assets/house1.jpg";
import Search from "./Search";

function Banner(props) {
  return (
    <section>
      <div className="bg-white  flex h-full items-center">
        <div className=" bg-white p-10 block mx-auto">
          <div className="flex justify-start mb-4 ">
            <span className="text-3xl font-bold uppercase mx-4 text-start ">
              Rent Your dream house with us 
            </span>
          </div>
          <div className="flex ">
            <p className="text-justify text-sm mx-4 font-semibold">
              Unlike the pretense of 50 Shades where Ana Steele gets pushed into
              doing things that made her uncomfortable, real Dom/sub
              relationships are about creating a place of safety and trust — and
              being absolutely hot as hell, to boot
            </p>
          </div>
        </div>
        <div className="hidden md:block lg:block lg:w-full">
          <img src={image} alt="" className="w-full h-full p-1 rounded-xl shadow-md" />
        </div>
      </div>
      <div>
        <Search />
      </div>
    </section>
  );
}

export default Banner;
