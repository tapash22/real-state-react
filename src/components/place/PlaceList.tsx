import { Link } from "react-router-dom";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Place, placeList } from "../../data";
import { PlaceCard } from "./PlaceCard";

export function PlaceList() {
  return (
    <section className="my-5 lg:my-16 w-full px-8 lg:px-16  transition-colors duration-300">
      {/* HEADER */}
      <div className="py-3 text-center space-y-1">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
        >
          Explore cities
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          Find Your Neighborhood
        </h3>
      </div>

      {/* SWIPER */}
      <Swiper
        spaceBetween={24}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="pb-12"
        // Dynamically adjusts visible slides based on screen real estate
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {placeList.map((place: Place) => (
          <SwiperSlide key={place.id}>
            <Link
              to={`/agents/${place.id}`}
              className="block focus:outline-none"
            >
              <PlaceCard place={place} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
