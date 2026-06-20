import { FaChevronDown, FaRegBell } from "react-icons/fa";
import { LuSlidersHorizontal } from "react-icons/lu";
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
    <div className="w-full bg-white dark:bg-transparent p-2 md:p-5 font-sans select-none md:border-b border-gray-100 dark:border-zinc-800 z-50 md:shadow-sm">
      {/* Upper Section: Actions & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3">
        {/* Filter Interactive Elements Area */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 text-sm text-gray-700 dark:text-zinc-300">
          {/* Date Picker Button */}
          <button className="w-full md:w-auto text-left md:text-center flex items-center justify-between md:justify-center rounded-full border border-sky-100 bg-sky-50 px-4 py-2.5 md:py-2 font-medium text-sky-900 transition-colors hover:bg-sky-100/80">
            <span>7 Jul – 20 Aug 2026 (± 2 weeks)</span>
          </button>

          {/* Price Range Dropdown Wrapper */}
          <div className="w-full md:w-auto">
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
          <div className="w-full md:w-48">
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
          <button className="w-full md:w-auto flex items-center justify-between md:justify-center rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 md:py-2 transition-colors hover:border-gray-400">
            <span>Neighborhoods</span>
            <FaChevronDown className="ms-1.5 h-3 w-3 text-gray-400" />
          </button>

          {/* Active Counters Wrapper Pill */}
          <button className="w-full md:w-auto flex items-center justify-between md:justify-center rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 md:py-2 transition-colors hover:border-gray-400">
            <div className="flex items-center">
              <LuSlidersHorizontal className="me-1.5 h-4 w-4 text-gray-600 dark:text-zinc-400" />
              <span>All filters</span>
            </div>
            <span className="ms-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 dark:bg-zinc-100 text-[10px] font-bold text-white dark:text-zinc-900">
              {(activeTab !== "Anyone" ? 1 : 0) +
                (localPrice !== "All Prices" ? 1 : 0) +
                (localProperty !== "All Types" ? 1 : 0)}
            </span>
          </button>
        </div>

        {/* Right Side Alerts: Hidden inside drawer/dialog view, visible on desktop navbar rows */}
        <div className="hidden md:flex items-center gap-4">
          <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800" />
          <button className="flex items-center gap-2 rounded-full bg-[#022329] dark:bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#05353e] dark:hover:bg-emerald-700">
            <FaRegBell className="h-4 w-4" />
            Get alerts
          </button>
        </div>
      </div>
    </div>
  );
}
