import React, { useEffect, useState } from "react";

type DateMode = "month" | "exact";

interface CalendarViewProps {
  mode: DateMode;
  savedStartDate?: Date | null;
  savedEndDate?: Date | null;
  // Add "| undefined" explicitly here to satisfy exactOptionalPropertyTypes
  savedMonth?: number | undefined;
  savedYear?: number | undefined;
  onSelectRange?: (start: Date | null, end: Date | null) => void;
  onSelectMonth?: (monthIndex: number, year: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  mode,
  savedStartDate = null,
  savedEndDate = null,
  savedMonth,
  savedYear,
  onSelectRange,
  onSelectMonth,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(savedStartDate);
  const [endDate, setEndDate] = useState<Date | null>(savedEndDate);

  // Default to showing the month/year of the saved start date if it exists
  const [currentDate, setCurrentDate] = useState(() => {
    return savedStartDate ? new Date(savedStartDate) : new Date();
  });

  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    savedMonth,
  );
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    savedYear,
  );

  // Sync internal state flags whenever the dropdown unmounts / remounts
  useEffect(() => {
    setStartDate(savedStartDate);
    setEndDate(savedEndDate);
    setSelectedMonth(savedMonth);
    setSelectedYear(savedYear);

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

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalSlots = [...blanks, ...days];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate < today) return;

    // Reset instant execution check
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      if (onSelectRange) onSelectRange(clickedDate, null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
        if (onSelectRange) onSelectRange(clickedDate, null);
      } else {
        setEndDate(clickedDate);
        if (onSelectRange) onSelectRange(startDate, clickedDate);
      }
    }
  };

  return (
    <div className="w-fit border border-slate-100 bg-white shadow-xl rounded-2xl p-6 font-sans">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="font-bold text-slate-800 text-base">
          {months[month]} {year}
        </h3>
        {mode === "exact" && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xs transition-all"
            >
              ◀
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xs transition-all"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: MONTH PICKER */}
      {mode === "month" && (
        <div className="grid grid-cols-4 gap-3 w-80">
          {months.map((m, index) => {
            const isPickedMonth =
              index === selectedMonth && year === selectedYear;
            return (
              <button
                key={m}
                onClick={() => {
                  setSelectedMonth(index);
                  setSelectedYear(year);
                  if (onSelectMonth) onSelectMonth(index, year);
                  setCurrentDate(new Date(year, index, 1));
                }}
                className={`py-3 px-2 text-sm font-medium rounded-xl transition-all ${
                  isPickedMonth
                    ? "bg-[#001f2b] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:bg-[#eef2f6]"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      )}

      {/* VIEW 2: EXACT DATE RANGE PICKER */}
      {mode === "exact" && (
        <div className="w-80">
          <div className="grid grid-cols-7 text-center mb-3 text-sm font-medium text-slate-400">
            {daysOfWeek.map((day) => (
              <div key={day} className="h-8 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-sm font-normal">
            {totalSlots.map((day, idx) => {
              if (day === null)
                return <div key={`empty-${idx}`} className="h-9 w-9" />;

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

              let dayStyles = "text-slate-600 hover:bg-[#eef2f6]";

              if (isPast) {
                dayStyles = "text-slate-300 cursor-not-allowed line-through";
              } else if (isStart || isEnd) {
                dayStyles = "bg-[#001f2b] text-white font-bold shadow-sm";
              } else if (isInRange) {
                dayStyles = "bg-[#eef2f6] text-slate-700 font-medium";
              }

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDayClick(day)}
                  className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all ${dayStyles}`}
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
