import React, { useState } from "react";
import {
  TbCalendarEvent,
  TbChevronLeft,
  TbChevronRight,
  TbLayoutGrid,
  TbVideo,
  TbX,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ResidenceData, RoomUnit } from "../../data";
import {
  CalendarInputPicker,
  DateMode,
  PickerRawData,
} from "../calendar/CalendarInputPicker";
import { PaymentBreakdownCard } from "../card/PaymentBreakdownCard";
import { PropertyFeaturesCard } from "../card/PropertyFeaturesCard";

interface RoomUnitDetailDrawerProps {
  unit: RoomUnit | null;
  residenceData?: ResidenceData | null; // Pass Parent Residence Data
  isOpen: boolean;
  onClose: () => void;
  navHeightPx?: number;
}

export const RoomUnitDetailDrawer: React.FC<RoomUnitDetailDrawerProps> = ({
  unit,
  residenceData,
  isOpen,
  onClose,
  navHeightPx = 64, // Matches standard h-16 navbar height
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"about" | "included" | "payment">(
    "about",
  );
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Date selection states
  const [dateMode, setDateMode] = useState<DateMode>("exact");
  const [selectedFormattedDate, setSelectedFormattedDate] =
    useState<string>("");
  const [selectedDateData, setSelectedDateData] =
    useState<PickerRawData | null>(null);

  /**
   * Check if a valid date selection has been made based on mode.
   */
  const isDateSelected = Boolean(
    selectedDateData &&
    ((dateMode === "exact" &&
      selectedDateData.startDate &&
      selectedDateData.endDate) ||
      (dateMode === "month" &&
        selectedDateData.monthIndex !== undefined &&
        selectedDateData.year !== undefined)),
  );

  /**
   * Handle changes emitted from CalendarInputPicker.
   */
  const handleDateChange = (formattedValue: string, rawData: PickerRawData) => {
    setSelectedFormattedDate(formattedValue);
    setSelectedDateData(rawData);
  };

  /**
   * Navigate to checkout with the selected room unit.
   */
  const handleApplyToRent = () => {
    if (!unit || !isDateSelected) return;

    // Close the drawer
    onClose();

    // Navigate to checkout and pass selected unit
    navigate("/checkout", {
      state: {
        unit,
        residenceTitle: residenceData?.title,
        bookingDates: {
          formatted: selectedFormattedDate,
          rawData: selectedDateData,
          mode: dateMode,
        },
      },
    });
  };

  if (!isOpen || !unit) return null;

  const imageList =
    unit.images && unit.images.length > 0
      ? unit.images
      : [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
        ];

  const handleNext = () => {
    setCurrentImageIdx((prev) =>
      prev === imageList.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setCurrentImageIdx((prev) =>
      prev === 0 ? imageList.length - 1 : prev - 1,
    );
  };

  return (
    <div
      style={{
        top: `${navHeightPx}px`,
        height: `calc(100vh - ${navHeightPx}px)`,
      }}
      className="fixed inset-0 z-40 flex justify-end overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        style={{ top: `${navHeightPx}px` }}
        onClick={onClose}
      />

      {/* Right-side Modal Container */}
      <aside className="relative z-10 w-full max-w-xl bg-[var(--bg)] shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)] shrink-0">
          <div className="py-1">
            {residenceData?.title && (
              <p className="text-lg font-semibold text-[var(--text)] uppercase tracking-wider">
                {residenceData.title}
              </p>
            )}
            <h2 className="text-sm font-bold text-[var(--muted)] tracking-tight truncate pr-4">
              {unit.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[var(--text)] hover:text-[var(--text)] hover:bg-[var(--card)] transition-colors"
            aria-label="Close panel"
          >
            <TbX size={24} className="text-[var(--text)]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
          {/* Main Hero Slider */}
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden group bg-[var(--bg)]">
            <img
              src={imageList[currentImageIdx]}
              alt={unit.title}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {imageList.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full text-[var(--text)] flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TbChevronLeft size={20} className="text-[var(--text)]" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full text-[var(--text)] flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TbChevronRight size={20} className="text-[var(--text)]" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-6 gap-2">
            {imageList.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIdx(idx)}
                className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentImageIdx
                    ? "border-[var(--primary)]"
                    : "border-[var(--muted)] opacity-75 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}

            {/* Photo Counter Card */}
            <div className="relative h-16 rounded-lg overflow-hidden bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center text-center p-1 cursor-pointer transition-colors">
              <span className="text-sm font-bold leading-none">
                {unit.totalPhotosCount || 11}
              </span>
              <span className="text-[10px] font-medium leading-tight mt-0.5">
                More photos
              </span>
            </div>

            {/* Videos Card */}
            <div className="relative h-16 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-1 cursor-pointer hover:bg-[#435764] transition-colors">
              <TbVideo size={16} className="mb-0.5 text-[var(--text)]" />
              <span className="text-[10px] font-medium leading-tight text-[var(--muted)]">
                Videos
              </span>
            </div>

            {/* Floor Plans Card */}
            <div className="relative h-16 rounded-lg overflow-hidden text-[var(--muted)] flex flex-col items-center justify-center text-center p-1 cursor-pointer hover:bg-[#435764] transition-colors">
              <TbLayoutGrid size={16} className="mb-0.5 text-[var(--text)]" />
              <span className="text-[10px] font-medium leading-tight text-[var(--muted)]">
                Floor plans
              </span>
            </div>
          </div>

          {/* Content Navigation Tabs */}
          <div className="border-b border-[var(--border)] flex items-center gap-8">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "about"
                  ? "text-[var(--muted)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              About
              {activeTab === "about" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text)]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("included")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "included"
                  ? "text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              What's included
              {activeTab === "included" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text)]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("payment")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "payment"
                  ? "text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              Payment details
              {activeTab === "payment" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--text)]" />
              )}
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === "about" && (
            <div className="space-y-4 text-sm leading-relaxed">
              <h3 className="font-bold text-[var(--text)] text-base">
                {unit.descriptionHeader ||
                  "Life at " + (residenceData?.title || "Residence")}
              </h3>
              <p>
                {unit.descriptionText ||
                  "Modern and fully equipped studio living designed for ultimate convenience and community living."}
              </p>

              {/* Residence Highlights Summary (Injected from residenceData) */}
              {residenceData?.services?.general && (
                <div className="p-4 rounded-xl space-y-2 border border-[var(--border)]">
                  <h4 className="font-semibold text-xs text-[var(--text)] uppercase tracking-wider">
                    Residence Amenities
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-[var(--muted)]">
                    {residenceData.services.general.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "included" && (
            <div className="space-y-4 text-sm text-[var(--muted)]">
              <ul className="list-disc pl-5 space-y-1">
                {unit.whatsIncluded?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                )) || (
                  <>
                    <li>High-Speed Fiber Wifi</li>
                    <li>All utility bills included</li>
                    <li>Fully furnished kitchenette</li>
                  </>
                )}
              </ul>

              {/* Cleaning Policy from Residence */}
              {residenceData?.cleaningInfo && (
                <div className="p-3 rounded-lg text-[var(--muted)] text-xs border border-[var(--warning)] tracking-wider">
                  <strong>Cleaning Policy :</strong>{" "}
                  {residenceData.cleaningInfo}
                </div>
              )}

              <PropertyFeaturesCard />
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-3 text-sm text-[var(--text)]">
              <p>
                <strong>Deposit:</strong> €
                {unit.paymentDetails?.deposit || unit.pricePerMonth}
              </p>
              <p>
                <strong>Utilities:</strong>{" "}
                {unit.paymentDetails?.utilities || "Included in base price"}
              </p>
              <PaymentBreakdownCard
                platformName="HousingAnywhere"
                tenantProtectionFee={
                  isDateSelected ? selectedFormattedDate : "Select dates"
                }
                landlordName="Ivetta"
                landlordAvatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                securityDeposit={
                  unit.paymentDetails?.deposit || unit.pricePerMonth
                }
                onSelectDates={() => setActiveTab("about")}
              />
            </div>
          )}
        </div>

        {/* Fixed Footer Bar */}
        <div className="p-4 border-t border-[var(--border)] space-y-3 shrink-0 bg-[var(--bg)]">
          {/* Price Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1">
              <TbCalendarEvent size={16} className="text-[var(--primary)]" />
              <span className="text-xs font-semibold text-[var(--muted)]">
                Available: {unit.availableFrom}
              </span>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[var(--text)] tracking-wider">
                ${unit.pricePerMonth}
              </span>
              <span className="text-sm font-normal text-[var(--muted)]">
                {" "}
                /month
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-10">
            {/* Calendar Picker Block */}
            <div className="space-y-2 ">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--text)]">
                  Select Move-in & Move-out Dates{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 bg-[var(--card)] p-0.5 rounded-lg border border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setDateMode("exact")}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                      dateMode === "exact"
                        ? "bg-[var(--primary)] text-white"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Exact
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateMode("month")}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                      dateMode === "month"
                        ? "bg-[var(--primary)] text-white"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    By Month
                  </button>
                </div>
              </div>

              <CalendarInputPicker
                mode={dateMode}
                placeholder="Select move-in and move-out range..."
                onChange={handleDateChange}
              />
            </div>

            {/* Action Button */}
            <button
              type="button"
              disabled={!isDateSelected}
              onClick={handleApplyToRent}
              className={`w-auto h-auto p-3 rounded-sm font-bold text-xs tracking-wide transition-all  ${
                isDateSelected
                  ? "bg-[var(--primary)] text-white shadow-md hover:brightness-105 active:scale-[0.98] cursor-pointer opacity-100"
                  : "bg-gray-300 text-gray-500  opacity-60 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              {isDateSelected
                ? "Apply to rent"
                : "Select rental dates to continue"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
