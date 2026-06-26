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
    <div className="w-full bg-[var(--bg)] p-2 md:p-5 font-sans select-none md:shadow-sm">
      {/* Upper Section: Actions & Filters */}
      <div className="flex flex-col lg:flex-row  lg:items-start justify-between gap-4 ">
        {/* Filter Interactive Elements Area */}
        <div className="flex flex-col md:items-center justify-start space-y-5 text-sm text-[var(--text)] w-full ">
          <div className="hidden md:flex justify-between items-center gap-4 w-full">
            <p className="text-sm font-semibold tracking-wider text-[var(--text)]">
              <span>Selected :</span>{" "}
              <span className="text-[var(--muted)]">{activeTab}</span>
            </p>

            {/* <div className="h-6 w-px bg- dark:bg-zinc-800" /> */}
            <button className="flex items-center gap-2 rounded-full bg-[#022329] dark:bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#05353e] dark:hover:bg-emerald-700">
              <FaRegBell className="h-4 w-4" />
              Get alerts
            </button>
          </div>

          {/* Price Range Dropdown Wrapper */}
          <div className="w-full ">
            <Dropdown
              selectedValue={localPrice}
              onSelect={setLocalPrice}
              options={priceList}
              label="Price Range"
              DropdrownIcon={FaChevronDown}
              smallSize={true}
              showValue={true}
            />
          </div>

          {/* Property Type Dropdown Wrapper */}
          <div className="w-full md:w-auto">
            <Dropdown
              selectedValue={localProperty}
              onSelect={setLocalProperty}
              options={propertyList}
              label="Property Type"
              DropdrownIcon={FaChevronDown}
              smallSize={true}
              showValue={true}
            />
          </div>

          {/* Neighborhoods Display */}
          <button className="w-full md:w-auto flex items-center justify-between md:justify-center rounded-full border border-gray-300 dark:border-zinc-700 bg-transparent dark:bg-zinc-800 px-4 py-2.5 md:py-2 transition-colors hover:border-gray-400">
            <span>Neighborhoods</span>
            <FaChevronDown className="ms-1.5 h-3 w-3 text-gray-400" />
          </button>
        </div>

        {/* Right Side Alerts: Hidden inside drawer/dialog view, visible on desktop navbar rows */}
      </div>
    </div>
  );
}
