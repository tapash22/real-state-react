import { ChangeEvent, useMemo, useState } from "react";
import { CheckoutErrors, CheckoutFormData, CheckoutStep } from "../data";

import {
  BsCheckCircleFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
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
  const CurrentStep = STEP_COMPONENTS[currentStep];

  /**
   * ---------------------------------------------------------
   * Success screen
   * ---------------------------------------------------------
   */
  if (submitted) {
    return (
      <div className="min-h-screen  px-4 py-10 sm:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-[var(--border)] p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
              <BsCheckCircleFill className="h-8 w-8 text-[var(--success)]" />
            </div>

            <h1 className="text-2xl font-black text-[var(--text)]">
              Application Submitted
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Your rental application has been submitted successfully. We will
              review your information and contact you shortly.
            </p>

            <div className="mt-6 rounded-2xl  p-5 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Property</span>

                <strong className="text-[var(--text)]">Studio Neon Gold</strong>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-[var(--muted)]">Monthly Rent</span>

                <strong className="text-[var(--text)]">
                  €{costs.monthlyRent.toLocaleString()}
                </strong>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-[var(--muted)]">Initial Payment</span>

                <strong className="text-[var(--danger)]">
                  €{costs.totalDue.toLocaleString()}
                </strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData(INITIAL_FORM_DATA);
                setErrors({});
              }}
              className="mt-7 rounded-xl bg-[var(--danger)] px-6 py-3 text-sm font-bold text-[var(--text)] transition hover:opacity-90"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
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
        <div className="mb-8 overflow-x-auto">
          <div className="flex min-w-[650px] items-center">
            {[1, 2, 3, 4].map((step) => {
              const stepNumber = step as CheckoutStep;

              const isActive = currentStep === stepNumber;

              const isCompleted = currentStep > stepNumber;

              return (
                <div key={stepNumber} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => handleStepClick(stepNumber)}
                    className="flex items-center gap-2 "
                  >
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition",
                        isActive
                          ? "bg-[var(--secondary)] text-[var(--text)]"
                          : isCompleted
                            ? "bg-[var(--success)] text-[var(--text)]"
                            : "bg-[var(--card)] text-[var(--muted)]",
                      ].join(" ")}
                    >
                      {isCompleted ? (
                        <BsCheckCircleFill className="h-4 w-4 text-[var(--success)]" />
                      ) : (
                        stepNumber
                      )}
                    </span>

                    <span
                      className={[
                        "whitespace-nowrap text-xs font-normal tracking-wide",
                        isActive ? "text-[var(--text)]" : "text-[var(--muted)]",
                      ].join(" ")}
                    >
                      {STEP_LABELS[stepNumber]}
                    </span>
                  </button>

                  {stepNumber < 4 && (
                    <div
                      className={[
                        "mx-1 h-[3px] flex-1 rouded-sm",
                        currentStep > stepNumber
                          ? "bg-[var(--success)]"
                          : "bg-[var(--border)]",
                      ].join(" ")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------
            Main checkout layout
        -------------------------------------------------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* ------------------------------------------------
              Form
          ------------------------------------------------ */}
          <main className="rounded-3xl border-2 border-[var(--border)]  p-5 shadow-sm sm:p-7">
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
            <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={[
                  "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition",
                  currentStep === 1
                    ? "cursor-not-allowed text-[var(--muted)]"
                    : "text-[var(--text)] hover:text-[var(--text)]",
                ].join(" ")}
              >
                <BsChevronLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl  bg-[var(--primary)] px-5 py-3 text-sm font-bold text-[var(--text)] shadow-sm transition hover:opacity-90"
              >
                {currentStep === 4 ? "Submit Application" : "Continue"}

                {currentStep !== 4 && (
                  <BsChevronRight className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </main>

          {/* ------------------------------------------------
              Property / payment summary
          ------------------------------------------------ */}
          <aside className="h-fit rounded-3xl border border-[var(--border)] p-5 shadow-sm">
            <div className="overflow-hidden rounded-2xl">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100">
                <span className="text-xs font-bold text-[var(--muted)]">
                  Property Image
                </span>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-base font-black text-[var(--text)]">
                Studio Neon Gold Floor 5
              </h2>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Mitte-Wedding, Berlin
              </p>
            </div>

            <div className="my-5 border-t border-[var(--border)]" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">
                  Monthly Rent
                </span>

                <strong className="text-sm text-[var(--text)]">
                  €{costs.monthlyRent.toLocaleString()}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">
                  Security Deposit
                </span>

                <strong className="text-sm text-[var(--text)]">
                  €{costs.deposit.toLocaleString()}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">
                  Registration Fee
                </span>

                <strong className="text-sm text-[var(--text)]">
                  €{costs.adminFee.toLocaleString()}
                </strong>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--text)]">
                    Total Due
                  </span>

                  <strong className="text-lg font-black text-[var(--danger)]">
                    €{costs.totalDue.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl p-4">
              <p className="text-[11px] leading-5 text-[var(--muted)]">
                Your initial payment is calculated from the monthly rent,
                security deposit and registration fee.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
