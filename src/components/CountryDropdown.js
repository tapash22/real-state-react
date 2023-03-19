import React, { useContext, useState } from "react";
import { RiMapPinLine, RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";

const CountryDropdown = () => {
  const { country, setcountry, countries } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-right"
      >
        <RiMapPinLine className="dropdown-icon-primary">
          {isOpen ? (
            <RiArrowUpLine className="dropdown-icon-primary"></RiArrowUpLine>
          ) : (
            <RiArrowDownLine className="dropdown-icon-primary"></RiArrowDownLine>
          )}
        </RiMapPinLine>
        <div>
          <div className="text-[15px] font-medium">{country}</div>
          <div className="text-[13px] md:hidden lg:block">Select your place</div>
        </div>
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {countries.map((country, index) => {
          return (
            <Menu.Item
              as="li"
              onClick={() => setcountry(country)}
              className="cursor-pointer hover:text-violet-700 transition"
              key={index}
            >
              {country}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
