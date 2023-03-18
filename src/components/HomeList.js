import React, { useContext } from "react";
import { HouseContext } from "./HouseContext";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/ri";
import House from "./House";

function HomeList(props) {
  const { houses, isLoading } = useContext(HouseContext);
  console.log(houses);

  return (
    <section className="mb-20">
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-4 gap-2">
          {houses.map((house, index) => {
            return (
              <Link to={`/property/${house.id}`}>
                
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
