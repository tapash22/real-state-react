import React from 'react';
import Partner from './Partner'
import logo from '../logo.svg';

function Partners(props) {
    const partners =[
        {
            id:1,
            image:logo
        },
        {
            id:2,
            image:logo
        },
        {
            id:3,
            image:logo
        },
        {
            id:4,
            image:logo
        },
        {
            id:5,
            image:logo
        },
        {
            id:6,
            image:logo
        },
    ]
    return (
        <section>
            <div className='container mx-auto my-10'>
                <div className='py-4 mx-auto'>
                <p className='text-sm font-normal text-center text-violet-600'>Our Partners</p>
                <h2 className='text-center text-2xl font-bold py-2 text-black'>Reliable Partner’s</h2>
                </div>
                <div className='py-2 mx-auto grid grid-cols-3 lg:grid-cols-6 gap-2'>
                    {
                        partners.map((partner)=>{
                            
                          return  <Partner key={partner.id} partner={partner} />
                        })
                    }
            
                </div>

            </div>
        </section>
    );
}

export default Partners;