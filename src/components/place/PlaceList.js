import React from "react";
import { Link } from "react-router-dom";
// import Place from './Place';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { placeList } from "../../data";
import Place from "./Place";

function PlaceList(props) {
  

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
              return (
                <SwiperSlide>
                  <Link to={`/agents/${place.id}`} key={place.id}>
                    <Place key={place.id} place={place} />
                    <br />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default PlaceList;
