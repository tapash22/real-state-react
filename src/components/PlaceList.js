import React from "react";
// import Place from './Place';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import hotel1 from "../assets/house1.jpg";
import Place from "./Place";

function PlaceList(props) {
  const placeList = [
    {
      id: 1,
      title: "Rose villa",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 2,
      title: "Red Palace",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 3,
      title: "Green villa",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 4,
      title: "Paul villa",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 5,
      title: "... villa",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 6,
      title: "... villa",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 7,
      title: "... villa",
      image: hotel1,
      sq: "1800",
    },
    {
      id: 8,
      title: "... villa",
      image: hotel1,
      sq: "1800",
    },
  ];

  return (
    <section>
      <div className="container mx-auto my-10">
        <div className="py-4 mx-auto">
          <p className="text-sm font-normal text-center text-violet-600">
            Explore citys
          </p>
          <h2 className="text-center text-2xl font-bold py-2 text-black">
            Find Your Neighborhood
          </h2>
        </div>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            
              {placeList.map((place) => {

                return  (<SwiperSlide>
                <Place key={place.id} place={place} /><br/>
                </SwiperSlide>
                )
              })}
            
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default PlaceList;
