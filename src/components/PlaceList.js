import React from 'react';
import Place from './Place';

function PlaceList(props) {
    return (
        <section>
            <div className='container mx-auto my-10'>
                <div className='py-4 mx-auto'>
                <p className='text-sm font-normal text-center text-violet-600'>Explore citys</p>
                <h2 className='text-center text-2xl font-bold py-2 text-black'>Find Your Neighborhood</h2>
                </div>
                <div className='py-2 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    <Place />
                    <Place />
                    <Place />
                    <Place />
                </div>

            </div>
        </section>
    );
}

export default PlaceList;