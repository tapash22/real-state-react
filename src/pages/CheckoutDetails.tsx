import { ChangeEvent, useMemo, useState } from "react";
import {
  CHECKOUT_STEPS,
  CheckoutErrors,
  CheckoutFormData,
  CheckoutStep,
  FileType,
  INITIAL_FORM_DATA,
  RoomUnit,
  STEP_COMPONENTS,
  TOTAL_STEPS,
} from "../data";

import CheckoutFormNavigation from "../components/checkout/CheckoutFormNavigation";
import CheckoutPropertySummary from "../components/checkout/CheckoutPropertySummary";
import CheckoutStepProgress from "../components/checkout/CheckoutStepProgress";
import CheckoutSubmissionSuccess from "../components/checkout/CheckoutSubmissionSuccess";

import { useLocation } from "react-router-dom";
import { STEP_SCHEMAS } from "../components/checkout/checkout.schema";
import { validate } from "../utils/validations/formValidation";

interface CheckoutLocationState {
  unit?: RoomUnit;
  residenceTitle?: string;
}

export default function CheckoutDetails() {
  const location = useLocation();

  const checkoutState = location.state as CheckoutLocationState | null;
  const selectedUnit = checkoutState?.unit ?? null;
  const residenceTitle = checkoutState?.residenceTitle || "Residence";

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const propertyName = selectedUnit?.title || "Selected Property";

  const monthlyRent = selectedUnit?.pricePerMonth || 0;

  const deposit = selectedUnit?.paymentDetails?.deposit || monthlyRent;
  const adminFee = 99;

  const costs = useMemo(
    () => ({
      monthlyRent,
      deposit,
      adminFee,
      totalDue: monthlyRent + deposit + adminFee,
    }),
    [monthlyRent, deposit],
  );

  const handleInputChange = (
    field: keyof CheckoutFormData,
    value: string | boolean,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    // Clear field error when user changes it.
    setErrors((previous) => {
      if (!previous[field as keyof CheckoutErrors]) {
        return previous;
      }

      const nextErrors = { ...previous };

      delete nextErrors[field as keyof CheckoutErrors];

      return nextErrors;
    });
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: FileType,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData((previous) => ({
      ...previous,
      filesUploaded: {
        ...previous.filesUploaded,
        [type]: true,
      },
    }));

    // Clear document error upon upload
    setErrors((previous) => {
      const nextErrors = { ...previous };
      delete nextErrors[type];
      return nextErrors;
    });
  };

  const validateStep = (step: CheckoutStep): boolean => {
    const schema = STEP_SCHEMAS[step];
    if (!schema) return true;

    const nextErrors = validate<CheckoutFormData, CheckoutErrors>(
      formData,
      schema,
    );
    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleStepClick = (step: CheckoutStep) => {
    const isValid = validateStep(currentStep);
    if (isValid) return setCurrentStep(step);
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(
        (previous) => Math.min(TOTAL_STEPS, previous + 1) as CheckoutStep,
      );
      return;
    }

    setSubmitted(true);
    console.log("Checkout submitted successfully:", { formData, costs });
  };

  const handleBack = () => {
    if (currentStep === 1) return;
    setCurrentStep((previous) => Math.max(1, previous - 1) as CheckoutStep);
  };

  const CurrentStep = STEP_COMPONENTS[currentStep];

  const handleStartNewApplication = () => {
    setSubmitted(false);
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  if (submitted) {
    return (
      <CheckoutSubmissionSuccess
        propertyName={propertyName}
        monthlyRent={costs.monthlyRent}
        totalDue={costs.totalDue}
        onStartNew={handleStartNewApplication}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[var(--text)] sm:text-3xl">
            Complete Your Application
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Provide your information to reserve this property.
          </p>
        </div>

        <CheckoutStepProgress
          steps={CHECKOUT_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <main className="rounded-3xl border-2 border-[var(--border)] p-5 shadow-sm sm:p-7 space-y-3">
            <CurrentStep
              formData={formData}
              errors={errors}
              costs={costs}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
            />

            <CheckoutFormNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onBack={handleBack}
              onNext={handleNext}
              nextLabel="Continue"
              submitLabel="Submit Application"
            />
          </main>

          <CheckoutPropertySummary
            propertyName={propertyName}
            location={residenceTitle}
            costs={costs}
          />
        </div>
      </div>
    </div>
  );
}
