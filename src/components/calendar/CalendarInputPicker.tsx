import React, { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { CalendarView } from "./CalendarView";

export type DateMode = "month" | "exact";

export interface PickerRawData {
  startDate?: Date | null;
  endDate?: Date | null;
  monthIndex?: number;
  year?: number;
}

interface CalendarInputPickerProps {
  mode: DateMode;
  placeholder?: string;
  onChange?: (formattedValue: string, rawData: PickerRawData) => void;
}

export const CalendarInputPicker: React.FC<CalendarInputPickerProps> = ({
  mode,
  placeholder = "Select date range...",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openTop, setOpenTop] = useState(false);

  // Keep track of explicit selections here so they survive dropdown close cycles
  const [savedStartDate, setSavedStartDate] = useState<Date | null>(null);
  const [savedEndDate, setSavedEndDate] = useState<Date | null>(null);
  const [savedMonth, setSavedMonth] = useState<number | undefined>(undefined);
  const [savedYear, setSavedYear] = useState<number | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine whether to open top or bottom based on viewport space
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const popoverEstimatedHeight = 380; // Estimated height of CalendarView
      const spaceBelow = window.innerHeight - rect.bottom;

      // If space below is less than calendar height and there's more space above, render on top
      if (
        spaceBelow < popoverEstimatedHeight &&
        rect.top > popoverEstimatedHeight
      ) {
        setOpenTop(true);
      } else {
        setOpenTop(false);
      }
    }
  }, [isOpen]);

  // Close popover when clicking anywhere outside
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

  // Flush values automatically when user toggles modes
  useEffect(() => {
    setInputValue("");
    setSavedStartDate(null);
    setSavedEndDate(null);
    setSavedMonth(undefined);
    setSavedYear(undefined);
  }, [mode]);

  const handleSelectRange = (start: Date | null, end: Date | null) => {
    setSavedStartDate(start);
    setSavedEndDate(end);

    if (start && !end) {
      const partialString = `${start.toLocaleDateString()} - ...`;
      setInputValue(partialString);
      onChange?.(partialString, { startDate: start, endDate: null });
    } else if (start && end) {
      const rangeString = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      setInputValue(rangeString);
      setIsOpen(false); // Range selection complete, close dropdown safely
      onChange?.(rangeString, { startDate: start, endDate: end });
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
    if (onChange) {
      onChange(formatted, { monthIndex, year });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full font-sans z-50">
      <div className="relative border-2 border-[var(--card)] rounded-lg">
        <input
          type="text"
          readOnly
          value={inputValue}
          placeholder={placeholder}
          onClick={() => setIsOpen((previous) => !previous)}
          className="input-field cursor-pointer"
        />
        <CiCalendar
          size={30}
          className="text-[var(--text)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute left-0 z-50 rounded-lg shadow-2xl border border-[var(--border)] p-4 min-w-[300px] bg-[var(--bg)] ${
            openTop ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <CalendarView
            mode={mode}
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
