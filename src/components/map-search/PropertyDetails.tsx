import { useState } from "react";
import { BiArea, BiBath, BiBed, BiStar } from "react-icons/bi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { RiShieldStarFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

import { FiDollarSign } from "react-icons/fi";
import { useAppData } from "../../hooks/useAppData";
import { useHouseContext } from "../../hooks/useHouseContext";
import {
  CalendarInputPicker,
  type PickerRawData,
} from "../calendar/CalendarInputPicker";
import { SlidingToggle } from "../toggle/SlidingToggle";
import { PropertySlider } from "./PropertySlider";
import ResidenceDetails from "./ResidenceDetails";

// Type configuration for expected route parameters
type RouteParams = {
  id: string;
};

type DateMode = "month" | "exact";

export default function PropertyDetails() {
  const { data, isLoading: isResidenceDataLoading } = useAppData();

  const { getHouseById, isLoading: isHouseDataLoading } = useHouseContext();

  const { id } = useParams<RouteParams>();

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

  /* Calendar Handler                                                         */
  const handlePickerChange = (
    formattedValue: string,
    rawData: PickerRawData,
  ) => {
    setDisplayString(formattedValue);

    setRawOutput(JSON.stringify(rawData, null, 2));
  };

  // Mocking all data retrieved from the image layout
  const residenceData = data?.residenceData;

  /* Loading State                                                             */
  if (isHouseDataLoading) {
    return (
      <div className="p-16 text-center font-medium text-gray-500">
        Loading details...
      </div>
    );
  }

  const houseData = getHouseById(id ?? "");

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

  const premiumPlaceholders = data?.premiumPropertyImages ?? [];

  // Combine them to make a rich array containing 10 pictures
  const propertyImages = [...baseImages, ...premiumPlaceholders].slice(0, 10);

  return (
    <div className="w-full px-5 py-3 lg:px-24">
      {/* Breadcrumb                                                          */}
      <nav className="py-4 text-xs font-medium tracking-wider text-[var(--muted)]">
        {houseData.country}
        {" > "}
        {houseData.address}
      </nav>

      {/* Main Layout                                                         */}
      <div className="relative z-30 grid grid-cols-1 items-start gap-8 md:grid-cols-3">
        {/* LEFT COLUMN                                                       */}
        <div className="space-y-6 md:col-span-2">
          {/* Property Gallery                                                */}
          <PropertySlider images={propertyImages} />

          {/* Property Information                                            */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {houseData.name}
            </h1>

            <p className="font-mono text-sm tracking-wide text-gray-500">
              {houseData.address}
            </p>

            {/* Price                                                        */}
            <div className="text-2xl font-bold text-[var(--text)]">
              <FiDollarSign className="inline" />
              {Number(houseData.price).toLocaleString()}
            </div>

            {/* Property Stats                                               */}
            <div
              style={{
                color: "var(--text-paragraph)",
                borderColor: "var(--border)",
              }}
              className="
                flex
                flex-row
                space-x-5
                border-b-2
                border-t-2
                border-[var(--border)]
                p-5
                text-xs
                font-bold
                transition-all
                duration-300
              "
            >
              {/* Beds */}
              <div className="flex items-center gap-1 lg:gap-2">
                <BiBed className="text-sm opacity-80 lg:text-lg" />
                <span className="text-xs font-semibold tracking-wide">
                  {houseData.bedroom} Beds
                </span>
              </div>

              {/* Baths */}
              <div className="flex items-center gap-2">
                <BiBath className="text-sm opacity-80 lg:text-lg" />
                <span className="text-xs font-semibold tracking-wide">
                  {houseData.bathroom} Baths
                </span>
              </div>

              {/* Area / Year */}
              <div className="flex items-center gap-2">
                <BiArea className="text-sm opacity-80 lg:text-lg" />
                <span className="text-xs font-semibold tracking-wide">
                  {houseData.year}
                </span>
              </div>
            </div>

            {/* Description                                                 */}
            <div className="py-2">
              <h3 className="space-y-2 text-lg font-semibold text-[var(--text)]">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 capitalize">
                {houseData.description}
              </p>
            </div>

            {/* Residence Details                                           */}
            <div className="space-y-2">
              {isResidenceDataLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : residenceData ? (
                <ResidenceDetails data={residenceData} />
              ) : (
                <p className="text-sm text-red-500">
                  Residence data not found.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN                                                      */}
        <div
          className="
            sticky
            top-6
            z-20
            min-w-[60%]
            max-w-[80%]
            space-y-6
            overflow-visible
            rounded-xl
            border
            border-[var(--border)]
            bg-[color-mix(in_srgb,var(--bg)_60%,transparent)]
            p-2
            shadow-md
            shadow-[var(--primary)]
          "
        >
          {/* Agent Section                                                   */}
          <div className="space-y-2">
            <div className="flex items-center justify-start border-b-2 border-[var(--border)] p-3">
              {/* Agent Image */}
              <div className="flex h-14 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--border)] shadow-lg shadow-[var(--bg-shadow)]">
                <img
                  src={houseData.agent.image}
                  alt={houseData.agent.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Agent Information */}
              <div className="flex w-full flex-col items-start justify-start space-y-2 p-2">
                <div className="flex w-full items-start justify-between gap-3">
                  <h4 className="text-start text-sm font-bold capitalize text-[var(--text)]">
                    {houseData.agent.name}
                  </h4>

                  {/* Rating */}
                  <div
                    style={{
                      color: "var(--text-heading)",
                    }}
                    className="flex shrink-0 items-center justify-center gap-1 text-sm font-bold"
                  >
                    <BiStar className="text-base text-amber-400" />

                    <span>4.8</span>

                    <span
                      style={{
                        color: "var(--text-paragraph)",
                      }}
                      className="text-xs font-normal tracking-wider opacity-80"
                    >
                      (62)
                    </span>
                  </div>
                </div>

                {/* Verification */}
                <div className="flex w-full items-center justify-start space-x-2 px-1">
                  <p className="flex flex-row items-center space-x-1">
                    <IoShieldCheckmarkOutline
                      size={20}
                      className="text-green-900"
                    />
                    <span className="text-xs font-semibold tracking-wider text-[var(--muted)]">
                      Verified
                    </span>
                  </p>

                  <p className="flex flex-row items-center space-x-1">
                    <RiShieldStarFill size={20} className="text-green-700" />
                    <span className="whitespace-nowrap text-xs font-semibold tracking-wider text-[var(--muted)]">
                      Excellent Landlord
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Starting Price                                              */}
            <div className="flex h-auto w-full flex-col items-start justify-start space-y-2 border-b-2 border-[var(--border)] p-3">
              <p className="text-sm font-medium tracking-wider text-[var(--muted)]">
                From
              </p>

              <h1 className="flex items-center gap-1 text-3xl font-semibold tracking-wider text-[var(--text)]">
                <FiDollarSign size={16} />
                78
                <span className="text-sm font-light tracking-wider text-[var(--muted)]">
                  /month
                </span>
              </h1>
            </div>

            {/* Agent Description                                            */}
            <div className="flex h-auto w-full flex-col items-center border-b-2 border-[var(--border)] p-3">
              <p className="text-start text-sm font-light leading-relaxed tracking-wider text-[var(--text)]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                enim nesciunt laborum ab cupiditate nobis, ad ipsum ducimus fuga
                fugit inventore consectetur esse quaerat autem officiis cum.
                Nobis, qui sunt.
              </p>
            </div>

            {/* Available Places                                             */}
            <div className="flex h-auto w-full flex-col items-start space-y-2 border-b-2 border-[var(--border)] p-3">
              <h2 className="whitespace-nowrap text-lg font-semibold tracking-wider">
                Available places
              </h2>

              <ul className="flex h-auto w-full flex-col space-y-2">
                <li className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium tracking-wider text-[var(--muted)]">
                    Studio (3)
                  </span>

                  <span className="text-sm font-semibold tracking-wider text-[var(--muted)]">
                    18 m2+
                  </span>
                </li>

                <li className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium tracking-wider text-[var(--muted)]">
                    Studio (2)
                  </span>

                  <span className="text-sm font-semibold tracking-wider text-[var(--muted)]">
                    20 m2+
                  </span>
                </li>
              </ul>
            </div>

            {/* Move Planner                                                 */}
            <div className="flex h-auto w-full flex-col justify-start space-y-2 p-3">
              <h2 className="whitespace-nowrap text-start text-lg font-semibold tracking-wider">
                Plan your move
              </h2>

              <div className="flex flex-col items-center space-y-3">
                {/* Date Mode */}
                <div className="w-full px-5">
                  <SlidingToggle<DateMode>
                    selectedValue={dateMode}
                    onChange={handleToggleChange}
                    options={[
                      {
                        value: "month",
                        label: "By month",
                      },
                      {
                        value: "exact",
                        label: "Exact dates",
                      },
                    ]}
                  />
                </div>

                {/* Calendar */}
                <CalendarInputPicker
                  mode={dateMode}
                  placeholder={
                    dateMode === "exact"
                      ? "Choose exact date"
                      : "Choose target month"
                  }
                  onChange={handlePickerChange}
                />

                {/* Calendar Debug Output */}
                {displayString.trim() !== "" && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">
                      <strong>Formatted String:</strong> {displayString}
                    </p>

                    <div>
                      <p className="mb-1 text-xs text-slate-500">
                        <strong>Raw Database Payload Object:</strong>
                      </p>

                      <pre className="max-h-40 overflow-y-auto rounded-lg bg-slate-50 p-2 font-mono text-[10px] text-slate-700">
                        {rawOutput}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Available Places Button */}
                <button
                  type="button"
                  className="
                    h-full
                    w-full
                    rounded-md
                    border
                    border-[var(--card)]
                    p-3
                    text-sm
                    shadow-sm
                    shadow-[var(--primary)]
                  "
                >
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
