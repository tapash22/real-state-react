import { FaExclamationCircle } from "react-icons/fa";

interface FieldErrorProps {
  message?: string | undefined;
}

export default function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="py-2 flex items-center text-xs text-[var(--danger)]">
      <FaExclamationCircle className="mr-1 h-3 w-3 shrink-0" />
      {message}
    </p>
  );
}
