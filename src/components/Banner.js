import React from "react";
import image from "../assets/house1.jpg";
import Search from "./Search";

function Banner(props) {
  return (
    <section>
      <div className="bg-white max-w-[1440] flex">
        <div className=" bg-white p-3 block mx-auto items-center">
          <div className="flex justify-center p-5 h-36 items-end ">
            <span className=" text-3xl font-bold uppercase items-end ">Rent</span>
            <span className="text-3xl font-bold mx-2 uppercase ">
              Your dream house with us!
            </span>
          </div>
          <div className="h-36 mx-16">
            <p className="text-justify text-sm">
              Unlike the pretense of 50 Shades where Ana Steele gets pushed into
              doing things that made her uncomfortable, real Dom/sub
              relationships are about creating a place of safety and trust — and
              being absolutely hot as hell, to boot
            </p>
          </div>
        </div>
        <div className="block justify-end py-2 w-full">
          <img src={image} alt="" className="w-full p-1" />
        </div>
      </div>
      <div>
        <Search />
      </div>
    </section>
  );
}

export default Banner;
