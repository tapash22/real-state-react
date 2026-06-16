import { useContext, useState } from "react";
import { BiArea, BiBath, BiBed, BiStar } from "react-icons/bi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiShieldStarFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

import {
  CalendarInputPicker,
  PickerRawData,
} from "../calendar/CalendarInputPicker";
import { HouseContext } from "../HouseContext";
import { SlidingToggle } from "../toggle/SlidingToggle";
import { PropertySlider } from "./PropertySlider";
import ResidenceDetails from "./ResidenceDetails";

// Type configuration for expected route parameters
type RouteParams = {
  id: string;
};

type HouseContextType = {
  houses: any[]; // Using your data signature structure
  isLoading: boolean;
};

type DateMode = "month" | "exact";

export default function PropertyDetails() {
  const { id } = useParams<RouteParams>();
  const context = useContext(HouseContext);

  // 1. Manage current toggle mode state
  const [dateMode, setDateMode] = useState<DateMode>("exact");

  // State logs for displaying choice status details cleanly to the screen
  const [displayString, setDisplayString] = useState<string>("");
  const [rawOutput, setRawOutput] = useState<string>("{}");

  const handleToggleChange = (val: DateMode) => {
    setDateMode(val);
    setDisplayString(""); // Reset to empty string whenever toggle mode shifts
    setRawOutput("{}"); // Reset raw output string payload
  };

  // Mocking all data retrieved from the image layout
  const residenceData = {
    title: "Micampus Wynwood Sancha",
    tenantCount: 36,
    cleaningInfo:
      "Cleaning room, change of sheets and towel included in the price. It is fortnightly",
    promotions: [
      {
        title: "PROMO FLASH SUMMER valid only for HousingAnywhere tenants",
        bulletPoints: [
          "NO ADMINISTRATION FEE and SPECIAL PRICE with maximum move out date August 2026.",
          "For longer stays, contact us!",
        ],
      },
      {
        title:
          "PROMO EARLY BOOKING COURSE 26/27 only for HousingAnywhere tenants",
        description:
          "50% DISCOUNT on the admin fee, applied to the second month of your rent.",
        bulletPoints: [
          "Example admin fee 250€:",
          "1- You will pay the full administration fee of 250€.",
          "2- When you pay the...",
        ],
      },
    ],
    highlights: [
      {
        title: "Entertainment room",
        description:
          "Relax and socialize in our communal lounge, featuring games and movie nights.",
        image:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=60", // Placeholder
      },
      {
        title: "Gym",
        description:
          "Stay active with an on-site fitness center, equipped for all your workout needs.",
        image:
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60", // Placeholder
      },
      {
        title: "Dining area",
        description: "Share meals and stories in a spacious dining hall.",
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=60", // Placeholder
      },
      {
        title: "Laundry room",
        description:
          "Do laundry quickly and conveniently with modern washers and dryers.",
        image:
          "https://images.unsplash.com/photo-1545173168-9f1947e8015e?w=400&auto=format&fit=crop&q=60", // Placeholder
      },
    ],
    services: {
      general: ["Cleaning in common areas", "Cleaning in private areas"],
    },
  };

  // Matches child signature requirements perfectly (2 input arguments)
  const handlePickerChange = (
    formattedValue: string,
    rawData: PickerRawData,
  ) => {
    setDisplayString(formattedValue);
    setRawOutput(JSON.stringify(rawData, null, 2));
  };

  if (!context) return null;

  const { houses, isLoading } = context as HouseContextType;

  if (isLoading) {
    return (
      <div className="p-16 text-center font-medium text-gray-500">
        Loading details...
      </div>
    );
  }

  const houseData = houses.find((house) => house.id === Number(id));

  if (!houseData) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center text-red-500 font-medium">
        Error: Property listing location could not be located. (ID: {id})
      </div>
    );
  }

  // --- GENERATE 10 IMAGE ASSETS FOR THE GALLERY ---
  // We collect your primary core images and fill out the rest using matching high-end interior URLs
  const baseImages = [houseData.imageLg, houseData.image].filter(Boolean); // Keeps only valid imported files

  const premiumPlaceholders = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80", // Living room
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80", // Kitchen
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80", // Modern Dining
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80", // Bedroom view
    "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80", // Lounge
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80", // Clean Kitchen Area
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80", // Luxury Bathroom
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", // Balcony/Light room
  ];

  // Combine them to make a rich array containing 10 pictures
  const propertyImages = [...baseImages, ...premiumPlaceholders].slice(0, 10);

  return (
    <div className=" w-full px-5 py-3 lg:px-24">
      <nav className="text-xs font-medium tracking-wider text-[var(--muted)] py-4">
        {houseData.country} &gt; {houseData.address}
      </nav>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
        {/* LEFT COLUMN: Scrollable Info Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Reusable GSAP slider receiving dynamic item images */}
          <PropertySlider images={propertyImages} />

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {houseData.name}
            </h1>
            <p className="text-sm text-gray-500 font-mono tracking-wide">
              {houseData.address}
            </p>

            <div className="text-2xl font-bold text-[var(--text)] ">
              $ {Number(houseData.price).toLocaleString()}
            </div>

            <div
              style={{
                color: "var(--text-paragraph)",
                borderColor: "var(--border)",
              }}
              className="p-5 border-t-2 border-b-2 border-[var(--border)] flex flex-row space-x-5 text-xs font-bold transition-all duration-300   "
            >
              <div className="flex items-center gap-1 lg:gap-2">
                <BiBed className="text-sm lg:text-lg opacity-80" />
                <span className="text-xs font-semibold tracking-wide">
                  {houseData.bedroom} Beds
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BiBath className="text-sm lg:text-lg opacity-80 " />
                <span className="text-xs font-semibold tracking-wide">
                  {houseData.bathroom} Baths
                </span>
              </div>
              <div className="flex items-center gap-2 ">
                <BiArea className="text-sm lg:text-lg opacity-80" />
                <span className="text-xs font-semibold tracking-wide">
                  {/* {surface} */}
                  {houseData.year}
                </span>
              </div>
            </div>

            <div className="py-2">
              <h3 className="font-semibold text-lg text-[var(--text)]  space-y-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed capitalize">
                {houseData.description}
              </p>
            </div>
            <ResidenceDetails data={residenceData} />
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Agent Contact Panel */}
        <div className="sticky top-6 bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] shadow-lg shadow-[var(--bg-shadow)] border-2 border-[var(--border)] rounded-xl  p-0 space-y-6 min-w-[60%] max-w-[80%] ">
          <div className="space-y-2">
            <div className="flex justify-start items-center p-5 border-b-2 border-[var(--border)] ">
              <div className="border-2 border-[var(--boorder)] w-16 h-14 rounded-full overflow-hidden flex justify-center items-center shadow-lg shadow-[var(--bg-shadow)]">
                <img
                  src={houseData.agent.image}
                  alt={houseData.agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-start items-start flex-col space-y-2 p-2 w-full ">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-[var(--text)] text-sm capitalize text-start">
                    {houseData.agent.name}
                  </h4>
                  <div
                    style={{ color: "var(--text-heading)" }}
                    className="flex items-center justify-center gap-1 text-sm font-bold shrink-0"
                  >
                    <BiStar className="text-amber-400 text-base" />
                    <span>4.8</span>
                    <span
                      style={{ color: "var(--text-paragraph)" }}
                      className="font-normal tracking-wider text-xs opacity-80"
                    >
                      (62)
                    </span>
                  </div>
                </div>
                <div className="flex justify-start items-center space-x-2  w-full px-1">
                  <p className="flex flex-row items-center space-x-1">
                    <IoShieldCheckmarkOutline
                      size={20}
                      className="text-green-900"
                    />

                    <span className="text-xs text-gray-500 font-semibold tracking-wider text-[var(--muted)] ">
                      Varified
                    </span>
                  </p>
                  <p className="flex flex-row items-center space-x-1">
                    <RiShieldStarFill size={20} className="text-green-700" />
                    <span className="text-xs text-gray-500 font-semibold text-[var(--muted)]  whitespace-nowrap tracking-wider">
                      Excellent Landlord
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-auto border-b-2 border-[var(--border)] py-3 px-5 flex flex-col justify-start items-start space-y-2">
              <p className="text-sm font-medium tracking-wider text-[var(--muted)]">
                From
              </p>
              <h1 className=" text-3xl font-semibold tracking-wider text-[var(--text)] space-x-1">
                $78
                <span className="text-sm font-light tracking-wider text-[var(--muted)]">
                  /month
                </span>
              </h1>
            </div>

            <div className="w-full h-auto border-b-2 border-[var(--border)] p-5 flex flex-col items-center">
              <p className="text-sm font-light tracking-wider leading-relaxed text-[var(--text)] text-start">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                enim nesciunt laborum ab cupiditate nobis, ad ipsum ducimus fuga
                fugit inventore consectetur esse quaerat autem officiis cum.
                Nobis, qui sunt.
              </p>
            </div>

            <div className="w-full h-auto border-b-2 border-[var(--border)] p-5 flex flex-col items-start space-y-2">
              <h2 className="text-xl font-font-semibold tracking-wider whitespace-nowrap">
                Available places
              </h2>
              <ul className="flex flex-col w-full h-auto space-y-2 ">
                <li className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium tracking-wider text-[var(--muted)] ">
                    Studio (3)
                  </span>
                  <span className="text-sm font-semibold tracking-wider text-[var(--muted)] ">
                    18 m2+
                  </span>
                </li>
                <li className="flex justify-between items-center w-full">
                  <span className="text-sm font-medium tracking-wider text-[var(--muted)] ">
                    Studio (2)
                  </span>
                  <span className="text-sm font-semibold tracking-wider text-[var(--muted)] ">
                    20 m2+
                  </span>
                </li>
              </ul>
            </div>

            <div className="w-full h-auto p-5 flex flex-col justify-start space-y-2 ">
              <h2 className="text-xl font-semibold tracking-wider whitespace-nowrap text-start">
                Plan your move
              </h2>
              <div className="flex flex-col items-center gap-2 space-y-3">
                <SlidingToggle<DateMode>
                  selectedValue={dateMode}
                  onChange={handleToggleChange}
                  options={[
                    { value: "month", label: "By month" },
                    { value: "exact", label: "Exact dates" },
                  ]}
                />
                <CalendarInputPicker
                  mode={dateMode}
                  placeholder={
                    dateMode === "exact"
                      ? "Choose exact date"
                      : "Choose target month"
                  }
                  onChange={handlePickerChange}
                />
                {displayString.trim() !== "" && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">
                      <strong>Formatted String:</strong> {displayString}
                    </p>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">
                        <strong>Raw Database Payload Object:</strong>
                      </p>
                      <pre className="text-[10px] font-mono bg-slate-50 p-2 text-slate-700 rounded-lg max-h-40 overflow-y-auto">
                        {rawOutput}
                      </pre>
                    </div>
                  </div>
                )}

                <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold py-4 rounded-lg transition text-sm">
                  Show Available Places
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
