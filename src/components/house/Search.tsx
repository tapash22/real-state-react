import { useContext } from "react";
import { HouseContext } from "../HouseContext";
import { CountryDropdown } from "./CountryDropdown";
import { PriceDropdown } from "./PriceDropdown";
import { PropertyDropdown } from "./PropertyDropdown";

type SearchProps = {
  // add later if needed
};

type HouseContextType = {
  handleClick: () => void;
};

export function Search(_props: SearchProps) {
  const context = useContext(HouseContext);

  if (!context) return null;

  const { handleClick } = context as HouseContextType;

  return (
    <div className="shadow-lg bg-violet-100 rounded-lg p-2 mx-16">
      <div className="px-[30px] py-3 max-w-[1170px] mx-auto md:grid md:grid-cols-4 gap-2 relative bg-white rounded-lg">
        <CountryDropdown />
        <PropertyDropdown />
        <PriceDropdown />

        <button
          onClick={handleClick}
          className="bg-violet-500 rounded-tr-lg rounded-br-lg px-6 text-white"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}
