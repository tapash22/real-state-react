export const inputClass = (error?: string) =>
  [
    "w-full rounded-xl border px-3.5 py-3",
    "text-sm outline-none transition",
    "focus:ring-2 focus:ring-[var(--danger)] text-[var(--muted)] bg-[var(--bg)]",
    error ? "border-[var(--danger)]" : "border-[var(--border)]",
  ].join(" ");

export const selectClass = [
  "w-full rounded-xl border border-[var(--border)]",
  "px-3.5 py-3 text-sm",
  "outline-none transition",
  "focus:ring-2 focus:ring-[var(--primary)]",
].join(" ");

export const checkboxClass = [
  "mt-0.5 h-4 w-4 rounded border-slate-300",
  "text-[var(--danger)] focus:ring-[var(--danger)]",
].join(" ");
