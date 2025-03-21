import { jobsApiClient } from "@/axios";
import { API_ENDPOINTS } from "@/constants/api";
import { JobsApiResponse } from "@/types/api";

export const jobsApi = {
  async getActiveJobs(offset: number = 0) {
    const { data } = await jobsApiClient.get<JobsApiResponse>(
      `${API_ENDPOINTS.JOBS.ACTIVE_LAST_7_DAYS}?offset=${offset}`
    );
    return data;
  },
};
