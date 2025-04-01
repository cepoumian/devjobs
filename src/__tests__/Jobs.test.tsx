import { screen, waitFor, render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Jobs from "@/components/jobs/Jobs";
import { JobGridProps } from "@/components/jobs/JobsGrid";
import { ResponsiveFiltersProps } from "@/components/jobs/filters/ResponsiveFilters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import server from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { url } from "@/mocks/handlers";
import { mockJobs } from "@/mocks/mockData/jobs";

// Mock the JobsGrid component to make testing simpler
vi.mock("@/components/jobs/JobsGrid.tsx", () => ({
  default: ({ jobs, isLoading, error }: JobGridProps) => (
    <div data-testid="jobs-grid">
      <div data-testid="jobs-count">{jobs.length}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="error">{error ? "Error" : "No Error"}</div>
    </div>
  ),
}));

// Mock the ResponsiveFilters component
vi.mock("@/components/jobs/filters/ResponsiveFilters.tsx", () => ({
  default: ({ onSubmit }: ResponsiveFiltersProps) => (
    <div data-testid="responsive-filters">
      <button
        data-testid="submit-filters"
        onClick={() =>
          onSubmit({
            searchTerm: "developer",
            location: "New York",
            remoteOnly: true,
          })
        }
      >
        Submit Filters
      </button>
    </div>
  ),
}));

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Jobs", () => {
  test("fetches and displays jobs", async () => {
    renderWithQueryClient(<Jobs />);

    // Check if loading state is displayed initially
    expect(screen.getByTestId("is-loading").textContent).toBe("true");

    // Wait for the jobs to be loaded
    await waitFor(() => {
      expect(screen.getByTestId("is-loading").textContent).toBe("false");
    });

    // Check if jobs were passed to JobsGrid
    expect(screen.getByTestId("jobs-count").textContent).toBe("3");
    expect(screen.getByTestId("error").textContent).toBe("No Error");
  });

  test("handles API errors", async () => {
    // Override the default handler to return an error
    server.use(
      http.get(url, () => {
        return HttpResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      })
    );

    renderWithQueryClient(<Jobs />);

    // Wait for the error state
    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe("Error");
    });
  });

  test("applies filters and refetches jobs", async () => {
    // Create filtered mock jobs that would be returned after applying filters
    const filteredMockJobs = [
      {
        id: "3",
        title: "Senior Developer",
        company: "Filter Tech",
        location: "New York",
        remote: true,
        description: "Filtered job description",
        postedAt: "2023-01-03",
        url: "https://example.com/job/3",
      },
    ];

    // Initial response with original jobs, then filtered jobs after filter is applied
    let filtersApplied = false;

    // Override the default handler to return filtered jobs when filters are applied
    server.use(
      http.get(url, () => {
        if (filtersApplied) {
          return HttpResponse.json(filteredMockJobs);
        } else {
          return HttpResponse.json(mockJobs);
        }
      })
    );

    renderWithQueryClient(<Jobs />);

    // Wait for initial jobs to load
    await waitFor(() => {
      expect(screen.getByTestId("is-loading").textContent).toBe("false");
    });

    // Initially we should have 3 jobs
    expect(screen.getByTestId("jobs-count").textContent).toBe("3");

    // Update flag before clicking submit
    filtersApplied = true;

    // Click on the filter submit button (which applies our mock filters)
    screen.getByTestId("submit-filters").click();

    // Wait for the refetch to complete
    await waitFor(() => {
      expect(screen.getByTestId("is-loading").textContent).toBe("false");
    });

    // After applying filters, no matches should be found
    expect(screen.getByTestId("jobs-count").textContent).toBe("0");
  });
});
