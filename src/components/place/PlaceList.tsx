import { Link } from "react-router-dom";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Place, placeList } from "../../data";
import { PlaceCard } from "./PlaceCard";

export function PlaceList() {
  return (
    <section className="my-16 w-full px-6 md:px-10 max-w-7xl mx-auto transition-colors duration-300">
      {/* HEADER */}
      <div className="pb-6 text-center space-y-1">
        <p
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-extrabold uppercase tracking-widest"
        >
          Explore cities
        </p>
        <h2
          style={{ color: "var(--text-heading)" }}
          className="text-2xl md:text-3xl font-extrabold tracking-tight"
        >
          Find Your Neighborhood
        </h2>
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
          1024: { slidesPerView: 3 },
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
