import { BsShieldCheck } from "react-icons/bs";

import type { CheckoutStepProps } from "../../data";

import CheckoutStepHeader from "./CheckoutStepHeader";
import FormField from "./FormField";
import { inputClass, selectClass } from "./formStyles";

export default function Step1Lease({
  formData,
  errors,
  handleInputChange,
}: CheckoutStepProps) {
  return (
    <div className="animate-in space-y-6 fade-in duration-200">
      <CheckoutStepHeader
        title="1. Lease Dates & Occupancy"
        description="Tell us when you want to move in and how many people will occupy the property."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 bg-transparent">
        <FormField
          label="Move-in Date"
          htmlFor="moveInDate"
          required
          error={errors.moveInDate}
        >
          <input
            id="moveInDate"
            type="date"
            value={formData.moveInDate}
            onChange={(event) =>
              handleInputChange("moveInDate", event.target.value)
            }
            className={inputClass(errors.moveInDate)}
          />
        </FormField>

        <FormField
          label="Move-out Date"
          htmlFor="moveOutDate"
          required
          error={errors.moveOutDate}
        >
          <input
            id="moveOutDate"
            type="date"
            value={formData.moveOutDate}
            onChange={(event) =>
              handleInputChange("moveOutDate", event.target.value)
            }
            className={inputClass(errors.moveOutDate)}
          />
        </FormField>

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
