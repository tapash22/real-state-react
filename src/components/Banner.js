import React from 'react';
import image from '../assets/house1.jpg';
import Search from './Search';

function Banner(props) {
    return (
        <div>
            <div className='bg-white max-w-[1440] flex'>
            <div className='w-2/3 bg-white p-3 block'>
                <div className='flex justify-start p-5 mt-16'>
                <span className='text-violet-400 text-xl font-bold '>
                    Rent
                </span>
                <span className='text-xl font-bold mx-2 text-black'>
                    Your dream house with us!
                </span>
                </div>
                <div className='mx-5'>
                    <p className='text-justify text-sm '>
                    Unlike the pretense of 50 Shades where Ana Steele gets pushed into doing things that made her uncomfortable, real Dom/sub relationships are about creating a place of safety and trust — and being absolutely hot as hell, to boot
                    </p>
                </div>

            </div>
            <div className=' w-1/3flex-1 lg:flex justify-end pa-5'>
                <img src={image}  alt='' className='w-full p-5'/>
            </div>
            
        </div>
        <div>
                <Search/>
            </div>
        </div>
    );
}

export default Banner;