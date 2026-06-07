import { Menu } from "@headlessui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

type DropdownProps = {
  selectedValue: string;
  onSelect: (value: string) => void;
  options: string[];
  label: string;
  Icon: IconType;
};

export function Dropdown({
  selectedValue,
  onSelect,
  options,
  label,
  Icon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Menu as="div" className="dropdown relative w-full">
      {/* DROPDOWN TRIGGER BUTTON */}
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: "var(--text-heading)" }}
        className="dropdown-btn w-full text-left flex items-center justify-between py-2 px-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Icon
            style={{ color: "var(--button-bg)" }}
            className="text-xl shrink-0"
          />

          <div className="text-left">
            <div className="text-[15px] font-bold tracking-wide whitespace-nowrap">
              {selectedValue}
            </div>
            <div
              style={{ color: "var(--text-paragraph)" }}
              className="text-[13px] md:hidden lg:block font-medium whitespace-nowrap"
            >
              {label}
            </div>
          </div>
        </div>

        <div
          style={{ color: "var(--text-paragraph)" }}
          className="transition-transform duration-200"
        >
          {isOpen ? (
            <RiArrowUpLine className="text-xl" />
          ) : (
            <RiArrowDownLine className="text-xl" />
          )}
        </div>
      </Menu.Button>

      {/* FLOATING OVERLAY DROPDOWN LIST */}
      <Menu.Items
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="dropdown-menu absolute top-full left-0 mt-2 min-w-[200px] w-full shadow-xl border rounded-xl p-1.5 z-50 transition-colors duration-300 list-none whitespace-nowrap divide-y divide-[var(--border)]"
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
                    ? "rgba(20, 184, 166, 0.15)"
                    : "transparent",
                  color: active ? "var(--button-bg)" : "var(--text-heading)",
                }}
                className="cursor-pointer px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 whitespace-nowrap"
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
