import React from 'react';

function Agencies(props) {
    const {name,details,image,address,place,project} = props.ar;
    return (
        <div className=''>
            <div className='block border-violet-500 border-2 rounded-lg py-2'>
                <div className='flex justify-center'>
                    <img src={image} alt='building' className='w-[100px] h-[100px]' />
                </div>
                <div className='grid grid-cols-1 grid-rows-3 gap-1'>
                    <div className='text-xl font-semibold p-2 text-center text-violet-500'>{name}</div>
                    <div className='text-sm font-normal mb-1 text-center underline'>{address}</div>
                    <div className='text-lg font-medium text-violet-600'>THere have {place.length} place and {project.length} project</div>
                </div>
                <div className='flex justify-center p-2 bg-violet-200'>
                    <button className='uppercase text-sm font-semibold tracking-wide p-2 rounded-lg border-2 border-violet-400 bg-white'>view</button>
                </div>

            </div>
        </div>
    );
}

export default Agencies;