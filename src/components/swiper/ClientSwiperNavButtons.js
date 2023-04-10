import React from 'react';
import {useSwiper} from 'swiper/react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function ClientSwiperNavButtons(props) {
    const swiper = useSwiper();
    return (
        <div className="swiper-nav-btns">
        <button className='bg-white px-3 py-auto rounded-lg' onClick={() => swiper.slidePrev()}><AiOutlineArrowLeft className='text-5xl font-extrabold p-1 text-violet-800' /></button>
        <button className='bg-white px-3 py-auto rounded-lg' onClick={() => swiper.slideNext()}><AiOutlineArrowRight className='text-5xl font-extrabold p-1 text-violet-800' /></button>
      </div>
    );
}

export default ClientSwiperNavButtons;