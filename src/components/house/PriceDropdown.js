import React, { useContext, useState } from "react";
import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { HouseContext } from "../HouseContext";

const PriceDropdown = () => {
  const { price, setPrice } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  const prices = [
    {
      value: "1000000-20000000",
    },
    {
      value: "3000000-40000000",
    },
    {
      value: "5000000-60000000",
    },
  ];

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiWallet3Line className="dropdown-icon-primary">
          {isOpen ? (
            <RiArrowUpSLine className="dropdown-icon-primary"></RiArrowUpSLine>
          ) : (
            <RiArrowDownSLine className="dropdown-icon-primary"></RiArrowDownSLine>
          )}
        </RiWallet3Line>
        <div>
          <div className="text-[15px] font-medium">{price}</div>
          <div className="text-[13px] md:hidden lg:block">choose your price</div>
        </div>
      </Menu.Button>

      <Menu.Items className="dropdown-menu">
        {prices.map((price, index) => {
          return (
            <Menu.Item
              as="li"
              onClick={() => setPrice(price.value)}
              className="cursor-pointer hover:text-violet-700 transition"
              key={index}
            >
              {price.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceDropdown;
