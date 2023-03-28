import React from 'react';
import Agencies from './Agencies';

function SingleAgencies(props) {
    let singlePlace = props.agen;

    const arr =[];
    
    return (
        <div className='w-full'>
            <div className='p-4 rounded-lg border-2 hidden'>
                {
                   singlePlace.map((single)=>{
                   return arr.push(single);
                }
            )}
            </div>
            <div className='grid grid-cols-3 gap-4 h-[400px]'>
                {
                    arr.map((ar)=>{
                        return (
                            <Agencies ar={ar} key={ar.id} />
                        )
                    })
                }
            </div>
        </div>
        
    );
}

export default SingleAgencies;