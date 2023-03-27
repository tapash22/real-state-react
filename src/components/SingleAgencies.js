import React from 'react';

function SingleAgencies(props) {
    let singlePlace = props.agen;
    console.log(singlePlace);
    return (
        <div className=''>
            <div className='p-4 rounded-lg border-2'>
                {
                   singlePlace.map((single)=>{
                    return (
                        <div>
                            {single.name}
                        </div>
                    )
                   })
                }
                {/* {props.agen.name}
                {props.agen.details}
                {props.agen.address} */}
            </div>
        </div>
        
    );
}

export default SingleAgencies;