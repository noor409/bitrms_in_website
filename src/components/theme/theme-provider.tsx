"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { applyLightThemeVars, clearLightThemeVars } from "@/lib/theme-vars";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(initial);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      if (next === "light") {
        root.setAttribute("data-theme", "light");
        applyLightThemeVars(root);
      } else {
        root.removeAttribute("data-theme");
        clearLightThemeVars(root);
      }
      try {
        localStorage.setItem("theme", next);
      } catch {
        // localStorage unavailable (private browsing etc) — theme just won't persist
      }
      return next;
    });
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
