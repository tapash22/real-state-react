import React, { useContext, useState } from "react";
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { HouseContext } from "./HouseContext";

const PropertyDropdown = () => {
  const { property, setProperty, properties } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiHome5Line className="dropdown-icon-primary">
          {isOpen ? (
            <RiArrowUpSLine className="dropdown-icon-primary"></RiArrowUpSLine>
          ) : (
            <RiArrowDownSLine className="dropdown-icon-primary"></RiArrowDownSLine>
          )}
        </RiHome5Line>
        <div>
          <div className="text-[15px] font-medium">{property}</div>
          <div className="text-[13px] md:hidden lg:block">Select your place</div>
        </div>
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {properties.map((property, index) => {
          return (
            <Menu.Item
              as="li"
              onClick={() => setProperty(property)}
              className="cursor-pointer hover:text-violet-700 transition"
              key={index}
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
