import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface CheckoutFormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  submitLabel?: string;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
}

export default function CheckoutFormNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextLabel = "Continue",
  submitLabel = "Submit Application",
  isNextDisabled = false,
  isSubmitting = false,
}: CheckoutFormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between border-t border-[var(--border)] p-3">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className={[
          "flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition border border-[var(--border)] tracking-wider",
          isFirstStep
            ? "cursor-not-allowed text-[var(--muted)]"
            : "text-[var(--text)] hover:opacity-80",
        ].join(" ")}
      >
        <BsChevronLeft className="h-3 w-3 text-[var(--text)]" />
        Back
      </button>

      {/* Continue / Submit */}
      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className={[
          "flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 tracking-wider",
          "text-sm font-bold text-[var(--card)] shadow-sm transition",
          "hover:opacity-90",
          "disabled:cursor-not-allowed disabled:opacity-20",
        ].join(" ")}
      >
        {isSubmitting ? "Submitting..." : isLastStep ? submitLabel : nextLabel}

        {!isLastStep && (
          <BsChevronRight className="h-3 w-3 text-[var(--card)]" />
        )}
      </button>
    </div>
  );
}
