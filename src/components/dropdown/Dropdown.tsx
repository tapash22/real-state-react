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
};

export function Dropdown({
  selectedValue,
  onSelect,
  options,
  label,
  Icon,
  DropdrownIcon = RiArrowDownLine,
  smallSize = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Menu
      as="div"
      className={`dropdown relative  ${smallSize ? "w-fit border border-[var(--border)] rounded-full" : "w-full border-l-2 border-[var(--border)] rounded-tl-sm rounded-bl-sm"}`}
    >
      {/* TRIGGER BUTTON */}
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: "var(--text-heading)" }}
        className={`dropdown-btn w-full  text-left transition-colors duration-200 cursor-pointer ${
          smallSize
            ? "round-full h-fit  border-none py-2 px-5 flex items-center justify-center gap-2 bg-transparent "
            : "border-l-2 h-auto border-[var(--border)] rounded-tl-sm rounded-bl-sm py-2 px-5 flex items-center justify-between gap-5 hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        <div className="flex justify-start items-center ">
          {Icon && (
            <Icon
              style={{ color: "var(--button-bg)" }}
              className=" shrink-0"
              size={30}
            />
          )}
          <div className="text-left space-y-1">
            {smallSize === false && (
              <p className="text-sm font-bold tracking-widest whitespace-nowrap ">
                {selectedValue}
              </p>
            )}

            <p
              style={{ color: "var(--text-paragraph)" }}
              className="text-[13px] md:hidden lg:block font-medium whitespace-nowrap text-center"
            >
              {label}
            </p>
          </div>
        </div>
        <div
          style={{ color: "var(--text-paragraph)" }}
          className={`transition-transform duration-200 ${smallSize ? "p-0" : "p-2"}`}
        >
          <DropdrownIcon
            size={smallSize ? 12 : 22}
            className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"} ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </Menu.Button>

      {/* DROPDOWN LIST WITH YOUR SCROLLBAR UTILITIES */}
      <Menu.Items
        style={{
          borderColor: "var(--border)",
        }}
        className={`dropdown-menu absolute top-full left-0  min-w-[100px] w-full max-h-[250px] overflow-y-auto scrollbar-thin shadow-xl border  p-1.5 z-50 list-none divide-y divide-[var(--border)] ${smallSize ? "bg-white" : "bg-[var(--car)]"}`}
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
                className={`cursor-pointer transition-colors duration-150 whitespace-nowrap tracking-wider text-center  ${smallSize ? "p-1 text-xs font-medium  text-[var(--muted)]" : "p-3  text-sm font-semibold text-[var(--text-heading)]"}`}
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
