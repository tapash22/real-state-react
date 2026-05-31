import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSwiper } from "swiper/react";

type ClientSwiperNavButtonsProps = {
  // no props needed for now
};

export function ClientSwiperNavButtons(_props: ClientSwiperNavButtonsProps) {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns flex gap-2">
      <button
        className="bg-white px-3 rounded-lg"
        onClick={() => swiper.slidePrev()}
        type="button"
      >
        <AiOutlineArrowLeft className="text-5xl font-extrabold p-1 text-violet-800" />
      </button>

      <button
        className="bg-white px-3 rounded-lg"
        onClick={() => swiper.slideNext()}
        type="button"
      >
        <AiOutlineArrowRight className="text-5xl font-extrabold p-1 text-violet-800" />
      </button>
    </div>
  );
}
