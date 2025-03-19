import { Sun, Moon } from "lucide-react";
import { THEME } from "../../constants";
import useThemeToggle from "../../hooks/generic/useThemeToggle";

const ThemeToggle = () => {
  const [theme, toggleTheme] = useThemeToggle();

  return (
    <div className="theme-toggle">
      <Sun className="theme-toggle__icon" />
      <button onClick={() => toggleTheme()} className="theme-toggle__button">
        <span
          className={
            theme === THEME.DARK
              ? "theme-toggle__slider theme-toggle__slider--dark"
              : "theme-toggle__slider"
          }
        ></span>
      </button>
      <Moon className="theme-toggle__icon" />
    </div>
  );
};

export default ThemeToggle;
