import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import House from "./House";

function HomeList(props) {
  const { houses, isLoading } = useContext(HouseContext);

  if(isLoading){
    return (
        <ImSpinner2 className='mx-auto animate-spin text-violet-700 text-4xl mt-[200px]'/>
    )
  }

  if(houses.length <1){
    return <div className="text-center text-3xl text-gray-400 mt-48">Not found</div>
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto my-10">
        <div className=" grid grid-cols-2 md:grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {houses.map((house) => {
            return (
              <Link to={`/property/${house.id}`} key={house.id}>
                
                <House  house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeList;
