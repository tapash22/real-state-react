import React from "react";
import { IconType } from "react-icons";
import { LuGrid2X2 } from "react-icons/lu";
import {
  TbAirConditioning,
  TbBed,
  TbCooker,
  TbDesk,
  TbDeviceTvOff,
  TbDisabledOff,
  TbFlame,
  TbHanger,
  TbHomeOff,
  TbLock,
  TbSofaOff,
  TbSparkles,
  TbToiletPaper,
  TbToolsKitchen2,
  TbTrees,
  TbWashMachine,
  TbWifi,
} from "react-icons/tb";

// --- Types ---
export interface FeatureItem {
  label: string;
  isAvailable: boolean;
  Icon: IconType;
}

export interface PropertyFeaturesProps {
  facilities?: FeatureItem[];
  amenities?: FeatureItem[];
}

// --- Default Props matching image ---
const DEFAULT_FACILITIES: FeatureItem[] = [
  { label: "Shared garden", isAvailable: true, Icon: TbTrees },
  { label: "Shared kitchen", isAvailable: true, Icon: TbCooker },
  { label: "Shared toilet", isAvailable: true, Icon: TbToiletPaper },
  { label: "Unisex bathroom", isAvailable: true, Icon: TbSparkles },
  { label: "No basement", isAvailable: false, Icon: TbHomeOff },
  { label: "No living room", isAvailable: false, Icon: TbSofaOff },
];

const DEFAULT_AMENITIES: FeatureItem[] = [
  { label: "Shared kitchenware", isAvailable: true, Icon: TbToolsKitchen2 },
  { label: "Central heating", isAvailable: true, Icon: TbFlame },
  { label: "Wood flooring", isAvailable: true, Icon: LuGrid2X2 },
  { label: "Bed", isAvailable: true, Icon: TbBed },
  { label: "Closet", isAvailable: true, Icon: TbHanger },
  { label: "Desk", isAvailable: true, Icon: TbDesk },
  { label: "Dishwasher", isAvailable: true, Icon: TbCooker },
  { label: "Bedroom lock", isAvailable: true, Icon: TbLock },
  { label: "Washing machine", isAvailable: true, Icon: TbWashMachine },
  { label: "WiFi", isAvailable: true, Icon: TbWifi },
  { label: "No air conditioning", isAvailable: false, Icon: TbAirConditioning },
  { label: "No dryer", isAvailable: false, Icon: TbWashMachine },
  { label: "No living room furniture", isAvailable: false, Icon: TbSofaOff },
  { label: "No tv", isAvailable: false, Icon: TbDeviceTvOff },
  { label: "Not access friendly", isAvailable: false, Icon: TbDisabledOff },
];

// --- Component ---
export const PropertyFeaturesCard: React.FC<PropertyFeaturesProps> = ({
  facilities = DEFAULT_FACILITIES,
  amenities = DEFAULT_AMENITIES,
}) => {
  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-sm text-[#0c2340] font-sans space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- FACILITIES COLUMN --- */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Facilities</h3>
          <ul className="space-y-3">
            {facilities.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                <item.Icon
                  size={20}
                  className={
                    item.isAvailable ? "text-slate-700" : "text-slate-400"
                  }
                />
                <span
                  className={
                    item.isAvailable
                      ? "text-slate-800 font-medium"
                      : "text-slate-400 line-through"
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- AMENITIES COLUMN --- */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Amenities</h3>
          <ul className="space-y-3">
            {amenities.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                <item.Icon
                  size={20}
                  className={
                    item.isAvailable ? "text-slate-700" : "text-slate-400"
                  }
                />
                <span
                  className={
                    item.isAvailable
                      ? "text-slate-800 font-medium"
                      : "text-slate-400 line-through"
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
