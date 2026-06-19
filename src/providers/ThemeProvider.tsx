import { createContext, useEffect, useState } from "react";
import { ProvidersProps, Theme, ThemeContextType } from "../types/theme-types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem("theme") as Theme;

  if (saved) return saved;

  // optional: system preference fallback
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
};

export function ThemeProvider({ children }: ProvidersProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
