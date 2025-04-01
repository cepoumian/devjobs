import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import ThemeToggle from "@/components/header/ThemeToggle";
import useThemeToggle from "@/hooks/generic/useThemeToggle";
import { THEME } from "@/constants/theme";

vi.mock("../hooks/generic/useThemeToggle.ts");

describe("ThemeToggle component", () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly in light mode", () => {
    vi.mocked(useThemeToggle).mockReturnValue([THEME.LIGHT, mockToggleTheme]);

    render(<ThemeToggle />);

    // Check if the toggle button is rendered
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();

    // Check if the slider has the correct class for light mode
    const slider = toggleButton.querySelector(".theme-toggle__slider");
    expect(slider).toBeInTheDocument();
    expect(slider).not.toHaveClass("theme-toggle__slider--dark");
  });

  test("renders correctly in dark mode", () => {
    // Mock the hook to return dark theme
    vi.mocked(useThemeToggle).mockReturnValue([THEME.DARK, mockToggleTheme]);

    render(<ThemeToggle />);

    // Check if the slider has the correct class for dark mode
    const toggleButton = screen.getByRole("button");
    const slider = toggleButton.querySelector(".theme-toggle__slider");
    expect(slider).toHaveClass("theme-toggle__slider--dark");
  });

  test("calls toggleTheme when button is clicked", () => {
    // Mock the hook
    vi.mocked(useThemeToggle).mockReturnValue([THEME.LIGHT, mockToggleTheme]);

    render(<ThemeToggle />);

    // Get and click the toggle button
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    // Verify the toggle function was called
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test("transitions between light and dark themes", async () => {
    // Start with light theme
    let currentTheme = THEME.LIGHT;

    // Mock the hook to update the theme when called
    vi.mocked(useThemeToggle).mockImplementation(() => {
      return [
        currentTheme,
        () => {
          currentTheme =
            currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
          // Force re-render
          vi.clearAllMocks();
          vi.mocked(useThemeToggle).mockImplementation(() => [
            currentTheme,
            mockToggleTheme,
          ]);
        },
      ];
    });

    const { rerender } = render(<ThemeToggle />);

    // Initially in light mode
    let slider = screen
      .getByRole("button")
      .querySelector(".theme-toggle__slider");
    expect(slider).not.toHaveClass("theme-toggle__slider--dark");

    // Click the toggle button
    fireEvent.click(screen.getByRole("button"));

    // Re-render the component after state change
    rerender(<ThemeToggle />);

    // Now should be in dark mode
    slider = screen.getByRole("button").querySelector(".theme-toggle__slider");
    expect(slider).toHaveClass("theme-toggle__slider--dark");
  });
});
