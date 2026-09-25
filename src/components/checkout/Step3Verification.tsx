import type { CheckoutStepProps } from "../../data";

import CheckoutStepHeader from "./CheckoutStepHeader";
import FileUploadField from "./FileUploadField";
import FormField from "./FormField";
import { checkboxClass, inputClass } from "./formStyles";

export default function Step3Verification({
  formData,
  errors,
  handleInputChange,
  handleFileChange,
}: CheckoutStepProps) {
  return (
    <div className="animate-in space-y-5 fade-in duration-200">
      <CheckoutStepHeader
        title="3. Verification & Income"
        description="Provide your employment, income and identity documents."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField
          label="University / Employer"
          htmlFor="organization"
          required
          error={errors.organization}
        >
          <input
            id="organization"
            type="text"
            value={formData.organization}
            onChange={(event) =>
              handleInputChange("organization", event.target.value)
            }
            placeholder="e.g. Tech GmbH"
            className={inputClass(errors.organization)}
          />
        </FormField>

        <FormField
          label="Net Monthly Income (€)"
          htmlFor="monthlyIncome"
          required
          error={errors.monthlyIncome}
        >
          <input
            id="monthlyIncome"
            type="number"
            min="0"
            value={formData.monthlyIncome}
            onChange={(event) =>
              handleInputChange("monthlyIncome", event.target.value)
            }
            placeholder="e.g. 2400"
            className={inputClass(errors.monthlyIncome)}
          />
        </FormField>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--border)] p-4">
        <input
          type="checkbox"
          checked={formData.hasGuarantor}
          onChange={(event) =>
            handleInputChange("hasGuarantor", event.target.checked)
          }
          className={checkboxClass}
        />

        <span className="text-xs font-medium leading-5 text-[var(--text)]">
          I have a parent or third-party guarantor for my rental payments.
        </span>
      </label>

      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">
            Required Documents
          </h3>

          <p className="mt-1 text-xs text-[var(--muted)]">
            PDF, JPG or PNG documents are accepted.
          </p>
        </div>

        <FileUploadField
          id="passport-upload"
          title="Passport / Government ID *"
          description="Click to upload document"
          uploaded={formData.filesUploaded.passport}
          error={errors.passport}
          onChange={(event) => handleFileChange(event, "passport")}
        />

        <FileUploadField
          id="income-upload"
          title="Proof of Income *"
          description="Salary slip / income proof"
          uploaded={formData.filesUploaded.income}
          error={errors.income}
          onChange={(event) => handleFileChange(event, "income")}
        />
      </div>
    </div>
  );
}
