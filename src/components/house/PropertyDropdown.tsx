import { Menu } from "@headlessui/react";
import { useContext, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine, RiHome5Line } from "react-icons/ri";
import { HouseContext } from "../HouseContext";

type HouseContextType = {
  property: string;
  setProperty: (value: string) => void;
  properties: string[];
};

export function PropertyDropdown() {
  const context = useContext(HouseContext) as HouseContextType;
  const { property, setProperty, properties } = context;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Menu as="div" className="dropdown relative w-full">
      {/* BUTTON */}
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: "var(--text-heading)" }}
        className="dropdown-btn w-full text-left flex items-center justify-between py-2 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <RiHome5Line
            style={{ color: "var(--button-bg)" }}
            className="text-xl shrink-0"
          />

          <div className="text-left">
            <div className="text-[15px] font-bold tracking-wide whitespace-nowrap">
              {property}
            </div>
            <div
              style={{ color: "var(--text-paragraph)" }}
              className="text-[13px] md:hidden lg:block font-medium"
            >
              Select type
            </div>
          </div>
        </div>

        <div
          style={{ color: "var(--text-paragraph)" }}
          className="transition-transform duration-200"
        >
          {isOpen ? (
            <RiArrowUpSLine className="text-xl" />
          ) : (
            <RiArrowDownSLine className="text-xl" />
          )}
        </div>
      </Menu.Button>

      {/* DROPDOWN LIST */}
      <Menu.Items
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="dropdown-menu shadow-xl border rounded-xl mt-3 p-1.5 absolute w-full z-50 transition-colors duration-300 list-none"
      >
        {properties.map((item, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <li
                onClick={() => {
                  setProperty(item);
                  setIsOpen(false);
                }}
                style={{
                  backgroundColor: active
                    ? "rgba(20, 184, 166, 0.15)"
                    : "transparent",
                  color: active ? "var(--button-bg)" : "var(--text-heading)",
                }}
                className="cursor-pointer px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150"
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
