import { useContext, useState } from "react";
import { RiHome5Line, RiMapPinLine, RiWallet3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
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
  // handleClick: () => void;
};

export function Search(_props: SearchProps) {
  const context = useContext(HouseContext);
  const [show, setShow] = useState(false);

  // Initialize navigate hook
  const navigate = useNavigate();

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
    // handleClick,
  } = context as HouseContextType;

  //  Wrap handler to combine context filter updates and path redirecting
  const handleSearchSubmit = () => {
    const hasSearchValue =
      !!country.trim() || !!property.trim() || !!price.trim();
    console.log(hasSearchValue);
    if (!hasSearchValue) {
      setShow(true);
      return;
    }

    setShow(false);
    navigate("/search");
  };

  return (
    /* Outer accent container ring (adapts via a subtle opacity mask of your main teal) */
    <div className="p-0 lg:p-5 transition-all duration-300 z-20  rounded-lg  ">
      <div className="p-2 lg:p-5 w-full grid grid-cols-1 lg:grid-cols-4 rounded-xl transition-colors duration-300 backdrop-blur-lg border-none lg:border lg:border-[var(--border)] shadow-none lg:shadow-md lg:shadow-[var(--primary)] space-y-1 lg:-space-y-0 ">
        {/* <div></div> */}
        <Dropdown
          selectedValue={country}
          // showValue={true}
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
        <div className="w-full h-auto flex justify-center mr-5 bg-white">
          <button
            onClick={handleSearchSubmit}
            style={{ backgroundColor: "var(--bg)" }}
            className="w-full lg:h-full py-3 lg:py-0 rounded-sm lg:rounded-l-none lg:rounded-r-lg  text-(--text) font-semibold transition-opacity hover:opacity-100 tracking-widest cursor-pointer shadow-sm shadow-[var(--primary)]"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
      {show && (
        <div className="w-full h-auto flex justify-center items-center p-2 ">
          <p className="flex py-1 text-xs lg:text-sm font-light lg:font-semibold tracking-wider text-red-600 text-center">
            At least one search field must be filled in to perform a search.
          </p>
        </div>
      )}
    </div>
  );
}
