import type { ReactNode } from "react";

import FieldError from "./FieldError";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string | undefined;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-semibold text-[var(--muted)]"
      >
        {label}
        {required && " *"}
      </label>

      {children}

      <FieldError message={error} />
    </div>
  );
}
