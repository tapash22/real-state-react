import React from 'react';
import ep from '../assets/ep.jpg';

function EmailPage(props) {
    return (
        <div>
            <div className='flex justify-between '>
                <div className='w-1/2 p-4 flex justify-center items-center bg-violet-600 '>
                    <div className=''>
                        <h2 className='text-3xl text-start font-semibold py-2 text-white'>Are You a Home Owner</h2>
                        <p className='py-2 text-sm font-bold text-start text-gray-200'>
                            put your email address and get listed ?
                        </p>
                        <div className=' my-2 border-2 border-white rounded-xl flex'>
                            <input name='email' type="email" placeholder='Enter your email' className='pl-3 rounded-tl-xl rounded-bl-xl text-gray-300 text-sm font-semibold h-10 py-1 bg-violet-600' />
                            <button className='bg-white rounded-tr-md rounded-br-md px-4 text-sm font-semibold'>Get Listed</button>
                        </div>
                    </div>
                </div>

                <div className='w-1/2 flex'>
                    <img src={ep} alt='bilding' className='rounded-md  w-screen h-[300px]' />
                </div>
            </div>
        </div>
    );
}

export default EmailPage;