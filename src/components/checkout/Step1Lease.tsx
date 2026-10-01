import { BsShieldCheck } from "react-icons/bs";
import { TbCalendarEvent } from "react-icons/tb";
import type { CheckoutStepProps } from "../../data";
import {
  CalendarInputPicker,
  PickerRawData,
} from "../calendar/CalendarInputPicker";
import { Dropdown } from "../dropdown/Dropdown";
import CheckoutStepHeader from "./CheckoutStepHeader";
import FormField from "./FormField";

export default function Step1Lease({
  formData,
  errors,
  bookingDates,
  handleInputChange,
}: CheckoutStepProps) {
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
          <div className="text-xs space-x-2">
            <p className="font-bold text-[var(--text)]">
              Pre-selected Rental Period:{" "}
            </p>
            <p className="font-medium text-[var(--muted)]">
              {bookingDates.formatted}
            </p>
          </div>
        </div>
      )}

      {/* Date Picker Section */}
      <div className="space-y-4">
        <FormField
          label="Rental Period (Move-in to Move-out)"
          htmlFor="rentalPeriod"
          required
          error={errors.moveInDate || errors.moveOutDate}
        >
          <CalendarInputPicker
            placeholder="Select range..."
            onChange={handleCalendarChange}
          />
        </FormField>
      </div>

      {/* Occupants and Resident Status */}
      <div className="grid grid-cols-1 gap-5 bg-transparent md:grid-cols-2">
        <FormField label="Number of Occupants" htmlFor="occupants">
          <Dropdown
            label="Select occupants"
            selectedValue={formData.occupants || ""}
            options={["1 Person", "2 People"]}
            onSelect={(selectedText) => {
              handleInputChange("occupants", selectedText);
            }}
          />
        </FormField>

        <FormField label="Resident Status" htmlFor="residentStatus">
          <Dropdown
            label="Select status"
            selectedValue={formData.residentStatus || ""}
            options={["Student", "Professional", "Family"]}
            onSelect={(selectedValue) => {
              handleInputChange("residentStatus", selectedValue);
            }}
          />
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
