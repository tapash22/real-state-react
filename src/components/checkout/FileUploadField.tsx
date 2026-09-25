import type { ChangeEvent } from "react";
import { BsFileEarmarkCheck } from "react-icons/bs";

import FieldError from "./FieldError";

interface FileUploadFieldProps {
  id: string;
  title: string;
  description: string;
  uploaded: boolean;
  error?: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadField({
  id,
  title,
  description,
  uploaded,
  error,
  onChange,
}: FileUploadFieldProps) {
  return (
    <div>
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={onChange}
      />

      <label
        htmlFor={id}
        className={[
          "flex cursor-pointer items-center justify-between",
          "rounded-2xl border-2 border-dashed p-4 transition",
          uploaded
            ? "border-border-[var(--danger)]"
            : error
              ? "border-[var(--danger)] bg-[var(--border)]"
              : "border-[var(--border)] ",
          !uploaded && !error && "hover:border-[var(--danger)]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={[
              "shrink-0 rounded-xl p-3",
              uploaded ? " text-[var(--danger)]" : " text-[var(--danger)]",
            ].join(" ")}
          >
            <BsFileEarmarkCheck className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[var(--text)]">{title}</h4>

            <p className="mt-1 text-[11px] text-[var(--muted)]">
              {uploaded ? "✓ Document attached" : description}
            </p>
          </div>
        </div>

        <span
          className={[
            "shrink-0 rounded-lg px-3 py-1.5",
            "text-xs font-bold",
            uploaded
              ? "bg-[var(--primary)] text-[var(--text)]"
              : " text-[var(--muted)]",
          ].join(" ")}
        >
          {uploaded ? "Uploaded" : "Upload"}
        </span>
      </label>

      {/* ERROR CHECK */}
      <FieldError message={error} />
    </div>
  );
}
