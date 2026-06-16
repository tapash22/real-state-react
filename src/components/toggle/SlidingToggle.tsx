import { useState } from "react";

// Using TypeScript Generics <T> so this can accept any union of string values
interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface SlidingToggleProps<T extends string> {
  options: [ToggleOption<T>, ToggleOption<T>]; // Enforces exactly 2 options
  selectedValue?: T; // Controlled value from parent
  defaultValue?: T; // Uncontrolled default state
  onChange: (value: T) => void; // Callback to update parent state
}

export const SlidingToggle = <T extends string>({
  options,
  selectedValue,
  defaultValue,
  onChange,
}: SlidingToggleProps<T>) => {
  // Fallback to internal state if parent doesn't manage the selected value
  const [internalValue, setInternalValue] = useState<T>(
    defaultValue ?? options[0].value,
  );

  const isControlled = selectedValue !== undefined;
  const activeValue = isControlled ? selectedValue : internalValue;

  const handleSelect = (value: T) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange(value);
  };

  // Determine if the first or second item is active for the sliding transition
  const isFirstActive = activeValue === options[0].value;

  return (
    <div className="relative flex items-center bg-[#087474a9]/10 h-auto w-full rounded-full p-1 select-none">
      {/* Sliding Background Pill */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#087474a9] rounded-full transition-transform duration-200 ease-out ${
          isFirstActive ? "translate-x-0" : "translate-x-full"
        }`}
      />

      {/* Map through your pair of options dynamically */}
      {options.map((option) => {
        const isActive = activeValue === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
            className={`relative z-10 flex-1 text-center text-sm font-bold tracking-widest text-[var(--muted)] h-full rounded-full transition-colors p-3 duration-200 outline-none ${
              isActive ? "text-[var(--muted)] font-bold" : "text-[var(--text)] "
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
