import { Menu } from "@headlessui/react";
import { useContext, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiWallet3Line,
} from "react-icons/ri";
import { HouseContext } from "../HouseContext";

// 1. Context type (IMPORTANT)
type HouseContextType = {
  price: string;
  setPrice: (value: string) => void;
};

type PriceOption = {
  value: string;
};

export function PriceDropdown() {
  const context = useContext(HouseContext) as HouseContextType;
  const { price, setPrice } = context;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const prices: PriceOption[] = [
    { value: "1000000-20000000" },
    { value: "3000000-40000000" },
    { value: "5000000-60000000" },
  ];

  return (
    <Menu as="div" className="dropdown relative">
      {/* BUTTON */}
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <RiWallet3Line className="text-violet-600 text-xl" />

          <div className="text-left">
            <div className="text-[15px] font-medium">{price}</div>
            <div className="text-[13px] md:hidden lg:block">
              Choose your price
            </div>
          </div>
        </div>

        {isOpen ? (
          <RiArrowUpSLine className="text-xl" />
        ) : (
          <RiArrowDownSLine className="text-xl" />
        )}
      </Menu.Button>

      {/* DROPDOWN LIST */}
      <Menu.Items className="dropdown-menu bg-white shadow-md rounded-md mt-2 p-2 absolute w-full z-50">
        {prices.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <li
                onClick={() => setPrice(item.value)}
                className={`cursor-pointer px-3 py-2 rounded-md transition ${
                  active ? "text-violet-700 bg-violet-50" : ""
                }`}
              >
                {item.value}
              </li>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
