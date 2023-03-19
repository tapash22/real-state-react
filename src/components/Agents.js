import React from 'react';
import SingleAgent from './SingleAgent';

function Agents(props) {
    return (
        <section>
            <div className='container mx-auto my-10 flex flex-col lg:flex-row gap-x-2'>
                <div className='py-2 mx-auto w-full lg:w-1/4'>
                <p className='text-sm font-normal text-center text-violet-600'>Our Agents</p>
                <h2 className='text-center text-2xl font-bold py-2 text-black'>Here Is Our Experts.</h2>
                </div>
                <div className='py-2 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 w-full lg:w-3/4'>
                    <SingleAgent />
                    <SingleAgent />
                    <SingleAgent />
                </div>

            </div>
        </section>
    );
}

export default Agents;