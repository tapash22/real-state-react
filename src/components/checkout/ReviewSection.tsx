import type { ReactNode } from "react";
import type { CheckoutStep } from "../../data";

interface ReviewSectionProps {
  title: string;
  step: CheckoutStep;
  onEdit: (step: CheckoutStep) => void;
  children: ReactNode;
}

export default function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: ReviewSectionProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] p-5">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          {title}
        </h3>

        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-xs font-bold text-[var(--danger)] hover:underline"
        >
          Edit
        </button>
      </div>

      {children}
    </div>
  );
}

interface ReviewItemProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

export function ReviewItem({
  label,
  value,
  valueClassName = "text-[var(--muted)]",
}: ReviewItemProps) {
  return (
    <div>
      <span className="text-[var(--muted)]">{label}: </span>

      <strong className={valueClassName}>{value}</strong>
    </div>
  );
}
