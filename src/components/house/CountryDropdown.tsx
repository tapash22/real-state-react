import { Menu } from "@headlessui/react";
import { useContext, useState } from "react";
import { RiArrowDownLine, RiArrowUpLine, RiMapPinLine } from "react-icons/ri";
import { HouseContext } from "../HouseContext";

// 1. Context type (IMPORTANT)
type HouseContextType = {
  country: string;
  setcountry: (value: string) => void;
  countries: string[];
};

export function CountryDropdown() {
  const context = useContext(HouseContext) as HouseContextType;
  const { country, setcountry, countries } = context;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Menu as="div" className="dropdown relative">
      {/* BUTTON */}
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-right flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <RiMapPinLine className="text-violet-600 text-xl" />

          <div className="text-left">
            <div className="text-[15px] font-medium">{country}</div>
            <div className="text-[13px] md:hidden lg:block">
              Select your place
            </div>
          </div>
        </div>

        {isOpen ? (
          <RiArrowUpLine className="text-xl" />
        ) : (
          <RiArrowDownLine className="text-xl" />
        )}
      </Menu.Button>

      {/* DROPDOWN LIST */}
      <Menu.Items className="dropdown-menu bg-white shadow-md rounded-md mt-2 p-2 absolute w-full z-50">
        {countries.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <li
                onClick={() => setcountry(item)}
                className={`cursor-pointer px-3 py-2 rounded-md transition ${
                  active ? "text-violet-700 bg-violet-50" : ""
                }`}
              >
                {item}
              </li>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
