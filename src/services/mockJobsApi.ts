// src/services/mockJobsApi.ts
import { SearchJobsParams } from "@/types/api";
import { mockJobsResponse } from "@/mocks/jobsData";
import data from "@/mocks/data.json";

// Simulate an API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockJobsApi = {
  async searchJobs(params: SearchJobsParams) {
    // Simulate network delay
    await delay(800);

    // You can add logic here to filter the mock data based on the search params
    const { page, limit } = params;

    // Simple pagination logic
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    // const paginatedJobs = mockJobsResponse.jobs.slice(startIndex, endIndex);
    const paginatedJobs = data.slice(startIndex, endIndex);

    return {
      ...mockJobsResponse,
      jobs: paginatedJobs,
      page,
      limit,
    };
  },

  async getJobById(id: string) {
    await delay(500);
    const job = mockJobsResponse.jobs.find((job) => job.id === id);

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  },
};
