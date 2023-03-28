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
    return place1;

  });

  return (
    <section>
      <div className='className="container mx-auto'>
        <div className="w-full flex justify-center items-center images">
          <div className="w-1/2 h-1/4 p-2 ">
            <h2 className="py-2 text-sm text-black font-bold text-center ">
              Why choose us
            </h2>
            <div className="text-2xl text-center font-bold text-black py-2 tracking-wide">
              Our Agencies
            </div>
          </div>
        </div>

        <section className="container flex justify-between">
          <div className="w-full h-[400px] py-10   ">
            {p.map((pp)=>{
              return (
                <SingleAgencies agen={pp.agencies} />
              )
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AgentsDetails;
