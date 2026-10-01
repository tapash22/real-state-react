import React, { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { TbX } from "react-icons/tb"; // Added clear icon
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

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const isPastDate = (date: Date): boolean => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < getToday();
  };

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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();

    setSavedStartDate(null);
    setSavedEndDate(null);
    setSavedMonth(undefined);
    setSavedYear(undefined);
    setInputValue("");

    onChange?.("", {
      startDate: null,
      endDate: null,
      mode: currentMode,
    });
  };

  // Keep calendar open when switching between "exact" and "month" modes
  const handleModeChange = (newMode: DateMode) => {
    setCurrentMode(newMode);
    setIsOpen(true); // Ensures the calendar stays open during tab switching

    if (newMode === "exact") {
      if (savedStartDate && savedEndDate) {
        setInputValue(
          `${savedStartDate.toLocaleDateString()} - ${savedEndDate.toLocaleDateString()}`,
        );
      } else if (savedStartDate) {
        setInputValue(`${savedStartDate.toLocaleDateString()} - ...`);
      } else {
        setInputValue("");
      }
    } else if (newMode === "month") {
      if (savedMonth !== undefined && savedYear !== undefined) {
        const formatter = new Intl.DateTimeFormat("en", { month: "long" });
        const monthName = formatter.format(new Date(savedYear, savedMonth));
        setInputValue(`${monthName} ${savedYear}`);
      } else {
        setInputValue("");
      }
    }
  };

  const handleSelectRange = (start: Date | null, end: Date | null) => {
    if (start && isPastDate(start)) return;
    if (end && isPastDate(end)) return;

    setSavedStartDate(start);
    setSavedEndDate(end);

    if (start && !end) {
      // Partial range (1st date selected): KEEP OPEN
      const partialString = `${start.toLocaleDateString()} - ...`;
      setInputValue(partialString);
      setIsOpen(true);
      onChange?.(partialString, {
        startDate: start,
        endDate: null,
        mode: "exact",
      });
    } else if (start && end) {
      // Complete range (both dates selected): CLOSE CALENDAR
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
  const today = getToday();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Guard: Prevent selecting past months
  if (
    year < currentYear ||
    (year === currentYear && monthIndex < currentMonth)
  ) {
    return;
  }

  setSavedMonth(monthIndex);
  setSavedYear(year);

  const formatter = new Intl.DateTimeFormat("en", { month: "long" });
  const monthName = formatter.format(new Date(year, monthIndex));
  const formatted = `${monthName} ${year}`;

  setInputValue(formatted);
  
  // REMOVED setIsOpen(false) -> Popover stays open after selecting a month
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
          className="input-field cursor-pointer w-full pr-16"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-[var(--text)] hover:bg-[var(--card)] transition-colors opacity-70 hover:opacity-100"
              title="Clear selection"
              aria-label="Clear date selection"
            >
              <TbX size={18} />
            </button>
          )}

          <CiCalendar
            size={22}
            className="text-[var(--text)] pointer-events-none opacity-80"
          />
        </div>
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
};;