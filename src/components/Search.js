import React, { useContext } from "react";
import CountryDropdown from "./CountryDropdown";
import { HouseContext } from "./HouseContext";
import PriceDropdown from "./PriceDropdown";
import PropertyDropdown from "./PropertyDropdown";

function Search(props) {
  const { handelClick } = useContext(HouseContext);
  return (
    <div className="shadow-1 bg-violet-500 rounded-lg p-3 mx-5">
      <div className="px-[30px] py-3 max-w-[1170] mx-auto grid grid-cols-4 justify-between gap-2 lg:gap-x-3 relative lg:top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg">
        <CountryDropdown />
        <PropertyDropdown />
        <PriceDropdown />
        <button onClick={()=>handelClick()} className="bg-violet-500 rounded-tr-lg rounded-br-lg px-6">
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
