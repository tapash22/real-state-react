import React from "react";
import { useParams } from "react-router-dom";
import { placeList } from "../data";
// import house1lg from "../assets/house1lg.jpg";

function AgentsDetails(props) {
  const { id } = useParams();
  const placeDetails = placeList.filter((place) => {
    return place.id === parseInt(id);
  });
  const p = placeDetails.map((place1) => {
    const {agencies} = place1
    return agencies;
  });

  const pp = p.map((agencis) => {
    // const { name, details, address } = agencis;
    return (
      <div className="block border-2 border-sky-200 " >
        <div className="flex justify-center ">
          <img
            src={
              "https://png.pngtree.com/template/20191014/ourmid/pngtree-building-and-construction-logo-design-template-image_317780.jpg"
            }
            alt=""
            className="h-[150px]"
          />
        </div>
        <div>
          <h2 className="font-normal text-xl p-2 text-center underline text-violet-600">
            {agencis.id}
          </h2>
          <p className="font-extralight text-sm text-center text-violet-500">
            {agencis.address}
          </p>
          <p className="p-2 text-center text-sm font-thin text-violet-500">
            {/* {place.length} place and {project.length} project running */}
          </p>
        </div>
      </div>
    );
  });

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

        <section className="container">
          <div className="w-full p-2 grid grid-cols-1 lg:grid-cols-3 gap-2  ">
            {pp}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AgentsDetails;
