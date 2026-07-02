import { FaChevronDown, FaRegBell } from "react-icons/fa";
import { Dropdown } from "../dropdown/Dropdown";

interface FilterBarProps {
  // Current local filter values from parent
  activeTab: string;
  setActiveTab: (tab: string) => void;
  localPrice: string;
  setLocalPrice: (price: string) => void;
  localProperty: string;
  setLocalProperty: (type: string) => void;
  priceList: string[];
  propertyList: string[];
}

export function FilterBar({
  activeTab,
  setActiveTab,
  localPrice,
  setLocalPrice,
  localProperty,
  setLocalProperty,
  priceList,
  propertyList,
}: FilterBarProps) {
  // const tabs = ["Anyone", "Students", "Professionals", "Families"];

  return (
    <div className="w-full h-full lg:h-full  bg-[var(--bg)] p-2 md:p-5 font-sans select-none md:shadow-sm ">
      {/* Upper Section: Actions & Filters */}
      <div className="flex flex-col lg:flex-row  lg:items-start justify-between gap-4 ">
        {/* Filter Interactive Elements Area */}
        <div className="flex flex-col md:items-center justify-start space-y-5 text-sm text-[var(--text)] w-full h-full">
          <div className="hidden md:flex justify-between items-center gap-4 w-full">
            <p className="text-sm font-semibold tracking-wider text-[var(--text)]">
              <span>Selected Tabs :</span>{" "}
              <span className="text-[var(--muted)]">{activeTab}</span>
            </p>

            {/* <div className="h-6 w-px bg- dark:bg-zinc-800" /> */}
            <button className="transition-colors duration-200 cursor-pointer border border-[var(--border)] shadow-sm shadow-[var(--primary)] rounded-lg py-2 px-3 flex items-center justify-between w-auto gap-2">
              <FaRegBell size={16} className="text-[var(--primary)]" />
              <span className="text-sm font-normal tracking-wide text-[var(--text)]">
                Get alerts
              </span>
            </button>
          </div>

          <div className="w-full flex flex-col justify-start space-y-5 ">
            {/* Price Range Dropdown Wrapper */}
            <Dropdown
              selectedValue={localPrice}
              onSelect={setLocalPrice}
              options={priceList}
              label="Price Range"
              DropdrownIcon={FaChevronDown}
              smallSize={true}
              showValue={true}
            />
            {/* Price Range Dropdown Wrapper end*/}

            {/* Property Type Dropdown Wrapper */}

            <Dropdown
              selectedValue={localProperty}
              onSelect={setLocalProperty}
              options={propertyList}
              label="Property Type"
              DropdrownIcon={FaChevronDown}
              smallSize={true}
              showValue={true}
            />
            {/* Property Type Dropdown Wrapper end */}
          </div>
        </div>

        {/* Right Side Alerts: Hidden inside drawer/dialog view, visible on desktop navbar rows */}
      </div>
    </div>
  );
}
