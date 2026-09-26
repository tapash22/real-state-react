import { BsShieldCheck } from "react-icons/bs";

import type { CheckoutStepProps } from "../../data";

import { useState } from "react";
import { TbCalendarEvent } from "react-icons/tb";
import {
  CalendarInputPicker,
  DateMode,
  PickerRawData,
} from "../calendar/CalendarInputPicker";
import CheckoutStepHeader from "./CheckoutStepHeader";
import FormField from "./FormField";
import { selectClass } from "./formStyles";

export default function Step1Lease({
  formData,
  errors,
  bookingDates,
  handleInputChange,
}: CheckoutStepProps) {
  // Mode toggle state for CalendarInputPicker ("exact" range vs "month")
  const [dateMode, setDateMode] = useState<DateMode>(
    bookingDates?.mode || "exact",
  );

  // Handle date selection from custom CalendarInputPicker
  const handleCalendarChange = (
    formattedValue: string,
    rawData: PickerRawData,
  ) => {
    if (rawData.startDate && rawData.endDate) {
      handleInputChange("moveInDate", rawData.startDate.toLocaleDateString());
      handleInputChange("moveOutDate", rawData.endDate.toLocaleDateString());
    } else if (rawData.monthIndex !== undefined && rawData.year !== undefined) {
      handleInputChange("moveInDate", formattedValue);
      handleInputChange("moveOutDate", formattedValue);
    } else {
      handleInputChange("moveInDate", formattedValue);
    }
  };

  const initialPlaceholder =
    formData.moveInDate && formData.moveOutDate
      ? `${formData.moveInDate} - ${formData.moveOutDate}`
      : formData.moveInDate || "Select move-in & move-out dates...";

  return (
    <div className="animate-in space-y-6 fade-in duration-200">
      <CheckoutStepHeader
        title="1. Lease Dates & Occupancy"
        description="Tell us when you want to move in and how many people will occupy the property."
      />

      {/* Selected Period Badge if passed via state */}
      {bookingDates?.formatted && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
          <TbCalendarEvent className="h-5 w-5 shrink-0 text-[var(--primary)]" />
          <div className="text-xs">
            <span className="font-bold text-[var(--text)]">
              Pre-selected Rental Period:{" "}
            </span>
            <span className="font-medium text-[var(--muted)]">
              {bookingDates.formatted}
            </span>
          </div>
        </div>
      )}

      {/* Date Picker Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--text)]">
            Select Rental Period
          </span>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setDateMode("exact")}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                dateMode === "exact"
                  ? "bg-[var(--primary)] text-white font-bold"
                  : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]"
              }`}
            >
              Exact Dates
            </button>
            <button
              type="button"
              onClick={() => setDateMode("month")}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                dateMode === "month"
                  ? "bg-[var(--primary)] text-white font-bold"
                  : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]"
              }`}
            >
              By Month
            </button>
          </div>
        </div>

        <FormField
          label="Rental Period (Move-in to Move-out)"
          htmlFor="rentalPeriod"
          required
          error={errors.moveInDate || errors.moveOutDate}
        >
          <CalendarInputPicker
            mode={dateMode}
            placeholder={initialPlaceholder}
            onChange={handleCalendarChange}
          />
        </FormField>
      </div>

      {/* Occupants and Resident Status */}
      <div className="grid grid-cols-1 gap-5 bg-transparent md:grid-cols-2">
        <FormField label="Number of Occupants" htmlFor="occupants">
          <select
            id="occupants"
            value={formData.occupants}
            onChange={(event) =>
              handleInputChange("occupants", event.target.value)
            }
            className={selectClass}
          >
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
          </select>
        </FormField>

        <FormField label="Resident Status" htmlFor="residentStatus">
          <select
            id="residentStatus"
            value={formData.residentStatus}
            onChange={(event) =>
              handleInputChange("residentStatus", event.target.value)
            }
            className={selectClass}
          >
            <option value="">Select status</option>
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
            <option value="Family">Family</option>
          </select>
        </FormField>
      </div>

      <div className="rounded-2xl border border-[var(--border)] p-4">
        <div className="flex gap-3">
          <BsShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text)]" />

          <div>
            <h3 className="text-xs font-bold text-[var(--text)]">
              Minimum stay: 3 months
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--text)]">
              Your selected dates will be used to calculate the estimated rental
              duration and initial payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
