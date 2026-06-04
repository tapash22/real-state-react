import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import house1 from "../../assets/house1.jpg";
import { ClientSwiperNavButtons } from "../swiper/ClientSwiperNavButtons";
import { SwiperContent } from "../swiper/SwiperContent";

type ClientReview = {
  id: number;
  image: string;
  title: string;
  des: string;
  tag: string;
  name: string;
};

type ClientsReviewProps = {
  // add later if needed
};

export function ClientsReview(_props: ClientsReviewProps) {
  const images: ClientReview[] = [
    {
      id: 1,
      image: house1,
      title: "Testimonial",
      des: "This is a very beautiful house with a south-facing view. The structural materials used are imported directly from Italy. It features 4 spacious rooms, 3 washrooms, and every room includes 2 windows with an attached balcony.",
      tag: "Reviews From Our Happy Client",
      name: "Tapash Paul",
    },
    {
      id: 2,
      image: house1,
      title: "Testimonial",
      des: "This is a very beautiful house with a south-facing view. The structural materials used are imported directly from Italy. It features 4 spacious rooms, 3 washrooms, and every room includes 2 windows with an attached balcony.",
      tag: "Reviews From Our Happy Client",
      name: "Tapash Paul",
    },
    {
      id: 3,
      image: house1,
      title: "Testimonial",
      des: "This is a very beautiful house with a south-facing view. The structural materials used are imported directly from Italy. It features 4 spacious rooms, 3 washrooms, and every room includes 2 windows with an attached balcony.",
      tag: "Reviews From Our Happy Client",
      name: "Tapash Paul",
    },
    {
      id: 4,
      image: house1,
      title: "Testimonial",
      des: "This is a very beautiful house with a south-facing view. The structural materials used are imported directly from Italy. It features 4 spacious rooms, 3 washrooms, and every room includes 2 windows with an attached balcony.",
      tag: "Reviews From Our Happy Client",
      name: "Tapash Paul",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
      className="my-16 w-full border-y md:rounded-2xl md:border max-w-7xl mx-auto overflow-hidden transition-colors duration-300 shadow-sm"
    >
      <Swiper
        className="px-6 py-10 md:p-12"
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={40}
      >
        {/* Slides */}
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <SwiperContent image={item} />
          </SwiperSlide>
        ))}

        {/* Navigation Layer */}
        <div className="mt-6 flex justify-end">
          <ClientSwiperNavButtons />
        </div>
      </Swiper>
    </section>
  );
}
