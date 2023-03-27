import React from "react";
import { useParams } from "react-router-dom";
import SingleAgencies from "../components/SingleAgencies";
import { placeList } from "../data";
// import house1lg from "../assets/house1lg.jpg";

function AgentsDetails(props) {
  const { id } = useParams();
  const placeDetails = placeList.filter((place) => {
    return place.id === parseInt(id);
  });
  const p = placeDetails.map((place1) => {
    return (
      <div >
        <div>
          {place1.title}
        </div>
        <div>
          <SingleAgencies agen={place1.agencies} />
        </div>
      </div>
    );
  });

  // const tt = placeList.agencies[];
  // console.log(tt);

  // const ppp = p.map((p2,i)=>{

  //   for(let p in p2[i]){
  //     console.log(...p);
  //   }
  //   console.log(p2[i]);
  // })


  // const pp = p.map((agencis) => {
  //   // const { name, details, address } = agencis;
  //   return (

  //   );
  // });

  //   const agencies = placeDetails.agencies.m ((agents) => {
  //     const {name,address} = agents;
  //     return (

  //     );
  //   });

  return (
    <section>
      <div className='className="container mx-auto'>
        <div className="w-full flex justify-center items-center images">
          <div className="w-1/2 h-1/2 p-2 ">
            <h2 className="py-2 text-sm text-white font-bold text-center">
              Why choose us
            </h2>
            <div className="text-2xl text-center font-bold text-white py-2 tracking-wide">
              Our Agencies
            </div>
          </div>
        </div>

        <section className="container flex justify-between">
          <div className="w-full h-[300px] p-2   ">
            {p}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AgentsDetails;
