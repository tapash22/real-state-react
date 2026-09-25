import type { CheckoutStepProps } from "../../data";

import CheckoutStepHeader from "./CheckoutStepHeader";
import FieldError from "./FieldError";
import ReviewSection, { ReviewItem } from "./ReviewSection";
import { checkboxClass } from "./formStyles";

export default function Step4Review({
  formData,
  errors,
  costs,
  handleInputChange,
  handleStepClick,
}: CheckoutStepProps) {
  return (
    <div className="animate-in space-y-5 fade-in duration-200">
      <CheckoutStepHeader
        title="4. Review & Confirm"
        description="Review your application before submitting it."
      />

      {/* Lease */}
      <ReviewSection
        title="Lease & Property"
        step={1}
        onEdit={handleStepClick ?? (() => {})}
      >
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <ReviewItem label="Property" value="Studio Neon Gold Floor 5" />

          <ReviewItem label="Location" value="Mitte-Wedding, Berlin" />

          <ReviewItem label="Move-in" value={formData.moveInDate || "-"} />

          <ReviewItem label="Move-out" value={formData.moveOutDate || "-"} />

          <ReviewItem label="Occupants" value={formData.occupants || "-"} />

          <ReviewItem label="Status" value={formData.residentStatus || "-"} />
        </div>
      </ReviewSection>

      {/* Applicant */}
      <ReviewSection
        title="Applicant"
        step={2}
        onEdit={handleStepClick ?? (() => {})}
      >
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <ReviewItem label="Name" value={formData.fullName || "-"} />

          <ReviewItem label="Email" value={formData.email || "-"} />

          <ReviewItem label="Phone" value={formData.phone || "-"} />

          <ReviewItem
            label="Income"
            value={`€${formData.monthlyIncome || "0"} / month`}
          />
        </div>
      </ReviewSection>

      {/* Verification */}
      <ReviewSection
        title="Verification"
        step={3}
        onEdit={handleStepClick ?? (() => {})}
      >
        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <ReviewItem
            label="Organization"
            value={formData.organization || "-"}
          />

          <ReviewItem
            label="Guarantor"
            value={formData.hasGuarantor ? "Yes" : "No"}
          />

          <ReviewItem
            label="Identity"
            value={formData.filesUploaded.passport ? "Uploaded" : "Missing"}
            valueClassName={
              formData.filesUploaded.passport
                ? "text-emerald-600"
                : "text-[var(--danger)]"
            }
          />

          <ReviewItem
            label="Income proof"
            value={formData.filesUploaded.income ? "Uploaded" : "Missing"}
            valueClassName={
              formData.filesUploaded.income
                ? "text-emerald-600"
                : "text-[var(--danger)]"
            }
          />
        </div>
      </ReviewSection>

      {/* Cost */}
      <div className="rounded-2xl border border-[var(--border)] p-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          Initial Payment
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Monthly Rent</span>

            <strong>€{costs.monthlyRent.toLocaleString()}</strong>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Security Deposit</span>

            <strong>€{costs.deposit.toLocaleString()}</strong>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--muted)]">Registration Fee</span>

            <strong>€{costs.adminFee.toLocaleString()}</strong>
          </div>

          <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base font-black text-[var(--danger)]">
            <span>Total Initial Payment</span>

            <span>€{costs.totalDue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--border)]p-4">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(event) =>
              handleInputChange("agreeTerms", event.target.checked)
            }
            className={checkboxClass}
          />

          <span className="text-xs leading-5 text-[var(--muted)]">
            I declare that all provided details and documents are authentic. I
            accept the{" "}
            <a
              href="/terms"
              className="font-semibold text-[var(--danger)] underline"
            >
              Thikana Terms of Service
            </a>{" "}
            and background check policy.
          </span>
        </label>

        <FieldError message={errors.agreeTerms} />
      </div>
    </div>
  );
}
