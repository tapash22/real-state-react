import React, { useState } from "react";
import {
  TbCalendar,
  TbChevronLeft,
  TbChevronRight,
  TbCooker,
  TbRuler2,
  TbToiletPaper,
  TbUsers,
} from "react-icons/tb";
import { RoomUnit } from "../../data";

interface RoomUnitCardProps {
  unit: RoomUnit;
  onShowDetails?: ((unit: RoomUnit) => void) | undefined;
}

export const RoomUnitCard: React.FC<RoomUnitCardProps> = ({
  unit,
  onShowDetails,
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const defaultImages = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
  ];

  const imageList =
    unit.images && unit.images.length > 0 ? unit.images : defaultImages;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) =>
      prev === 0 ? imageList.length - 1 : prev - 1,
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) =>
      prev === imageList.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="w-full bg-[#f0f5f9] border border-[#dce5ed] rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row transition-all hover:shadow-md">
      {/* Left Column: Image Slider */}
      <div className="relative w-full sm:w-[260px] h-[200px] sm:h-auto shrink-0 group overflow-hidden">
        <img
          src={imageList[currentImageIdx]}
          alt={unit.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Carousel Arrow Controls */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TbChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TbChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots Pagination */}
        {imageList.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {imageList.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIdx ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Information & Details */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        {/* Top Header Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
            <h3 className="text-lg font-bold text-[#0c2340] tracking-tight">
              {unit.title}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-xl font-extrabold text-[#0c2340]">
                €{unit.pricePerMonth}
              </span>
              <span className="text-sm font-normal text-gray-500"> /month</span>
            </div>
          </div>

          {/* Grid Spec Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2 text-xs font-semibold text-[#2c3e50]">
            <div className="flex items-center gap-2">
              <TbCalendar className="text-lg text-[#1e3a8a]" />
              <span>{unit.stayDuration || "6–6 months"}</span>
            </div>

            <div className="flex items-center gap-2">
              <TbRuler2 className="text-lg text-[#1e3a8a]" />
              <span>{unit.sizeSqm} m²</span>
            </div>

            {unit.hasPrivateToilet !== false && (
              <div className="flex items-center gap-2">
                <TbToiletPaper className="text-lg text-[#1e3a8a]" />
                <span>Private toilet</span>
              </div>
            )}

            {unit.hasPrivateBathroom !== false && (
              <div className="flex items-center gap-2">
                <TbCooker className="text-lg text-[#1e3a8a]" />
                <span>Private bathroom</span>
              </div>
            )}

            {unit.hasPrivateKitchen !== false && (
              <div className="flex items-center gap-2">
                <TbCooker className="text-lg text-[#1e3a8a]" />
                <span>Private kitchen</span>
              </div>
            )}

            {unit.hasPrivateBalcony !== false && (
              <div className="flex items-center gap-2">
                <TbCooker className="text-lg text-[#1e3a8a]" />
                <span>Private balcony</span>
              </div>
            )}

            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <TbUsers className="text-lg text-[#1e3a8a]" />
              <span>Max. {unit.maxCapacity} people</span>
            </div>
          </div>
        </div>

        {/* Footer Section: Availability & CTA */}
        <div className="pt-4 border-t border-[#dce5ed]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0c2340]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>
              Available from{" "}
              <strong className="font-extrabold">{unit.availableFrom}</strong>
            </span>
          </div>

          <button
            onClick={() => onShowDetails?.(unit)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#ff4d2d] hover:bg-[#e03a1c] text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-[0.98]"
          >
            Show details
          </button>
        </div>
      </div>
    </div>
  );
};
