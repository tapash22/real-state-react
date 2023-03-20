import React from "react";
import SingleAgent from "./SingleAgent";

function Agents(props) {
  return (
    <section>
      <div className="container mx-auto my-10 flex flex-col lg:flex-row gap-x-2">
        <div className="py-2 mx-auto w-full lg:w-1/4">
          <p className="text-sm font-normal text-start text-violet-600">
            Our Agents
          </p>
          <h2 className="text-start text-2xl font-bold py-2 text-black">
            Here Is Our Experts.
          </h2>
          <div className="flex justify-start">
            <p className="text-justify w-[250px] ">
              This is very beautiful house and it's south face view and use
              metarials are imported from italie. there have 4 room, 3 wash room
              and every room have 2 window with attach balcone.there have 4 room, 3 wash room
              and every room have 2 window with attach balcone
            </p>
          </div>
        </div>
        <div className="py-2 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 w-full lg:w-3/4">
          <SingleAgent />
          <SingleAgent />
          <SingleAgent />
        </div>
      </div>
    </section>
  );
}

export default Agents;
