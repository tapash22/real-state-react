import React from 'react';
import Partner from './Partner'

function Partners(props) {
    return (
        <section>
            <div className='container mx-auto my-10'>
                <div className='py-4 mx-auto'>
                <p className='text-sm font-normal text-center text-violet-600'>Our Partners</p>
                <h2 className='text-center text-2xl font-bold py-2 text-black'>Reliable Partner’s</h2>
                </div>
                <div className='py-2 mx-auto grid grid-cols-3 lg:grid-cols-6 gap-2'>
                    <Partner />
                    <Partner />
                    <Partner />
                    <Partner />
                    <Partner />
                    <Partner />
                </div>

            </div>
        </section>
    );
}

export default Partners;