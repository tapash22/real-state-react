import { Menu } from "@headlessui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { RiArrowDownLine } from "react-icons/ri";

type DropdownProps = {
  selectedValue: string;
  onSelect: (value: string) => void;
  options: string[];
  label: string;
  Icon?: IconType;
  DropdrownIcon?: IconType;
  smallSize?: boolean;
  showValue?: boolean;
};

export function Dropdown({
  selectedValue,
  onSelect,
  options,
  label,
  Icon,
  DropdrownIcon = RiArrowDownLine,
  smallSize = false,
  showValue = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Menu
        as="div"
        className={`dropdown relative ${
          smallSize
            ? "w-fit border border-[var(--border)] shadow-sm shadow-[var(--primary)] rounded-full px-2 "
            : " w-full bg-[var(--bg)] "
        }`}
      >
        {/* TRIGGER BUTTON */}
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: "var(--text-heading)" }}
          className={`dropdown-btn text-left transition-colors duration-200 cursor-pointer ${
            smallSize
              ? "rounded-sm lg:rounded-full w-full h-fit border-none py-2 px-3 flex items-center justify-center gap-2 bg-transparent"
              : "border-l-2 w-full  h-auto border-[var(--primary)] rounded-sm lg:rounded-none py-2 px-3 flex items-center justify-between "
          }`}
        >
          <div
            className={`flex items-center space-x-2  ${
              smallSize ? "lg:space-x-2" : "lg:space-x-5"
            }  `}
          >
            {Icon && (
              <Icon
                style={{ color: "var(--muted)" }}
                className="shrink-0"
                size={24}
              />
            )}
            <div className="text-left space-y-0.5">
              {smallSize === false && (
                <p className="text-sm font-bold tracking-widest whitespace-nowrap">
                  {selectedValue}
                </p>
              )}
              <p
                style={{ color: "var(--text)" }}
                className="text-sm md:hidden lg:block font-medium tracking-wider whitespace-nowrap"
              >
                {showValue && selectedValue ? selectedValue : label}
              </p>
            </div>
          </div>
          <div
            style={{ color: "var(--text)" }}
            className={`transition-transform duration-200 ${smallSize ? "p-0" : "p-2"}`}
          >
            <DropdrownIcon
              size={smallSize ? 12 : 22}
              className={`transition-transform duration-300 text-[var(--text)] ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </Menu.Button>

        {/* DROPDOWN LIST */}
        <Menu.Items
          style={{ borderColor: "var(--border)" }}
          className={`dropdown-menu absolute top-[105%] left-0 w-fit max-h-[250px] overflow-y-auto scrollbar-thin shadow-xl border p-1.5 z-50 list-none divide-y divide-[var(--border)] rounded-md ${
            smallSize ? "bg-[var(--bg)]" : "bg-[var(--card)]"
          }`}
        >
          {options.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <li
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                  style={{
                    backgroundColor: active
                      ? "rgba(20, 184, 166, 0.10)"
                      : "transparent",
                  }}
                  className={`cursor-pointer transition-colors duration-150 whitespace-nowrap tracking-wider text-left rounded-sm ${
                    smallSize
                      ? "p-2 text-xs font-medium text-[var(--muted)]"
                      : "p-3 text-sm font-semibold text-[var(--text-heading)]"
                  }`}
                >
                  {item}
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </>
  );
}
