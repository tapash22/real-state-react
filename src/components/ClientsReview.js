import React from "react";
// import Swiper from "swiper";
import { A11y, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ClientSwiperNavButtons from "./ClientSwiperNavButtons";
import house1 from "../assets/house1.jpg";
import SwiperContent from "./SwiperContent";


function ClientsReview(props) {
  const images = [
    {
      id: 1,
      image: house1,
      title:'Testimonial',
      des:"this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
      tag:'Reviews From Our Happy Client',
      name:'Tapash paul'
    },
    {
        id: 2,
        image: house1,
        title:'Testimonial',
        des:"this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
        tag:'Reviews From Our Happy Client',
        name:'Tapash paul'
      },
      {
        id: 3,
        image: house1,
        title:'Testimonial',
        des:"this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
        tag:'Reviews From Our Happy Client',
        name:'Tapash paul'
      },
      {
        id: 4,
        image: house1,
        title:'Testimonial',
        des:"this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
        tag:'Reviews From Our Happy Client',
        name:'Tapash paul'
      },
  ];

  return (
    <section className="container mx-auto my-10">
      <Swiper
        className="p-8"
        modules={[Navigation, Pagination, A11y]}
        // spaceBetween={30}
        slidesPerView="1"
      >
        <div>
          {images.map((image) => {
            return (
              <SwiperSlide className="res-slide ">
                <SwiperContent key={image.id} image={image} />
              </SwiperSlide>
            );
          })}
        </div>

        <div>
          <ClientSwiperNavButtons />
        </div>
      </Swiper>
    </section>
  );
}

export default ClientsReview;
