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
  "mt-0.5 h-5 w-5 shrink-0 rounded border border-[var(--border)]",
  "appearance-none", // <--- THIS REMOVES THE INNER WHITE BOX
  "bg-[var(--bg)] checked:bg-[var(--bg)] text-[var(--text)]",
  "focus:ring-1 focus:ring-[var(--card)] focus:outline-none",
  "accent-[var(--bg)] cursor-pointer",
].join(" ");
