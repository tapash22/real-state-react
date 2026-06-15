import React, { useState } from "react";

type DateMode = "month" | "exact";

interface CalendarViewProps {
  mode: DateMode;
  onSelectRange?: (start: Date | null, end: Date | null) => void;
  onSelectMonth?: (monthIndex: number, year: number) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  mode,
  onSelectRange,
  onSelectMonth,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  // Range Logic handler
  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      // First click, or resetting a full range
      setStartDate(clickedDate);
      setEndDate(null);
      if (onSelectRange) onSelectRange(clickedDate, null);
    } else if (startDate && !endDate) {
      // Second click: if clicked date is before start date, turn it into the new start date
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
    <div className="w-80 border border-slate-200 bg-white shadow-xl rounded-2xl p-4 font-sans mt-4 ">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-bold text-cyan-950 text-base">
          {months[month]} {year}
        </h3>
        {mode === "exact" && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 text-sm"
            >
              ◀
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 text-sm"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: MONTH PICKER */}
      {mode === "month" && (
        <div className="grid grid-cols-3 gap-2 z-50">
          {months.map((m, index) => {
            const isCurrentMonth = index === month;
            return (
              <button
                key={m}
                onClick={() => {
                  if (onSelectMonth) onSelectMonth(index, year);
                  setCurrentDate(new Date(year, index, 1));
                }}
                className={`py-3 text-sm font-medium rounded-xl transition-all ${
                  isCurrentMonth
                    ? "bg-[#002228] text-white font-bold shadow-md"
                    : "text-slate-700 hover:bg-[#e9eff4]"
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
        <div>
          <div className="grid grid-cols-7 text-center mb-1 text-xs font-semibold text-slate-400">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium">
            {totalSlots.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} />;

              const thisDate = new Date(year, month, day);

              // Direct match checks using timestamps
              const isStart =
                startDate?.toDateString() === thisDate.toDateString();
              const isEnd = endDate?.toDateString() === thisDate.toDateString();
              const isInRange =
                startDate &&
                endDate &&
                thisDate > startDate &&
                thisDate < endDate;

              return (
                <div
                  key={`day-${day}`}
                  className={`py-0.5 flex justify-center items-center ${
                    isInRange ? "bg-[#e9eff4]/70" : ""
                  } ${isStart && endDate ? "rounded-l-full bg-[#e9eff4]/70" : ""} ${
                    isEnd ? "rounded-r-full bg-[#e9eff4]/70" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(day)}
                    className={`h-9 w-9 flex items-center justify-center rounded-full transition-all ${
                      isStart || isEnd
                        ? "bg-[#002228] text-white font-bold shadow-md"
                        : "text-slate-700 hover:bg-[#e9eff4]"
                    }`}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
