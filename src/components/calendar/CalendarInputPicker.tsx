import React, { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { CalendarView } from "./CalendarView";

type DateMode = "month" | "exact";

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

  // Keep track of explicit selections here so they survive dropdown close cycles
  const [savedStartDate, setSavedStartDate] = useState<Date | null>(null);
  const [savedEndDate, setSavedEndDate] = useState<Date | null>(null);
  const [savedMonth, setSavedMonth] = useState<number | undefined>(undefined);
  const [savedYear, setSavedYear] = useState<number | undefined>(undefined);

  const containerRef = useRef<HTMLDivElement>(null);

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
      if (onChange) {
        onChange(partialString, { startDate: start, endDate: null });
      }
    } else if (start && end) {
      const rangeString = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      setInputValue(rangeString);
      setIsOpen(false); // Range selection complete, close dropdown safely
      if (onChange) {
        onChange(rangeString, { startDate: start, endDate: end });
      }
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
          onClick={() => setIsOpen(!isOpen)}
          className="input-field cursor-pointer"
        />
        <CiCalendar
          size={30}
          className="text-[var(--text)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      {isOpen && (
        <div className="absolute z-[9999] left-0 top-full mt-2 origin-top-left animate-in fade-in slide-in-from-top-2 duration-150">
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
