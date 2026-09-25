import type { CheckoutStepProps } from "../../data";
import CheckoutStepHeader from "./CheckoutStepHeader";
import FormField from "./FormField";
import { inputClass } from "./formStyles";

export default function Step2Personal({
  formData,
  errors,
  handleInputChange,
}: CheckoutStepProps) {
  return (
    <div className="animate-in space-y-6 fade-in duration-200">
      <CheckoutStepHeader
        title="2. Personal Information"
        description="Provide your contact and emergency contact information."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormField
          label="Full Name"
          htmlFor="fullName"
          required
          error={errors.fullName}
        >
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(event) =>
              handleInputChange("fullName", event.target.value)
            }
            placeholder="Enter your full name"
            className={inputClass(errors.fullName)}
          />
        </FormField>

        <FormField
          label="Full Name"
          htmlFor="fullName"
          required
          error={errors.email}
        >
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
            placeholder="you@example.com"
            className={inputClass(errors.email)}
          />
        </FormField>

        <FormField
          label="Phone Number"
          htmlFor="phone"
          required
          error={errors.phone}
        >
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(event) => handleInputChange("phone", event.target.value)}
            placeholder="+880 1XXXXXXXXX"
            className={inputClass(errors.phone)}
          />
        </FormField>

        <FormField
          label="Current Address"
          htmlFor="currentAddress"
          required
          error={errors.currentAddress}
        >
          <input
            id="currentAddress"
            type="text"
            value={formData.currentAddress}
            onChange={(event) =>
              handleInputChange("currentAddress", event.target.value)
            }
            placeholder="Current residential address"
            className={inputClass(errors.currentAddress)}
          />
        </FormField>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-700">
          Emergency Contact
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label="Contact Name" htmlFor="emergencyName">
            <input
              id="emergencyName"
              type="text"
              value={formData.emergencyName}
              onChange={(event) =>
                handleInputChange("emergencyName", event.target.value)
              }
              className={inputClass()}
            />
          </FormField>

          <FormField label="Contact Phone" htmlFor="emergencyPhone">
            <input
              id="emergencyPhone"
              type="tel"
              value={formData.emergencyPhone}
              onChange={(event) =>
                handleInputChange("emergencyPhone", event.target.value)
              }
              className={inputClass()}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
