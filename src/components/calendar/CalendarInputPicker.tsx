import React, { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { DateMode } from "../../data";
import { CalendarView } from "./CalendarView";

export interface PickerRawData {
  startDate?: Date | null;
  endDate?: Date | null;
  monthIndex?: number;
  year?: number;
  mode?: DateMode;
}

interface CalendarInputPickerProps {
  initialMode?: DateMode;
  placeholder?: string;
  onChange?: (formattedValue: string, rawData: PickerRawData) => void;
}

export const CalendarInputPicker: React.FC<CalendarInputPickerProps> = ({
  initialMode = "exact",
  placeholder = "Select date range...",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openTop, setOpenTop] = useState(false);
  const [currentMode, setCurrentMode] = useState<DateMode>(initialMode);

  const [savedStartDate, setSavedStartDate] = useState<Date | null>(null);
  const [savedEndDate, setSavedEndDate] = useState<Date | null>(null);
  const [savedMonth, setSavedMonth] = useState<number | undefined>(undefined);
  const [savedYear, setSavedYear] = useState<number | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport spatial check to anchor popover above or below
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const popoverEstimatedHeight = 400;
      const spaceBelow = window.innerHeight - rect.bottom;

      setOpenTop(
        spaceBelow < popoverEstimatedHeight &&
          rect.top > popoverEstimatedHeight,
      );
    }
  }, [isOpen]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModeChange = (newMode: DateMode) => {
    setCurrentMode(newMode);
    // Clear formatted text input when switching selection strategies
    setInputValue("");
  };

  const handleSelectRange = (start: Date | null, end: Date | null) => {
    setSavedStartDate(start);
    setSavedEndDate(end);

    if (start && !end) {
      const partialString = `${start.toLocaleDateString()} - ...`;
      setInputValue(partialString);
      onChange?.(partialString, {
        startDate: start,
        endDate: null,
        mode: "exact",
      });
    } else if (start && end) {
      const rangeString = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      setInputValue(rangeString);
      setIsOpen(false);
      onChange?.(rangeString, {
        startDate: start,
        endDate: end,
        mode: "exact",
      });
    }
  };

  const handleSelectMonth = (monthIndex: number, year: number) => {
    setSavedMonth(monthIndex);
    setSavedYear(year);

    const formatter = new Intl.DateTimeFormat("en", { month: "long" });
    const monthName = formatter.format(new Date(year, monthIndex));
    const formatted = `${monthName} ${year}`;

    setInputValue(formatted);
    setIsOpen(false);
    onChange?.(formatted, { monthIndex, year, mode: "month" });
  };

  return (
    <div ref={containerRef} className="relative w-full font-sans z-50">
      <div className="relative border-2 border-[var(--card)] rounded-lg">
        <input
          type="text"
          readOnly
          value={inputValue}
          placeholder={placeholder}
          onClick={() => setIsOpen((prev) => !prev)}
          className="input-field cursor-pointer w-full pr-10"
        />
        <CiCalendar
          size={24}
          className="text-[var(--text)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-80"
        />
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 z-50 ${
            openTop ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <CalendarView
            mode={currentMode}
            onModeChange={handleModeChange}
            savedStartDate={savedStartDate}
            savedEndDate={savedEndDate}
            savedMonth={savedMonth}
            savedYear={savedYear}
            onSelectRange={handleSelectRange}
            onSelectMonth={handleSelectMonth}
          />
        </div>
      )}
    </div>
  );
};