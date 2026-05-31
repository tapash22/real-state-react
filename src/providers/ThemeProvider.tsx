import { createContext, useEffect, useState } from "react";
import { ProvidersProps, Theme, ThemeContextType } from "../types/theme-types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({ children }: ProvidersProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "light";
  });

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  // Apply theme to HTML root
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

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
