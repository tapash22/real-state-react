import React, { useEffect, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { DateMode, modeTabs } from "../../data";
import { Tabs } from "../property-tabs/Tabs";

interface CalendarViewProps {
  mode?: DateMode;
  onModeChange?: (mode: DateMode) => void;
  savedStartDate?: Date | null;
  savedEndDate?: Date | null;
  savedMonth?: number | undefined;
  savedYear?: number | undefined;
  onSelectRange?: (start: Date | null, end: Date | null) => void;
  onSelectMonth?: (monthIndex: number, year: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  mode: externalMode = "exact",
  onModeChange,
  savedStartDate = null,
  savedEndDate = null,
  savedMonth,
  savedYear,
  onSelectRange,
  onSelectMonth,
}) => {
  const [internalMode, setInternalMode] = useState<DateMode>(externalMode);

  useEffect(() => {
    setInternalMode(externalMode);
  }, [externalMode]);

  const activeMode = internalMode;

  const handleModeToggle = (newMode: DateMode) => {
    setInternalMode(newMode);
    onModeChange?.(newMode);
  };

  const [startDate, setStartDate] = useState<Date | null>(savedStartDate);
  const [endDate, setEndDate] = useState<Date | null>(savedEndDate);

  // Preserve viewed date across tabs and navigation
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    if (savedStartDate) return new Date(savedStartDate);
    if (savedYear !== undefined && savedMonth !== undefined) {
      return new Date(savedYear, savedMonth, 1);
    }
    return new Date();
  });

  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    savedMonth,
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    savedYear,
  );

  // Sync state with parent props without clearing existing selections when navigating
  useEffect(() => {
    if (savedStartDate !== undefined) setStartDate(savedStartDate);
    if (savedEndDate !== undefined) setEndDate(savedEndDate);
    if (savedMonth !== undefined) setSelectedMonth(savedMonth);
    if (savedYear !== undefined) setSelectedYear(savedYear);

    if (savedStartDate) {
      setCurrentDate(new Date(savedStartDate));
    } else if (savedYear !== undefined && savedMonth !== undefined) {
      setCurrentDate(new Date(savedYear, savedMonth, 1));
    }
  }, [savedStartDate, savedEndDate, savedMonth, savedYear]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Navigation handlers for prev / next month
  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalSlots = [...blanks, ...days];

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate < today) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      onSelectRange?.(clickedDate, null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
        onSelectRange?.(clickedDate, null);
      } else {
        setEndDate(clickedDate);
        onSelectRange?.(startDate, clickedDate);
      }
    }
  };

  return (
    <div className="w-80 rounded-2xl bg-[var(--bg)] p-5 font-sans shadow-xl border border-[var(--border)]">
      {/* MODE SWITCHER */}
      <div className="mb-3">
        <Tabs
          items={modeTabs}
          activeId={activeMode}
          onChange={(id) => handleModeToggle(id as DateMode)}
          triggerOn="click"
          containerClassName="w-full"
        />
      </div>

      {/* MONTH / YEAR NAVIGATION HEADER */}
      <div className="flex items-center justify-between px-1 pb-3 pt-1 border-t border-[var(--border)]">
        <h3 className="text-sm font-bold text-[var(--text)]">
          {months[month]} {year}
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Previous month"
            className="flex items-center justify-center rounded-lg p-1.5 text-xs text-[var(--muted)] transition-all hover:bg-[var(--card)] hover:text-[var(--text)]"
          >
            <TbChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="flex items-center justify-center rounded-lg p-1.5 text-xs text-[var(--muted)] transition-all hover:bg-[var(--card)] hover:text-[var(--text)]"
          >
            <TbChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* VIEW 1: MONTH PICKER */}
      {/* VIEW 1: MONTH PICKER */}
      {activeMode === "month" && (
        <div className="grid grid-cols-4 gap-2">
          {months.map((m, index) => {
            const isPickedMonth =
              index === selectedMonth && year === selectedYear;
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setSelectedMonth(index);
                  setSelectedYear(year);
                  setCurrentDate(new Date(year, index, 1));
                  onSelectMonth?.(index, year);
                }}
                className={`rounded-xl py-2.5 px-2 text-xs font-medium transition-all ${
                  isPickedMonth
                    ? "bg-[var(--primary)] text-white font-bold shadow-sm"
                    : "text-[var(--text)] hover:bg-[var(--card)]"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW 2: EXACT DATE RANGE PICKER */}
      {activeMode === "exact" && (
        <div>
          <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-[var(--muted)]">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex h-7 items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-normal">
            {totalSlots.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-8 w-8" />;
              }

              const thisDate = new Date(year, month, day);
              thisDate.setHours(0, 0, 0, 0);

              const isPast = thisDate < today;
              const isStart = startDate?.getTime() === thisDate.getTime();
              const isEnd = endDate?.getTime() === thisDate.getTime();
              const isInRange =
                startDate &&
                endDate &&
                thisDate >= startDate &&
                thisDate <= endDate;

              let dayStyles = "text-[var(--text)] hover:bg-[var(--primary)]";

              if (isPast) {
                dayStyles = "text-[var(--muted)]";
              } else if (isStart || isEnd) {
                dayStyles =
                  "bg-[var(--primary)] text-[var(--text)] font-bold shadow-sm opacity-90";
              } else if (isInRange) {
                dayStyles =
                  "bg-[var(--primary)] opacity-50 text-[var(--card)]   font-medium";
              }

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDayClick(day)}
                  className={`flex h-8 w-8 items-center justify-center  rounded-lg transition-all ${dayStyles}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};