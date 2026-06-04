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
    /* Outer accent container ring (adapts via a subtle opacity mask of your main teal) */
    <div className=" p-10 mx-4  bg-transparent transition-all duration-300">
      <div
        style={{
          backgroundColor: "rgba(20, 184, 166, 0.09)",
          borderColor: "var(--border)",
        }}
        className="px-[30px] py-5 max-w-[1170px] mx-auto md:grid md:grid-cols-4 gap-4 items-center relative border rounded-xl transition-colors duration-300 shadow-xl  backdrop-blur-sm"
      >
        <CountryDropdown />
        <PropertyDropdown />
        <PriceDropdown />

        {/* Search Submission CTA */}
        <button
          onClick={handleClick}
          style={{ backgroundColor: "var(--button-bg)" }}
          className="w-full md:h-full py-3 md:py-0 rounded-lg px-6 text-white font-semibold transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}
