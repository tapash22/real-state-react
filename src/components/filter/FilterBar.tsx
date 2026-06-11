import { FaChevronDown, FaRegBell } from "react-icons/fa";
import { LuSlidersHorizontal } from "react-icons/lu";

interface FilterBarProps {
  // Current local filter values from parent
  activeTab: string;
  setActiveTab: (tab: string) => void;
  localPrice: string;
  setLocalPrice: (price: string) => void;
  localProperty: string;
  setLocalProperty: (type: string) => void;
}

export function FilterBar({
  activeTab,
  setActiveTab,
  localPrice,
  setLocalPrice,
  localProperty,
  setLocalProperty,
}: FilterBarProps) {
  const tabs = ["Anyone", "Students", "Professionals", "Families"];

  return (
    <div className="w-full bg-white px-6 py-3 font-sans select-none border-b border-gray-100 z-20 shadow-sm">
      {/* Upper Section: Actions & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        {/* Left Side Filters */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
          <button className="flex items-center rounded-full border border-sky-100 bg-sky-50 px-4 py-2 font-medium text-sky-900 transition-colors hover:bg-sky-100/80">
            7 Jul – 20 Aug 2026 (± 2 weeks)
          </button>

          {/* Local Price Filter Button */}
          <button
            onClick={() =>
              setLocalPrice(
                localPrice === "All Prices" ? "300-600" : "All Prices",
              )
            }
            className={`flex items-center rounded-full border px-4 py-2 transition-colors ${
              localPrice !== "All Prices"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            {localPrice !== "All Prices" ? `Budget: ${localPrice}` : "Price"}
            <FaChevronDown className="ms-1.5 h-3 w-3 text-gray-400" />
          </button>

          {/* Local Property Type Filter Button */}
          <button
            onClick={() =>
              setLocalProperty(
                localProperty === "All Types" ? "Apartment" : "All Types",
              )
            }
            className={`flex items-center rounded-full border px-4 py-2 transition-colors ${
              localProperty !== "All Types"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            {localProperty !== "All Types" ? localProperty : "Property type"}
            <FaChevronDown className="ms-1.5 h-3 w-3 text-gray-400" />
          </button>

          {/* Neighborhoods Display */}
          <button className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 transition-colors hover:border-gray-400">
            Neighborhoods
            <FaChevronDown className="ms-1.5 h-3 w-3 text-gray-400" />
          </button>

          <button className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 transition-colors hover:border-gray-400">
            <LuSlidersHorizontal className="me-1.5 h-4 w-4 text-gray-600" />
            All filters
            <span className="ms-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
              {(activeTab !== "Anyone" ? 1 : 0) +
                (localPrice !== "All Prices" ? 1 : 0) +
                (localProperty !== "All Types" ? 1 : 0)}
            </span>
          </button>
        </div>

        {/* Right Side Alerts */}
        <div className="flex items-center gap-4">
          <div className="hidden h-6 w-px bg-gray-200 sm:block" />
          <button className="flex items-center gap-2 rounded-full bg-[#022329] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#05353e]">
            <FaRegBell className="h-4 w-4" />
            Get alerts
          </button>
        </div>
      </div>

      {/* Lower Demographic Sub-Tabs */}
      <div className="flex items-center gap-6 text-sm font-medium border-t border-gray-100 pt-2.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 transition-colors ${
                isActive
                  ? "font-semibold text-gray-950"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-gray-950" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
