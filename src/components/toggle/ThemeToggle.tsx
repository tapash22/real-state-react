import gsap from "gsap";
import { useRef } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type ThemeToggleProps = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  const showTooltip = () => {
    if (!tooltipRef.current) return;

    gsap.set(tooltipRef.current, { visibility: "visible" });

    gsap.to(tooltipRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const hideTooltip = () => {
    if (!tooltipRef.current) return;

    gsap.to(tooltipRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        if (tooltipRef.current) {
          tooltipRef.current.style.visibility = "hidden";
          gsap.set(tooltipRef.current, { x: -20 });
        }
      },
    });
  };

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="group relative p-2 rounded-full bg-[var(--card)]
        transition-colors duration-200 cursor-pointer flex items-center justify-center
        shadow-sm shadow-[var(--primary)] border-2 border-[var(--border)]"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <FaMoon size={20} className="text-[var(--muted)] font-bold" />
      ) : (
        <FaSun size={20} className="text-[var(--text)] font-bold" />
      )}

      {/* Tooltip */}
      <span
        ref={tooltipRef}
        style={{
          opacity: 0,
          transform: "translateX(-20px)",
          visibility: "hidden",
        }}
        className="
          hidden lg:block
          absolute right-12  -translate-y-1/2
          whitespace-nowrap rounded-md px-4 py-3
          text-sm font-light tracking-wider
          bg-[var(--card)] text-[var(--text)]
          pointer-events-none z-50
          border border-[var(--border)]
        "
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}

        <span
          className="
            absolute top-1/2 -right-[7px]
            -translate-y-1/2
            w-[14px] h-[14px]
            bg-[var(--card)]
            border-r border-t border-[var(--border)]
            rotate-45
          "
        />
      </span>
    </button>
  );
};
