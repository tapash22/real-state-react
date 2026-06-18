import React, { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { CalendarView } from "./CalendarView";

type DateMode = "month" | "exact";

// Strict type definition for raw callback data payloads passed to parent
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking anywhere outside this wrapper element
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
  }, [mode]);

  const handleSelectRange = (start: Date | null, end: Date | null) => {
    if (start && !end) {
      const partialString = `${start.toLocaleDateString()} - ...`;
      setInputValue(partialString);
      if (onChange) {
        onChange(partialString, { startDate: start, endDate: null });
      }
    } else if (start && end) {
      const rangeString = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      setInputValue(rangeString);
      setIsOpen(false); // Range selection complete, close dropdown
      if (onChange) {
        onChange(rangeString, { startDate: start, endDate: end });
      }
    }
  };

  const handleSelectMonth = (monthIndex: number, year: number) => {
    const formatter = new Intl.DateTimeFormat("en", { month: "long" });
    const monthName = formatter.format(new Date(year, monthIndex));
    const formatted = `${monthName} ${year}`;

    setInputValue(formatted);
    setIsOpen(false); // Month selected, close dropdown immediately
    if (onChange) {
      onChange(formatted, { monthIndex, year });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full font-sans z-50">
      <div className="relative ">
        <input
          type="text"
          readOnly
          value={inputValue}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className="input-field"
        />
        <CiCalendar
          size={30}
          className="text-[var(--text)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      {isOpen && (
        <div className="absolute z-[9999] left-0 top-full origin-top-left animate-in fade-in slide-in-from-top-2 duration-150 ">
          <CalendarView
            mode={mode}
            onSelectRange={handleSelectRange}
            onSelectMonth={handleSelectMonth}
          />
        </div>
      )}
    </div>
  );
};
