import { ChangeEvent, useMemo, useState } from "react";
import {
  BsFileEarmarkCheck,
  BsShieldCheck,
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCheck,
  FaCheckCircle,
  FaExclamationCircle,
  FaMapMarkerAlt,
} from "../components/icons/icons";
import {
  createInitialFormData,
  DEMO_DATA,
  FileKey,
  FormData,
  FormErrors,
  Step,
  STEPS,
} from "../data";

export default function CheckoutDetails() {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const [formData, setFormData] = useState<FormData>(createInitialFormData);

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [applicationRef, setApplicationRef] = useState("");

  /* =======================================================
     COST CALCULATION
  ======================================================= */

  const costs = useMemo(() => {
    const baseRent = 1559;

    const extraOccupantFee = formData.occupants === "2" ? 100 : 0;

    const monthlyRent = baseRent + extraOccupantFee;

    const deposit = monthlyRent;

    const adminFee = 150;

    const start = new Date(formData.moveInDate || "2026-10-01");

    const end = new Date(formData.moveOutDate || "2027-03-31");

    const difference = end.getTime() - start.getTime();

    const months = Math.max(
      1,
      Math.round(difference / (1000 * 60 * 60 * 24 * 30.4)),
    );

    return {
      monthlyRent,
      deposit,
      adminFee,
      totalDue: monthlyRent + deposit + adminFee,
      months,
    };
  }, [formData.moveInDate, formData.moveOutDate, formData.occupants]);

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateStep = (step: Step): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.moveInDate) {
        newErrors.moveInDate = "Move-in date is required";
      }

      if (!formData.moveOutDate) {
        newErrors.moveOutDate = "Move-out date is required";
      }

      if (
        formData.moveInDate &&
        formData.moveOutDate &&
        new Date(formData.moveOutDate) <= new Date(formData.moveInDate)
      ) {
        newErrors.moveOutDate = "Move-out date must be after move-in date";
      }
    }

    if (step === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email address format";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }

      if (!formData.currentAddress.trim()) {
        newErrors.currentAddress = "Current address is required";
      }
    }

    if (step === 3) {
      if (!formData.organization.trim()) {
        newErrors.organization = "University or Employer is required";
      }

      if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0) {
        newErrors.monthlyIncome = "Valid monthly income is required";
      }

      if (!formData.filesUploaded.passport) {
        newErrors.passport = "Passport/ID upload required";
      }

      if (!formData.filesUploaded.income) {
        newErrors.income = "Income proof upload required";
      }
    }

    if (step === 4) {
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = "You must accept the terms to proceed";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     INPUT HANDLERS
  ======================================================= */

  const handleInputChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ): void => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });
  };

  const toggleFileUpload = (fileKey: FileKey): void => {
    setFormData((previous) => ({
      ...previous,
      filesUploaded: {
        ...previous.filesUploaded,
        [fileKey]: !previous.filesUploaded[fileKey],
      },
    }));

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next[fileKey];

      return next;
    });
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    fileKey: FileKey,
  ): void => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      filesUploaded: {
        ...previous.filesUploaded,
        [fileKey]: true,
      },
    }));

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      delete next[fileKey];

      return next;
    });
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handleNext = (): void => {
    const valid = validateStep(currentStep);

    if (!valid) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((previous) => (previous + 1) as Step);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    handleSubmit();
  };

  const handleBack = (): void => {
    if (currentStep === 1) {
      return;
    }

    setCurrentStep((previous) => (previous - 1) as Step);

    setErrors({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStepClick = (step: Step): void => {
    if (step >= currentStep) {
      return;
    }

    setCurrentStep(step);
    setErrors({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     DEMO DATA
  ======================================================= */

  const fillDemoData = (): void => {
    setFormData({
      ...DEMO_DATA,
      filesUploaded: {
        ...DEMO_DATA.filesUploaded,
      },
    } as FormData);

    setErrors({});
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (): void => {
    if (!validateStep(4)) {
      return;
    }

    const randomRef = `TK-${Math.floor(100000 + Math.random() * 900000)}`;

    setApplicationRef(randomRef);

    setIsSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     RESET
  ======================================================= */

  const resetFlow = (): void => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData(createInitialFormData());
    setErrors({});
    setApplicationRef("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     ERROR COMPONENT
  ======================================================= */

  const FieldError = ({ message }: { message?: string }) => {
    if (!message) {
      return null;
    }

    return (
      <p className="mt-1 flex items-center text-xs text-red-500">
        <FaExclamationCircle className="mr-1 h-3 w-3" />
        {message}
      </p>
    );
  };

  /* =======================================================
     SUBMITTED VIEW
  ======================================================= */

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0b1329] text-slate-100">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#0b1329] px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-[#ff4d4d]">
              <FaBuilding className="h-5 w-5 text-white" />
            </div>

            <span className="text-xl font-bold">Thikana</span>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4 py-10">
          <section className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center text-slate-900 shadow-2xl md:p-12">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <FaCheckCircle className="h-14 w-14" />
            </div>

            <div className="mt-7 space-y-3">
              <h1 className="text-3xl font-black">Application Submitted!</h1>

              <p className="mx-auto max-w-lg text-sm leading-6 text-slate-600">
                Thank you <strong>{formData.fullName}</strong>. Your rental
                application for Studio Neon Gold has been successfully
                submitted.
              </p>
            </div>

            <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Application Reference
              </span>

              <span className="mt-2 block font-mono text-2xl font-black tracking-wider text-[#0b1329]">
                {applicationRef}
              </span>
            </div>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-blue-100 bg-blue-50 p-5 text-left">
              <h3 className="flex items-center text-sm font-bold text-blue-900">
                <BsShieldCheck className="mr-2 h-5 w-5 text-blue-600" />
                Next Verification Steps
              </h3>

              <ul className="mt-3 space-y-3 text-xs leading-5 text-blue-800">
                <li>
                  <strong>1.</strong> Landlord reviews your application and
                  documents.
                </li>

                <li>
                  <strong>2.</strong> Identity and income verification is
                  completed.
                </li>

                <li>
                  <strong>3.</strong> You will receive the next rental
                  instructions.
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={resetFlow}
              className="mt-8 rounded-xl bg-[#ff4d4d] px-7 py-3 font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-[#e03e3e]"
            >
              Start New Application
            </button>
          </section>
        </main>
      </div>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* PAGE */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Property</span>
            <span>/</span>
            <span>Application</span>
            <span>/</span>
            <span className="font-semibold text-[#ff4d4d]">
              Checkout Details
            </span>
          </div>

          <div className="mt-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Rental Application
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Complete the following steps to apply for this property.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* =================================================
      LEFT - STEPPER APPLICATION
      Desktop: 8 columns
      Mobile: 1 column
  ================================================== */}
          <section className="min-w-0 lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* STEPPER */}
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-5 sm:px-8">
                <div className="relative mx-auto w-full max-w-3xl">
                  {/* Background line */}
                  <div className="absolute left-[12%] right-[12%] top-5 h-1 bg-slate-200" />

                  {/* Progress line */}
                  <div
                    className="absolute left-[12%] top-5 h-1 bg-[#ff4d4d] transition-all duration-300"
                    style={{
                      width: `${((currentStep - 1) / 3) * 76}%`,
                    }}
                  />

                  {/* Steps */}
                  <div className="relative z-10 flex items-start justify-between">
                    {STEPS.map((step) => {
                      const isActive = currentStep === step.id;
                      const isCompleted = currentStep > step.id;

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => handleStepClick(step.id)}
                          disabled={step.id >= currentStep}
                          className={`flex min-w-0 flex-col items-center ${
                            step.id < currentStep
                              ? "cursor-pointer"
                              : "cursor-default"
                          }`}
                        >
                          {/* Step number */}
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold shadow-sm transition-all ${
                              isActive
                                ? "scale-105 bg-[#ff4d4d] text-white ring-4 ring-red-100"
                                : isCompleted
                                  ? "bg-emerald-600 text-white"
                                  : "bg-white text-slate-500 ring-1 ring-slate-300"
                            }`}
                          >
                            {isCompleted ? (
                              <FaCheck className="h-4 w-4" />
                            ) : (
                              step.id
                            )}
                          </div>

                          {/* Desktop title */}
                          <span
                            className={`mt-2 hidden text-center text-[11px] font-semibold sm:block ${
                              isActive
                                ? "text-[#ff4d4d]"
                                : isCompleted
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                            }`}
                          >
                            {step.title}
                          </span>

                          {/* Mobile title */}
                          <span
                            className={`mt-2 text-center text-[10px] font-semibold sm:hidden ${
                              isActive
                                ? "text-[#ff4d4d]"
                                : isCompleted
                                  ? "text-emerald-600"
                                  : "text-slate-400"
                            }`}
                          >
                            {step.shortTitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* =================================================
          FORM CONTENT
      ================================================== */}
              <div className="p-4 sm:p-8">
                {/* =================================================
            STEP 1
        ================================================== */}
                {currentStep === 1 && (
                  <div className="animate-in space-y-6 fade-in duration-200">
                    <div className="border-b border-slate-100 pb-4">
                      <h2 className="text-xl font-bold text-slate-900">
                        1. Lease Dates & Occupancy
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Tell us when you want to move in and how many people
                        will occupy the property.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* Move In */}
                      <div>
                        <label
                          htmlFor="moveInDate"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Move-in Date *
                        </label>

                        <input
                          id="moveInDate"
                          type="date"
                          value={formData.moveInDate}
                          onChange={(event) =>
                            handleInputChange("moveInDate", event.target.value)
                          }
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.moveInDate
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.moveInDate} />
                      </div>

                      {/* Move Out */}
                      <div>
                        <label
                          htmlFor="moveOutDate"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Move-out Date *
                        </label>

                        <input
                          id="moveOutDate"
                          type="date"
                          value={formData.moveOutDate}
                          onChange={(event) =>
                            handleInputChange("moveOutDate", event.target.value)
                          }
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.moveOutDate
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.moveOutDate} />
                      </div>

                      {/* Occupants */}
                      <div>
                        <label
                          htmlFor="occupants"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Number of Occupants
                        </label>

                        <select
                          id="occupants"
                          value={formData.occupants}
                          onChange={(event) =>
                            handleInputChange("occupants", event.target.value)
                          }
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d]"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                        </select>
                      </div>

                      {/* Resident Status */}
                      <div>
                        <label
                          htmlFor="residentStatus"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Resident Status
                        </label>

                        <select
                          id="residentStatus"
                          value={formData.residentStatus}
                          onChange={(event) =>
                            handleInputChange(
                              "residentStatus",
                              event.target.value,
                            )
                          }
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d]"
                        >
                          <option value="">Select status</option>
                          <option value="Student">Student</option>
                          <option value="Professional">Professional</option>
                          <option value="Family">Family</option>
                        </select>
                      </div>
                    </div>

                    {/* Minimum stay info */}
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                      <div className="flex gap-3">
                        <BsShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                        <div>
                          <h3 className="text-xs font-bold text-blue-900">
                            Minimum stay: 3 months
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-blue-700">
                            Your selected dates will be used to calculate the
                            estimated rental duration and initial payment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
            STEP 2
        ================================================== */}
                {currentStep === 2 && (
                  <div className="animate-in space-y-6 fade-in duration-200">
                    <div className="border-b border-slate-100 pb-4">
                      <h2 className="text-xl font-bold text-slate-900">
                        2. Personal Information
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Provide your contact and emergency contact information.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Full Name *
                        </label>

                        <input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(event) =>
                            handleInputChange("fullName", event.target.value)
                          }
                          placeholder="Enter your full name"
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.fullName} />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Email Address *
                        </label>

                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(event) =>
                            handleInputChange("email", event.target.value)
                          }
                          placeholder="you@example.com"
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.email ? "border-red-500" : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.email} />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Phone Number *
                        </label>

                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(event) =>
                            handleInputChange("phone", event.target.value)
                          }
                          placeholder="+880 1XXXXXXXXX"
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.phone ? "border-red-500" : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.phone} />
                      </div>

                      {/* Current Address */}
                      <div>
                        <label
                          htmlFor="currentAddress"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Current Address *
                        </label>

                        <input
                          id="currentAddress"
                          type="text"
                          value={formData.currentAddress}
                          onChange={(event) =>
                            handleInputChange(
                              "currentAddress",
                              event.target.value,
                            )
                          }
                          placeholder="Current residential address"
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.currentAddress
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.currentAddress} />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="border-t border-slate-100 pt-5">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-700">
                        Emergency Contact
                      </h3>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="emergencyName"
                            className="mb-1.5 block text-xs font-semibold text-slate-700"
                          >
                            Contact Name
                          </label>

                          <input
                            id="emergencyName"
                            type="text"
                            value={formData.emergencyName}
                            onChange={(event) =>
                              handleInputChange(
                                "emergencyName",
                                event.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="emergencyPhone"
                            className="mb-1.5 block text-xs font-semibold text-slate-700"
                          >
                            Contact Phone
                          </label>

                          <input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(event) =>
                              handleInputChange(
                                "emergencyPhone",
                                event.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
            STEP 3
        ================================================== */}
                {currentStep === 3 && (
                  <div className="animate-in space-y-6 fade-in duration-200">
                    <div className="border-b border-slate-100 pb-4">
                      <h2 className="text-xl font-bold text-slate-900">
                        3. Verification & Income
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Provide your employment, income and identity documents.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* Organization */}
                      <div>
                        <label
                          htmlFor="organization"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          University / Employer *
                        </label>

                        <input
                          id="organization"
                          type="text"
                          value={formData.organization}
                          onChange={(event) =>
                            handleInputChange(
                              "organization",
                              event.target.value,
                            )
                          }
                          placeholder="e.g. Tech GmbH"
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.organization
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.organization} />
                      </div>

                      {/* Income */}
                      <div>
                        <label
                          htmlFor="monthlyIncome"
                          className="mb-1.5 block text-xs font-semibold text-slate-700"
                        >
                          Net Monthly Income (€) *
                        </label>

                        <input
                          id="monthlyIncome"
                          type="number"
                          min="0"
                          value={formData.monthlyIncome}
                          onChange={(event) =>
                            handleInputChange(
                              "monthlyIncome",
                              event.target.value,
                            )
                          }
                          placeholder="e.g. 2400"
                          className={`w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#ff4d4d] ${
                            errors.monthlyIncome
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <FieldError message={errors.monthlyIncome} />
                      </div>
                    </div>

                    {/* Guarantor */}
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <input
                        type="checkbox"
                        checked={formData.hasGuarantor}
                        onChange={(event) =>
                          handleInputChange(
                            "hasGuarantor",
                            event.target.checked,
                          )
                        }
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ff4d4d] focus:ring-[#ff4d4d]"
                      />

                      <span className="text-xs font-medium leading-5 text-slate-700">
                        I have a parent or third-party guarantor for my rental
                        payments.
                      </span>
                    </label>

                    {/* Documents */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Required Documents
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          PDF, JPG or PNG documents are accepted.
                        </p>
                      </div>

                      {/* Passport */}
                      <div>
                        <input
                          id="passport-upload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(event) =>
                            handleFileChange(event, "passport")
                          }
                        />

                        <label
                          htmlFor="passport-upload"
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed p-4 transition ${
                            formData.filesUploaded.passport
                              ? "border-emerald-500 bg-emerald-50"
                              : errors.passport
                                ? "border-red-400 bg-red-50"
                                : "border-slate-300 bg-slate-50 hover:border-[#ff4d4d]"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`shrink-0 rounded-xl p-3 ${
                                formData.filesUploaded.passport
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              <BsFileEarmarkCheck className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-800">
                                Passport / Government ID *
                              </h4>

                              <p className="mt-1 text-[11px] text-slate-500">
                                {formData.filesUploaded.passport
                                  ? "✓ Document attached"
                                  : "Click to upload document"}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${
                              formData.filesUploaded.passport
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {formData.filesUploaded.passport
                              ? "Uploaded"
                              : "Upload"}
                          </span>
                        </label>

                        <FieldError message={errors.passport} />
                      </div>

                      {/* Income */}
                      <div>
                        <input
                          id="income-upload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(event) =>
                            handleFileChange(event, "income")
                          }
                        />

                        <label
                          htmlFor="income-upload"
                          className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed p-4 transition ${
                            formData.filesUploaded.income
                              ? "border-emerald-500 bg-emerald-50"
                              : errors.income
                                ? "border-red-400 bg-red-50"
                                : "border-slate-300 bg-slate-50 hover:border-[#ff4d4d]"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className={`shrink-0 rounded-xl p-3 ${
                                formData.filesUploaded.income
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              <BsFileEarmarkCheck className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-slate-800">
                                Proof of Income *
                              </h4>

                              <p className="mt-1 text-[11px] text-slate-500">
                                {formData.filesUploaded.income
                                  ? "✓ Document attached"
                                  : "Salary slip / income proof"}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${
                              formData.filesUploaded.income
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {formData.filesUploaded.income
                              ? "Uploaded"
                              : "Upload"}
                          </span>
                        </label>

                        <FieldError message={errors.income} />
                      </div>
                    </div>
                  </div>
                )}

                {/* =================================================
            STEP 4
        ================================================== */}
                {currentStep === 4 && (
                  <div className="animate-in space-y-5 fade-in duration-200">
                    <div className="border-b border-slate-100 pb-4">
                      <h2 className="text-xl font-bold text-slate-900">
                        4. Review & Confirm
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Review your application before submitting it.
                      </p>
                    </div>

                    {/* Lease */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Lease & Property
                        </h3>

                        <button
                          type="button"
                          onClick={() => handleStepClick(1)}
                          className="text-xs font-bold text-[#ff4d4d] hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                        <div>
                          <span className="text-slate-500">Property: </span>
                          <strong className="text-slate-800">
                            Studio Neon Gold Floor 5
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Location: </span>
                          <strong className="text-slate-800">
                            Mitte-Wedding, Berlin
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Move-in: </span>
                          <strong className="text-slate-800">
                            {formData.moveInDate || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Move-out: </span>
                          <strong className="text-slate-800">
                            {formData.moveOutDate || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Occupants: </span>
                          <strong className="text-slate-800">
                            {formData.occupants || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Status: </span>
                          <strong className="text-slate-800">
                            {formData.residentStatus || "-"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Applicant */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Applicant
                        </h3>

                        <button
                          type="button"
                          onClick={() => handleStepClick(2)}
                          className="text-xs font-bold text-[#ff4d4d] hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                        <div>
                          <span className="text-slate-500">Name: </span>
                          <strong className="text-slate-800">
                            {formData.fullName || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Email: </span>
                          <strong className="break-all text-slate-800">
                            {formData.email || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Phone: </span>
                          <strong className="text-slate-800">
                            {formData.phone || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Income: </span>
                          <strong className="text-slate-800">
                            €{formData.monthlyIncome || "0"} / month
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Verification */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Verification
                        </h3>

                        <button
                          type="button"
                          onClick={() => handleStepClick(3)}
                          className="text-xs font-bold text-[#ff4d4d] hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                        <div>
                          <span className="text-slate-500">Organization: </span>
                          <strong className="text-slate-800">
                            {formData.organization || "-"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Guarantor: </span>
                          <strong className="text-slate-800">
                            {formData.hasGuarantor ? "Yes" : "No"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Identity: </span>
                          <strong
                            className={
                              formData.filesUploaded.passport
                                ? "text-emerald-600"
                                : "text-red-500"
                            }
                          >
                            {formData.filesUploaded.passport
                              ? "Uploaded"
                              : "Missing"}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-500">Income proof: </span>
                          <strong
                            className={
                              formData.filesUploaded.income
                                ? "text-emerald-600"
                                : "text-red-500"
                            }
                          >
                            {formData.filesUploaded.income
                              ? "Uploaded"
                              : "Missing"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Cost */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Initial Payment
                      </h3>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Rent</span>

                          <strong>€{costs.monthlyRent.toLocaleString()}</strong>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            Security Deposit
                          </span>

                          <strong>€{costs.deposit.toLocaleString()}</strong>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            Registration Fee
                          </span>

                          <strong>€{costs.adminFee.toLocaleString()}</strong>
                        </div>

                        <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-[#ff4d4d]">
                          <span>Total Initial Payment</span>

                          <span>€{costs.totalDue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                        <input
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={(event) =>
                            handleInputChange(
                              "agreeTerms",
                              event.target.checked,
                            )
                          }
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ff4d4d] focus:ring-[#ff4d4d]"
                        />

                        <span className="text-xs leading-5 text-slate-600">
                          I declare that all provided details and documents are
                          authentic. I accept the{" "}
                          <a
                            href="/terms"
                            className="font-semibold text-[#ff4d4d] underline"
                          >
                            Thikana Terms of Service
                          </a>{" "}
                          and background check policy.
                        </span>
                      </label>

                      <FieldError message={errors.agreeTerms} />
                    </div>
                  </div>
                )}
              </div>

              {/* =================================================
          FOOTER
      ================================================== */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  <FaArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className={`flex w-full items-center justify-center rounded-xl px-7 py-3 text-sm font-bold text-white shadow-lg transition sm:w-auto ${
                    currentStep === 4
                      ? "bg-emerald-600 shadow-emerald-500/20 hover:bg-emerald-700"
                      : "bg-[#ff4d4d] shadow-red-500/20 hover:bg-[#e03e3e]"
                  }`}
                >
                  {currentStep === 4 ? "Submit Application" : "Continue"}

                  {currentStep === 4 ? (
                    <FaCheck className="ml-2 h-4 w-4" />
                  ) : (
                    <FaArrowRight className="ml-2 h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
      RIGHT - PROPERTY SUMMARY
      Desktop: 4 columns
      Mobile: appears below stepper
  ================================================== */}
          <aside className="min-w-0 lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-24">
              {/* Property Card */}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
                  alt="Studio Neon Gold"
                  className="h-56 w-full object-cover"
                />

                <div className="space-y-5 p-5">
                  <div>
                    <div className="mb-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                      Verified Listing
                    </div>

                    <h2 className="text-lg font-black text-slate-900">
                      Studio Neon Gold
                      <br />
                      with Balcony – Floor 5
                    </h2>

                    <p className="mt-2 flex items-center text-xs text-slate-500">
                      <FaMapMarkerAlt className="mr-1.5 h-4 w-4 text-[#ff4d4d]" />
                      Mitte-Wedding, Berlin
                    </p>
                  </div>

                  <div className="border-y border-slate-100 py-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <span className="text-2xl font-black text-slate-900">
                          €1,559
                        </span>

                        <span className="text-xs text-slate-500"> / month</span>
                      </div>

                      <span className="text-xs font-semibold text-emerald-600">
                        Available Oct 1, 2026
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Minimum Stay</span>

                      <strong className="text-slate-800">3 Months</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Security Deposit</span>

                      <strong className="text-slate-800">€1,559</strong>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Furnishing</span>

                      <strong className="text-right text-slate-800">
                        Fully Furnished
                      </strong>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs leading-5 text-slate-600">
                      Fully furnished premium student/professional studio with
                      high-speed internet, security and modern co-working lounge
                      access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Preview */}
              <div className="rounded-3xl border border-slate-200 bg-[#0b1329] p-5 text-white shadow-sm">
                <div className="flex items-center gap-2">
                  <BsShieldCheck className="h-5 w-5 text-emerald-400" />

                  <h3 className="text-sm font-bold">Payment Preview</h3>
                </div>

                <div className="mt-5 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Monthly rent</span>
                    <span>€{costs.monthlyRent}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Deposit</span>
                    <span>€{costs.deposit}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Registration</span>
                    <span>€{costs.adminFee}</span>
                  </div>

                  <div className="flex justify-between border-t border-slate-700 pt-3 text-sm font-black">
                    <span>Total</span>

                    <span className="text-[#ff4d4d]">€{costs.totalDue}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
