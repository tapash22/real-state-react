import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import house1 from "../../assets/house1.jpg";
import { ClientSwiperNavButtons } from "../swiper/ClientSwiperNavButtons";
import { SwiperContent } from "../swiper/SwiperContent";

// 1. Type for review item
type ClientReview = {
  id: number;
  image: string;
  title: string;
  des: string;
  tag: string;
  name: string;
};

// 2. Props (optional for now)
type ClientsReviewProps = {
  // add later if needed
};

export function ClientsReview(_props: ClientsReviewProps) {
  const images: ClientReview[] = [
    {
      id: 1,
      image: house1,
      title: "Testimonial",
      des: "this is very beautiful house and it's south face view and use materials are imported from Italy. there have 4 room, 3 wash room and every room have 2 window with attach balcony",
      tag: "Reviews From Our Happy Client",
      name: "Tapash paul",
    },
    {
      id: 2,
      image: house1,
      title: "Testimonial",
      des: "this is very beautiful house and it's south face view and use materials are imported from Italy. there have 4 room, 3 wash room and every room have 2 window with attach balcony",
      tag: "Reviews From Our Happy Client",
      name: "Tapash paul",
    },
    {
      id: 3,
      image: house1,
      title: "Testimonial",
      des: "this is very beautiful house and it's south face view and use materials are imported from Italy. there have 4 room, 3 wash room and every room have 2 window with attach balcony",
      tag: "Reviews From Our Happy Client",
      name: "Tapash paul",
    },
    {
      id: 4,
      image: house1,
      title: "Testimonial",
      des: "this is very beautiful house and it's south face view and use materials are imported from Italy. there have 4 room, 3 wash room and every room have 2 window with attach balcony",
      tag: "Reviews From Our Happy Client",
      name: "Tapash paul",
    },
  ];

  return (
    <div className="my-10 w-full px-10 py-5 bg-gray-100">
      <Swiper
        className="p-8"
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
      >
        {/* Slides */}
        {images.map((item) => (
          <SwiperSlide className="" key={item.id}>
            <SwiperContent image={item} />
          </SwiperSlide>
        ))}

        {/* Navigation */}
        <ClientSwiperNavButtons />
      </Swiper>
    </div>
  );
}
