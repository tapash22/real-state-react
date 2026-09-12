import { Menu } from "@headlessui/react";
import type { IconType } from "react-icons";
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
  /*
   * IMPORTANT
   *
   * We do NOT need our own isOpen state here.
   *
   * Headless UI <Menu> already manages:
   *
   * open
   * close
   * keyboard navigation
   * outside click
   * Escape key
   * accessibility
   *
   * We can get "open" directly from:
   *
   * {({ open }) => (...)}
   */

  return (
    <Menu
      as="div"
      className={`
        dropdown
        relative

        ${
          smallSize
            ? `
              w-fit
              rounded-full
              border
              border-[var(--border)]
              px-2
              shadow-sm
              shadow-[var(--primary)]
            `
            : `
              w-full
              bg-[var(--bg)]
            `
        }
      `}
    >
      {({ open }) => (
        <>
          {/* TRIGGER BUTTON */}
          <Menu.Button
            type="button"
            style={{
              color: "var(--text-heading)",
            }}
            className={`
              dropdown-btn
              cursor-pointer
              text-left
              transition-colors
              duration-200

              ${
                smallSize
                  ? `
                    flex
                    h-fit
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-sm
                    border-none
                    bg-transparent
                    px-3
                    py-2
                    lg:rounded-full
                  `
                  : `
                    flex
                    h-auto
                    w-full
                    items-center
                    justify-between
                    rounded-sm
                    border-l-2
                    border-[var(--primary)]
                    px-3
                    py-2
                    lg:rounded-none
                  `
              }
            `}
          >
            {/* LEFT SIDE */}
            <div
              className={`
                flex
                items-center
                ${smallSize ? "space-x-2" : "space-x-2 lg:space-x-5"}
              `}
            >
              {/* MAIN ICON */}
              {Icon && (
                <Icon
                  style={{
                    color: "var(--muted)",
                  }}
                  className="shrink-0"
                  size={24}
                />
              )}

              {/* TEXT */}
              <div className="space-y-0.5 text-left">
                {/*
                 * Desktop selected value
                 *
                 * Only visible when smallSize = false.
                 */}
                {!smallSize && (
                  <p
                    className="
                      whitespace-nowrap
                      text-sm
                      font-bold
                      tracking-widest
                    "
                  >
                    {selectedValue}
                  </p>
                )}

                {/*
                 * Label / selected value
                 *
                 * On mobile:
                 *
                 * md:hidden
                 *
                 * On large screens:
                 *
                 * lg:block
                 */}
                <p
                  style={{
                    color: "var(--text)",
                  }}
                  className="
                    whitespace-nowrap
                    text-sm
                    font-medium
                    tracking-wider
                    md:hidden
                    lg:block
                  "
                >
                  {showValue && selectedValue ? selectedValue : label}
                </p>
              </div>
            </div>

            {/* ARROW  */}
            <div
              style={{
                color: "var(--text)",
              }}
              className={`
                transition-transform
                duration-200

                ${smallSize ? "p-0" : "p-2"}
              `}
            >
              <DropdrownIcon
                size={smallSize ? 12 : 22}
                className={`
                  text-[var(--text)]
                  transition-transform
                  duration-300

                  ${open ? "rotate-180" : "rotate-0"}
                `}
              />
            </div>
          </Menu.Button>

          {/*  DROPDOWN LIST */}
          <Menu.Items
            style={{
              borderColor: "var(--border)",
            }}
            className={`
              dropdown-menu
              absolute
              left-0
              top-full
              z-[9999]
              max-h-[250px]
              min-w-full
              w-max
              overflow-y-auto
              rounded-md
              border
              p-1.5
              shadow-2xl
              scrollbar-thin

              divide-y
              divide-[var(--border)]

              ${smallSize ? "bg-[var(--bg)]" : "bg-[var(--card)]"}
            `}
          >
            {options.map((item) => (
              <Menu.Item key={item}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(item);
                    }}
                    style={{
                      backgroundColor: active
                        ? "rgba(20, 184, 166, 0.10)"
                        : "transparent",
                    }}
                    className={`
                      block
                      w-full
                      cursor-pointer
                      rounded-sm
                      text-left
                      whitespace-nowrap
                      tracking-wider
                      transition-colors
                      duration-150

                      ${
                        smallSize
                          ? `
                            p-2
                            text-xs
                            font-medium
                            text-[var(--muted)]
                          `
                          : `
                            p-3
                            text-sm
                            font-semibold
                            text-[var(--text-heading)]
                          `
                      }
                    `}
                  >
                    {item}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}
