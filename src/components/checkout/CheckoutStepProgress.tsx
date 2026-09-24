import { BsCheckCircleFill } from "react-icons/bs";

export interface StepProgressItem<T extends string | number> {
  value: T;
  label: string;
}

interface CheckoutStepProgressProps<T extends string | number> {
  steps: StepProgressItem<T>[];
  currentStep: T;
  onStepClick: (step: T) => void;
  isStepClickable?: (step: T) => boolean;
}

export default function CheckoutStepProgress<T extends string | number>({
  steps,
  currentStep,
  onStepClick,
  isStepClickable = () => true,
}: CheckoutStepProgressProps<T>) {
  const currentIndex = steps.findIndex((step) => step.value === currentStep);

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-[650px] items-center">
        {steps.map((step, index) => {
          const stepIndex = index;

          const isActive = step.value === currentStep;

          const isCompleted = stepIndex < currentIndex;

          const canClick = isStepClickable(step.value);

          return (
            <div key={String(step.value)} className="flex flex-1 items-center">
              {/* Step */}
              <button
                type="button"
                onClick={() => canClick && onStepClick(step.value)}
                disabled={!canClick}
                className={[
                  "flex items-center gap-2",
                  "transition",
                  !canClick ? "cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
              >
                {/* Step Number / Completed Icon */}
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center",
                    "rounded-full text-sm font-black transition",
                    isActive
                      ? "bg-[var(--secondary)] text-[var(--card)]"
                      : isCompleted
                        ? "bg-[var(--info)] "
                        : "bg-[var(--card)] text-[var(--text)]",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <BsCheckCircleFill className="h-5 w-5  text-[var(--card)]" />
                  ) : (
                    step.value
                  )}
                </span>

                {/* Step Label */}
                <span
                  className={[
                    "whitespace-nowrap text-xs font-normal tracking-wide",
                    isActive ? "text-[var(--text)]" : "text-[var(--muted)]",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={[
                    "mx-1 h-[3px] flex-1 rounded-sm",
                    isCompleted ? "bg-[var(--success)]" : "bg-[var(--border)]",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
