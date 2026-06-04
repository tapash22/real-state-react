import { Link } from "react-router-dom";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Place, placeList } from "../../data";
import { PlaceCard } from "./PlaceCard";

export function PlaceList() {
  return (
    <div className="my-10 w-full px-10">
      {/* HEADER */}
      <div className="py-4 mx-auto">
        <p className="text-sm font-normal text-center text-violet-600">
          Explore cities
        </p>
        <h2 className="text-center text-2xl font-bold py-2 text-black">
          Find Your Neighborhood
        </h2>
      </div>

      {/* SWIPER */}
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {placeList.map((place: Place) => (
          <SwiperSlide key={place.id}>
            <Link to={`/agents/${place.id}`}>
              <PlaceCard place={place} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
