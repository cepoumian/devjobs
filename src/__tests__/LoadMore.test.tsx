import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import Jobs from "@/components/jobs/Jobs";
// import { render } from "@/test.utils";
import { http, HttpResponse } from "msw";
import server from "@/mocks/server";
import { apiHost } from "@/axios";
import { mockJobs } from "@/mocks/mockData/jobs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/constants/api";

// Create additional mock jobs for second page
const secondPageMockJobs = [
  {
    id: "ycw-3456",
    date_posted: "2025-03-22T12:30:00.000Z",
    title: "Frontend Developer",
    organization: "WebTech Solutions",
    organization_url: "https://www.webtech-solutions.com",
    employment_type: ["FULL_TIME"],
    url: "https://www.ycombinator.com/companies/webtech-solutions/jobs/ycw-3456",
    organization_logo: "https://cdn.ycombinator.com/assets/webtech-logo.png",
    locations_derived: ["Austin, TX", "Remote, US"],
    countries_derived: ["US"],
    location_type: "HYBRID",
    salary_raw: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
        minValue: 120000,
        maxValue: 160000,
      },
    },
  },
  {
    id: "ycw-7890",
    date_posted: "2025-03-23T14:45:00.000Z",
    title: "Data Scientist",
    organization: "DataMinds",
    organization_url: "https://www.dataminds.ai",
    employment_type: ["FULL_TIME", "PERMANENT"],
    url: "https://www.ycombinator.com/companies/dataminds/jobs/ycw-7890",
    organization_logo: "https://cdn.ycombinator.com/assets/dataminds-logo.png",
    locations_derived: ["Chicago, IL"],
    countries_derived: ["US"],
    location_type: "ONSITE",
    salary_raw: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
        minValue: 140000,
        maxValue: 180000,
      },
    },
  },
];

// This test will unmock the JobsGrid component so we can see the actual jobs
vi.unmock("@/components/jobs/JobsGrid.tsx");

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

describe("Jobs Load More Functionality", () => {
  const firstPageUrl = `https://${apiHost}${API_ENDPOINTS.JOBS.ACTIVE_LAST_7_DAYS}?offset=0`;
  const secondPageUrl = `https://${apiHost}${API_ENDPOINTS.JOBS.ACTIVE_LAST_7_DAYS}?offset=10`;

  beforeEach(() => {
    // Setup handlers for pagination
    server.use(
      http.get(firstPageUrl, () => {
        return HttpResponse.json(mockJobs);
      }),

      http.get(secondPageUrl, () => {
        return HttpResponse.json(secondPageMockJobs);
      })
    );
  });

  test("loads more jobs when clicking the Load More button", async () => {
    // render(<Jobs />);
    renderWithQueryClient(<Jobs />);

    // Wait for the initial jobs to load
    await waitFor(() => {
      expect(screen.queryByTestId("is-loading")).not.toBeInTheDocument();
    });

    // Check if the first page jobs are rendered
    const initialJobTitles = await screen.findAllByRole("heading", {
      level: 3,
    });
    expect(initialJobTitles.length).toBe(mockJobs.length);
    expect(initialJobTitles[0]).toHaveTextContent("Senior Software Engineer");

    // Find and click the "Load More" button
    waitFor(() => {
      // Check if the "Load More" button is visible
      const loadMoreButton = screen.getByRole("button", {
        name: /load more/i,
      });
      expect(loadMoreButton).toBeInTheDocument();

      // Click the "Load More" button
      fireEvent.click(loadMoreButton);

      // Wait for the additional jobs to load
      const allJobTitles = screen.getAllByRole("heading", { level: 3 });
      expect(allJobTitles.length).toBe(
        mockJobs.length + secondPageMockJobs.length
      );

      // Verify that new jobs from the second page are now visible
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
      expect(screen.getByText("Data Scientist")).toBeInTheDocument();

      // Check that DataMinds organization is displayed
      expect(screen.getByText("DataMinds")).toBeInTheDocument();
    });
  });

  test("disables Load More button while fetching next page", async () => {
    renderWithQueryClient(<Jobs />);

    // Wait for the initial jobs to load
    waitFor(() => {
      expect(screen.queryByTestId("is-loading")).not.toBeInTheDocument();
    });

    // Click the "Load More" button
    waitFor(() => {
      // Check if the "Load More" button is visible
      const loadMoreButton = screen.getByRole("button", {
        name: /load more/i,
      });
      expect(loadMoreButton).toBeInTheDocument();

      // Click the "Load More" button
      fireEvent.click(loadMoreButton);

      // The button should be disabled during loading
      expect(loadMoreButton).toBeDisabled();
    });
  });

  test("hides Load More button when no more pages are available", async () => {
    // Override handler for the second page to return fewer items (simulating the end)
    server.use(
      http.get(secondPageUrl, () => {
        // Return fewer than 10 items to trigger end of pagination
        return HttpResponse.json([secondPageMockJobs[0]]);
      })
    );

    renderWithQueryClient(<Jobs />);

    // Wait for the initial jobs to load
    await waitFor(() => {
      expect(screen.queryByTestId("is-loading")).not.toBeInTheDocument();
    });

    waitFor(() => {
      // Check if the "Load More" button is visible
      const loadMoreButton = screen.getByRole("button", {
        name: /load more/i,
      });
      expect(loadMoreButton).toBeInTheDocument();
    });

    // Wait for the additional job to load
    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    // The Load More button should no longer be visible
    expect(
      screen.queryByRole("button", { name: /load more/i })
    ).not.toBeInTheDocument();
  });
});
