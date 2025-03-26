import { jobsApiClient } from "@/axios";
import { API_ENDPOINTS } from "@/constants/api";
import { JobsApiResponse } from "@/types/api";
import { OptionalFilters } from "@/types/components/filters";

export const jobsApi = {
  async getJobs(offset: number = 0, filters?: OptionalFilters) {
    let url = `${API_ENDPOINTS.JOBS.ACTIVE_LAST_7_DAYS}?offset=${offset}`;

    // Add filter parameters to URL if provided
    if (filters?.searchTerm) {
      url += `&title_filter=${encodeURIComponent(filters.searchTerm)}`;
    }
    if (filters?.location) {
      url += `&location_filter=${encodeURIComponent(filters.location)}`;
    }
    if (filters?.remoteOnly) {
      url += `&remote=true`;
    }
    const { data } = await jobsApiClient.get<JobsApiResponse>(url);
    return data;
  },
};
