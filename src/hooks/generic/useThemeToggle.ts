import { useState, useCallback } from "react";
import { THEME } from "@/constants/theme";

export default function useThemeToggle(initialTheme = THEME.LIGHT) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(THEME.THEME);
    const themeToUse = storedTheme || initialTheme;

    document.documentElement.dataset.theme = themeToUse;

    return themeToUse;
  });

  const toggleTheme = useCallback((value?: string) => {
    setTheme((prevTheme) => {
      const newTheme =
        value ?? (prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem(THEME.THEME, newTheme);
      return newTheme;
    });
  }, []);

  return [theme, toggleTheme] as const;
}
