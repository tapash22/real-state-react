import React, { useState } from "react";
import {
  TbCalendarEvent,
  TbChevronLeft,
  TbChevronRight,
  TbLayoutGrid,
  TbVideo,
  TbX,
} from "react-icons/tb";
import { RoomUnit } from "../../data";

interface RoomUnitDetailDrawerProps {
  unit: RoomUnit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RoomUnitDetailDrawer: React.FC<RoomUnitDetailDrawerProps> = ({
  unit,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"about" | "included" | "payment">(
    "about",
  );
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

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
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Right-side Modal Container */}
      <aside className="relative z-10 w-full max-w-xl bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-[#0c2340] tracking-tight truncate pr-4">
            {unit.title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close panel"
          >
            <TbX size={24} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Main Hero Slider */}
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden group bg-slate-100">
            <img
              src={imageList[currentImageIdx]}
              alt={unit.title}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {imageList.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TbChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TbChevronRight size={20} />
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
                    ? "border-[#ff4d2d]"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}

            {/* Photo Counter Card */}
            <div className="relative h-16 rounded-lg overflow-hidden bg-[#536b7b] text-white flex flex-col items-center justify-center text-center p-1 cursor-pointer hover:bg-[#435764] transition-colors">
              <span className="text-sm font-bold leading-none">
                {unit.totalPhotosCount || 11}
              </span>
              <span className="text-[10px] font-medium leading-tight mt-0.5">
                More photos
              </span>
            </div>

            {/* Videos Card */}
            <div className="relative h-16 rounded-lg overflow-hidden bg-[#536b7b] text-white flex flex-col items-center justify-center text-center p-1 cursor-pointer hover:bg-[#435764] transition-colors">
              <TbVideo size={16} className="mb-0.5" />
              <span className="text-[10px] font-medium leading-tight">
                Videos
              </span>
            </div>

            {/* Floor Plans Card */}
            <div className="relative h-16 rounded-lg overflow-hidden bg-[#536b7b] text-white flex flex-col items-center justify-center text-center p-1 cursor-pointer hover:bg-[#435764] transition-colors">
              <TbLayoutGrid size={16} className="mb-0.5" />
              <span className="text-[10px] font-medium leading-tight">
                Floor plans
              </span>
            </div>
          </div>

          {/* Content Navigation Tabs */}
          <div className="border-b border-slate-200 flex items-center gap-8">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "about"
                  ? "text-[#0c2340]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              About
              {activeTab === "about" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0c2340]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("included")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "included"
                  ? "text-[#0c2340]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              What's included
              {activeTab === "included" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0c2340]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("payment")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "payment"
                  ? "text-[#0c2340]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Payment details
              {activeTab === "payment" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0c2340]" />
              )}
            </button>
          </div>

          {/* Tab Content Panels */}
          {activeTab === "about" && (
            <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
              <h3 className="font-bold text-[#0c2340] text-base">
                {unit.descriptionHeader || "Life at Mitte-Wedding"}
              </h3>
              <p>
                {unit.descriptionText ||
                  "553 apartments, 553+ students... be one of us & meet extraordinary people. Mitte-Wedding is a unique meeting point of the iconic neighborhoods of Prenzlauer Berg, Mitte and Wedding. From the historical sites and clever co-working spaces near Bernauer Straße to the unique parks and eclectic cafes near Mauerpark, there is plenty to explore."}
              </p>
              <p>
                Our student community offers stylishly designed apartments for
                those who thrive on the energy of the city.
              </p>
            </div>
          )}

          {activeTab === "included" && (
            <div className="space-y-2 text-sm text-slate-700">
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
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <strong>Deposit:</strong> €
                {unit.paymentDetails?.deposit || unit.pricePerMonth}
              </p>
              <p>
                <strong>Utilities:</strong>{" "}
                {unit.paymentDetails?.utilities || "Included in base price"}
              </p>
            </div>
          )}
        </div>

        {/* Fixed Footer Bar */}
        <div className="p-5 border-t border-slate-200 bg-white space-y-3 shrink-0">
          <div className="text-right">
            <span className="text-2xl font-extrabold text-[#0c2340]">
              €{unit.pricePerMonth}
            </span>
            <span className="text-sm font-normal text-slate-500"> /month</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl font-bold text-xs text-[#0c2340] hover:bg-slate-50 transition-colors">
              <TbCalendarEvent size={16} />
              <span>Move-in date – Move-out date</span>
            </button>

            <button className="px-4 py-3 bg-[#ff4d2d] hover:bg-[#e03a1c] text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-[0.98]">
              Apply to rent
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
