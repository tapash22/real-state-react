import { BsCheckCircleFill } from "react-icons/bs";

interface CheckoutSubmissionSuccessProps {
  propertyName: string;
  monthlyRent: number;
  totalDue: number;
  onStartNew: () => void;
  title?: string;
  description?: string;
}

export default function CheckoutSubmissionSuccess({
  propertyName,
  monthlyRent,
  totalDue,
  onStartNew,
  title = "Application Submitted",
  description = "Your rental application has been submitted successfully. We will review your information and contact you shortly.",
}: CheckoutSubmissionSuccessProps) {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <div className="w-full rounded-3xl border border-[var(--border)] p-8 text-center shadow-sm sm:p-12 space-y-2">
          {/* Success Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
            <BsCheckCircleFill className="h-8 w-8 text-[var(--success)]" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-black text-[var(--text)]">{title}</h1>

          {/* Description */}
          <p className="mx-auto max-w-md text-sm leading-6 text-[var(--muted)]">
            {description}
          </p>

          {/* Application Summary */}
          <div className="rounded-2xl p-5 text-left space-y-2">
            {/* Property */}
            <div className="flex justify-between text-sm">
              <span className="tracking-wider text-[var(--muted)]">
                Property
              </span>

              <strong className="tracking-wide text-[var(--text)]">
                {propertyName}
              </strong>
            </div>

            {/* Monthly Rent */}
            <div className="flex justify-between text-sm tracking-wider">
              <span className="text-[var(--muted)]">Monthly Rent</span>

              <strong className="text-[var(--text)]">
                ${monthlyRent.toLocaleString()}
              </strong>
            </div>

            {/* Initial Payment */}
            <div className="flex justify-between items-center text-sm">
              <span className="tracking-wider text-[var(--muted)]">
                Initial Payment
              </span>

              <strong className="text-[var(--danger)]">
                ${totalDue.toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Start New Application */}
          <button
            type="button"
            onClick={onStartNew}
            className="rounded-lg bg-[var(--success)] px-6 py-3 text-sm font-bold text-[var(--card)] transition hover:opacity-90"
          >
            Start New Application
          </button>
        </div>
      </div>
    </div>
  );
}
