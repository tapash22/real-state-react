import React from "react";

type ButtonVariant = "solid" | "outline" | "ghost" | "transparent" | "tab";

type ButtonSize = "sm" | "md" | "lg";

type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "neutral";

type ButtonRounded = "none" | "sm" | "md" | "lg" | "full";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "solid",
      size = "md",
      color = "primary",
      rounded = "md",
      fullWidth = false,
      className = "",
      disabled = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseClasses = `
      inline-flex
      items-center
      justify-center
      whitespace-nowrap
      cursor-pointer
      select-none
      font-semibold
      transition-all
      duration-200
      ease-out
      disabled:pointer-events-none
      disabled:cursor-not-allowed
      disabled:opacity-50
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-offset-2
    `;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm md:text-base",
      lg: "px-6 py-3 text-base md:text-lg",
    };

    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    };

    const colorClasses = {
      primary: {
        solid: "bg-[var(--primary)] text-white hover:opacity-90",
        outline:
          "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
        ghost:
          "text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]",
        transparent: "text-[var(--primary)]",
        tab: "text-[var(--text)]",
      },

      secondary: {
        solid: "bg-[var(--secondary)] text-white hover:opacity-90",
        outline:
          "border border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white",
        ghost:
          "text-[var(--secondary)] hover:bg-[color-mix(in_srgb,var(--secondary)_10%,transparent)]",
        transparent: "text-[var(--secondary)]",
        tab: "text-[var(--text)]",
      },

      success: {
        solid: "bg-green-600 text-white hover:bg-green-700",
        outline:
          "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
        ghost: "text-green-600 hover:bg-green-50",
        transparent: "text-green-600",
        tab: "text-[var(--text)]",
      },

      danger: {
        solid: "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
        ghost: "text-red-600 hover:bg-red-50",
        transparent: "text-red-600",
        tab: "text-[var(--text)]",
      },

      warning: {
        solid: "bg-yellow-500 text-white hover:bg-yellow-600",
        outline:
          "border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white",
        ghost: "text-yellow-600 hover:bg-yellow-50",
        transparent: "text-yellow-600",
        tab: "text-[var(--text)]",
      },

      neutral: {
        solid: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
        ghost: "text-gray-700 hover:bg-gray-100",
        transparent: "text-gray-700",
        tab: "text-[var(--text)]",
      },
    };

    const variantClasses = colorClasses[color][variant];

    const widthClasses = fullWidth ? "w-full" : "";

    const classes = [
      baseClasses,
      sizeClasses[size],
      roundedClasses[rounded],
      variantClasses,
      widthClasses,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
