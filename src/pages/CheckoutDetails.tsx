import { ChangeEvent, useMemo, useState } from "react";
import { CheckoutErrors, CheckoutFormData, CheckoutStep } from "../data";

import CheckoutFormNavigation from "../components/checkout/CheckoutFormNavigation";
import CheckoutPropertySummary from "../components/checkout/CheckoutPropertySummary";
import CheckoutStepProgress from "../components/checkout/CheckoutStepProgress";
import CheckoutSubmissionSuccess from "../components/checkout/CheckoutSubmissionSuccess";
import Step1Lease from "../components/checkout/Step1Lease";
import Step2Personal from "../components/checkout/Step2Personal";
import Step3Verification from "../components/checkout/Step3Verification";
import Step4Review from "../components/checkout/Step4Review";

const STEP_COMPONENTS = {
  1: Step1Lease,
  2: Step2Personal,
  3: Step3Verification,
  4: Step4Review,
} as const;

const STEP_LABELS = {
  1: "Lease & Occupancy",
  2: "Personal Information",
  3: "Verification",
  4: "Review & Confirm",
} as const;

const INITIAL_FORM_DATA: CheckoutFormData = {
  moveInDate: "",
  moveOutDate: "",
  occupants: "1",
  residentStatus: "",

  fullName: "",
  email: "",
  phone: "",
  currentAddress: "",

  emergencyName: "",
  emergencyPhone: "",

  organization: "",
  monthlyIncome: "",
  hasGuarantor: false,

  filesUploaded: {
    passport: false,
    income: false,
  },

  agreeTerms: false,
};

export default function CheckoutDetails() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitted, setSubmitted] = useState(false);

  /**
   * ---------------------------------------------------------
   * Property / payment information
   * ---------------------------------------------------------
   *
   * Replace these values with your actual selected property
   * data when you connect checkout with your property page.
   */
  const costs = useMemo(
    () => ({
      monthlyRent: 1559,
      deposit: 1559,
      adminFee: 99,
      totalDue: 1559 + 1559 + 99,
    }),
    [],
  );

  /**
   * ---------------------------------------------------------
   * Input handler
   * ---------------------------------------------------------
   */
  const handleInputChange = (
    field: keyof CheckoutFormData,
    value: string | boolean,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    /**
     * Remove the error for the field once the user starts
     * correcting it.
     */
    setErrors((previous) => {
      if (!previous[field as keyof CheckoutErrors]) {
        return previous;
      }

      const nextErrors = {
        ...previous,
      };

      delete nextErrors[field as keyof CheckoutErrors];

      return nextErrors;
    });
  };

  /**
   * ---------------------------------------------------------
   * File handler
   * ---------------------------------------------------------
   */

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "passport" | "income",
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    /**
     * Update uploaded state.
     */
    setFormData((previous) => ({
      ...previous,
      filesUploaded: {
        ...previous.filesUploaded,
        [type]: true,
      },
    }));

    /**
     * Remove file validation error.
     */
    setErrors((previous) => {
      const nextErrors = {
        ...previous,
      };

      delete nextErrors[type];

      return nextErrors;
    });
  };

  /**
   * ---------------------------------------------------------
   * Validation
   * ---------------------------------------------------------
   */
  const validateStep = (step: CheckoutStep): boolean => {
    const nextErrors: CheckoutErrors = {};

    /**
     * Step 1
     */
    if (step === 1) {
      if (!formData.moveInDate) {
        nextErrors.moveInDate = "Please select a move-in date.";
      }

      if (!formData.moveOutDate) {
        nextErrors.moveOutDate = "Please select a move-out date.";
      }

      if (
        formData.moveInDate &&
        formData.moveOutDate &&
        new Date(formData.moveOutDate) <= new Date(formData.moveInDate)
      ) {
        nextErrors.moveOutDate =
          "Move-out date must be after the move-in date.";
      }
    }

    /**
     * Step 2
     */
    if (step === 2) {
      if (!formData.fullName.trim()) {
        nextErrors.fullName = "Full name is required.";
      }

      if (!formData.email.trim()) {
        nextErrors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        nextErrors.email = "Please enter a valid email address.";
      }

      if (!formData.phone.trim()) {
        nextErrors.phone = "Phone number is required.";
      }

      if (!formData.currentAddress.trim()) {
        nextErrors.currentAddress = "Current address is required.";
      }
    }

    /**
     * Step 3
     */
    if (step === 3) {
      if (!formData.organization.trim()) {
        nextErrors.organization = "University or employer is required.";
      }

      if (!formData.monthlyIncome.trim()) {
        nextErrors.monthlyIncome = "Monthly income is required.";
      } else if (Number(formData.monthlyIncome) <= 0) {
        nextErrors.monthlyIncome = "Monthly income must be greater than 0.";
      }

      if (!formData.filesUploaded.passport) {
        nextErrors.passport = "Please upload your passport or government ID.";
      }

      if (!formData.filesUploaded.income) {
        nextErrors.income = "Please upload your proof of income.";
      }
    }

    /**
     * Step 4
     */
    if (step === 4) {
      if (!formData.agreeTerms) {
        nextErrors.agreeTerms = "You must accept the terms before submitting.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /**
   * ---------------------------------------------------------
   * Step navigation
   * ---------------------------------------------------------
   */
  const handleStepClick = (step: CheckoutStep) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);

    if (!isValid) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((previous) => Math.min(4, previous + 1) as CheckoutStep);

      return;
    }

    /**
     * Final submit.
     */
    setSubmitted(true);

    console.log("Checkout submitted:", {
      formData,
      costs,
    });
  };

  const handleBack = () => {
    if (currentStep === 1) {
      return;
    }

    setCurrentStep((previous) => Math.max(1, previous - 1) as CheckoutStep);
  };

  /**
   * ---------------------------------------------------------
   * Current step component
   * ---------------------------------------------------------
   */

  const CHECKOUT_STEPS = [1, 2, 3, 4].map((step) => ({
    value: step as CheckoutStep,
    label: STEP_LABELS[step as CheckoutStep],
  }));

  const CurrentStep = STEP_COMPONENTS[currentStep];

  const handleStartNewApplication = () => {
    setSubmitted(false);
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  /**
   * ---------------------------------------------------------
   * Success screen
   * ---------------------------------------------------------
   */
  if (submitted) {
    return (
      <CheckoutSubmissionSuccess
        propertyName="Studio Neon Gold"
        monthlyRent={costs.monthlyRent}
        totalDue={costs.totalDue}
        onStartNew={handleStartNewApplication}
      />
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* --------------------------------------------------
            Header
        -------------------------------------------------- */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[var(--text)] sm:text-3xl">
            Complete Your Application
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Provide your information to reserve this property.
          </p>
        </div>

        {/* --------------------------------------------------
            Step indicator
        -------------------------------------------------- */}

        <CheckoutStepProgress
          steps={CHECKOUT_STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {/* --------------------------------------------------
            Main checkout layout
        -------------------------------------------------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* ------------------------------------------------
              Form
          ------------------------------------------------ */}
          <main className="rounded-3xl border-2 border-[var(--border)]  p-5 shadow-sm sm:p-7 space-y-3">
            <CurrentStep
              formData={formData}
              errors={errors}
              costs={costs}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              handleStepClick={handleStepClick}
            />
            {/* ------------------------------------------------
                Navigation
            ------------------------------------------------ */}
            <CheckoutFormNavigation
              currentStep={currentStep}
              totalSteps={4}
              onBack={handleBack}
              onNext={handleNext}
            />
          </main>

          {/* ------------------------------------------------
              Property / payment summary
          ------------------------------------------------ */}
          <CheckoutPropertySummary
            propertyName="Studio Neon Gold Floor 5"
            location="Mitte-Wedding, Berlin"
            costs={costs}
          />
        </div>
      </div>
    </div>
  );
}
