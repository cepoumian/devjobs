import { screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Header from "@/components/header/Header";
import { render } from "@/test.utils";

describe("Header", () => {
  test("renders the DevJobs logo", () => {
    render(<Header />);
    const headerElement = screen.getByAltText(/devjobs logo/i);
    expect(headerElement).toBeInTheDocument();
  });
});
