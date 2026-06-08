import { useContext } from "react";
import { RiHome5Line, RiMapPinLine, RiWallet3Line } from "react-icons/ri";
import { priceOptions } from "../../data";
import { Dropdown } from "../dropdown/Dropdown";
import { HouseContext } from "../HouseContext";

type SearchProps = {
  // add later if needed
};

type HouseContextType = {
  country: string;
  setCountry: (value: string) => void;
  countries: string[];
  property: string;
  setProperty: (value: string) => void;
  properties: string[];
  price: string;
  setPrice: (value: string) => void;
  handleClick: () => void;
};

export function Search(_props: SearchProps) {
  const context = useContext(HouseContext);

  if (!context) return null;

  const {
    country,
    setCountry,
    countries,
    property,
    setProperty,
    properties,
    price,
    setPrice,
    handleClick,
  } = context as HouseContextType;

  // const { handleClick } = context as HouseContextType;

  return (
    /* Outer accent container ring (adapts via a subtle opacity mask of your main teal) */
    <div className="p-5 bg-back/30 transition-all duration-300 z-20">
      <div
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg) 30%, transparent)",
        }}
        className="px-[30px] py-5 w-full  md:grid md:grid-cols-4 gap-0 items-center relative rounded-xl transition-colors duration-300 shadow-sm shadow-(--footer-bg) backdrop-blur-lg "
      >
        <Dropdown
          selectedValue={country}
          onSelect={setCountry}
          options={countries}
          label="Select your place"
          Icon={RiMapPinLine}
        />
        <Dropdown
          selectedValue={property}
          onSelect={setProperty}
          options={properties}
          label="Select type"
          Icon={RiHome5Line}
        />
        <Dropdown
          selectedValue={price}
          onSelect={setPrice}
          options={priceOptions}
          label="Choose your price"
          Icon={RiWallet3Line}
        />

        {/* Search Submission CTA */}
        <button
          onClick={handleClick}
          style={{ backgroundColor: "var(--button-bg)" }}
          className="w-full md:h-full py-3 md:py-0 rounded-r-lg px-5 text-(--text) font-semibold transition-opacity hover:opacity-100 shadow-sm tracking-widest cursor-pointer"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}
