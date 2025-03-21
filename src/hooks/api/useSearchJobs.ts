import { useQuery } from "@tanstack/react-query";
import { jobsAPI } from "../../axios";
import { QUERY_KEYS, API_ENDPOINTS } from "@/constants/api.constants";
import { SearchJobsParams } from "@/types/api";
// import { jobsApi } from "@/services/jobsApi";

async function fetchJobs(searchParams: SearchJobsParams) {
  const { data } = await jobsAPI.post(
    API_ENDPOINTS.JOBS.ACTIVE_LAST_7_DAYS,
    searchParams
  );
  return data;
}

export function useSearchJobs(searchParams: SearchJobsParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.JOBS, searchParams],
    queryFn: () => fetchJobs(searchParams),
  });
  console.log(data);
  return { data, isLoading, error };
}
