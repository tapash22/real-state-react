import React from 'react';


function Partner(props) {
    return (
        <div>
            <div className='p-2 '>
                <div className='border-2  rounded-full w-32 h-32 flex justify-center '>
                <img src={props.partner.image} alt='' className='w-32 h-32 rounded-full bg-violet-900' />
                </div>   
            </div>
        </div>
    );
}

export default Partner;