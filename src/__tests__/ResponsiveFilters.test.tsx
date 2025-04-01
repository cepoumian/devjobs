import { screen, fireEvent /* , waitFor */ } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ResponsiveFilters from "@/components/jobs/filters/ResponsiveFilters";
import { render } from "@/test.utils";

describe("ResponsiveFilters", () => {
  test("submits the correct filter values", async () => {
    const mockSubmit = vi.fn();
    render(<ResponsiveFilters onSubmit={mockSubmit} />);

    // Fill in the search input
    const searchInput = screen.getByPlaceholderText(/filter by title/i);
    fireEvent.change(searchInput, { target: { value: "developer" } });

    // Fill in the location input (might need to adjust selector based on UI)
    const locationInput = screen.getByPlaceholderText(/filter by location/i);
    fireEvent.change(locationInput, { target: { value: "United States" } });

    // Toggle the remote checkbox
    const remoteCheckbox = screen.getByRole("checkbox", {
      name: /remote only/i,
    });
    fireEvent.click(remoteCheckbox);

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(submitButton);

    // Verify submission
    expect(mockSubmit).toHaveBeenCalledWith({
      searchTerm: "developer",
      location: "United States",
      remoteOnly: true,
    });
  });
});
