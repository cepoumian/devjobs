import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { jobsApi } from "../../services/jobsApi";
import { OptionalFilters } from "@/types/components/filters";

export function useActiveJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsApi.getActiveJobs(10),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFetchJobs(filters: OptionalFilters) {
  return useInfiniteQuery({
    queryKey: ["jobs", "active", "infinite", filters],
    queryFn: ({ pageParam = 0 }) => jobsApi.getActiveJobs(pageParam, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer than 10 items, we've reached the end
      if (lastPage.length < 10) {
        return undefined;
      }
      // Otherwise, the next offset is the total number of jobs we've fetched so far
      return allPages.length * 10;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
