import { screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import JobDetails from "@/components/job/JobDetails";
import { render } from "@/test.utils";
import { mockJobs } from "@/mocks/mockData/jobs";
import { transformJobData } from "@/utils/transformers/jobs";

// Mock the useJobDetails hook
vi.mock("@/hooks/api/useJobDetails", () => ({
  useJobDetails: (jobId: string) => {
    const mockJob = mockJobs.find((job) => job.id === jobId);
    return {
      data: mockJob ? transformJobData(mockJob) : undefined,
      isLoading: false,
      error: mockJob ? null : new Error("Job not found"),
    };
  },
}));

describe("JobDetails", () => {
  test("renders job details correctly", async () => {
    render(<JobDetails jobId="ycw-1234" />);

    // Check if the main job details render correctly
    waitFor(
      () => {
        // Check if the job is displayed
        expect(screen.getByText(/job details/i)).toBeInTheDocument();
        expect(screen.getByText("TechNova AI")).toBeInTheDocument();
        expect(screen.getByText(/Remote, US/i)).toBeInTheDocument();

        // Check if the company logo is displayed
        const logo = screen.getByAltText(/TechNova AI logo/i);
        expect(logo).toBeInTheDocument();

        // Check for apply button
        const applyButton = screen.getByRole("button", { name: /apply now/i });
        expect(applyButton).toBeInTheDocument();
        expect(applyButton).toHaveAttribute(
          "href",
          expect.stringContaining("ycombinator.com")
        );
      },
      { timeout: 2000 }
    );
  });

  test("shows error when job is not found", async () => {
    render(<JobDetails jobId="nonexistent-job" />);

    // Check if the error message is displayed
    waitFor(
      () => {
        expect(screen.getByText(/job not found/i)).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: /view all jobs/i })
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
