import {
  useQuery,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import { jobsApi } from "../../services/jobsApi";
import { OptionalFilters } from "@/types/components/filters";
import { transformJobData } from "@/utils/transformers/jobs";
import { useCallback } from "react";
import { YCombinatorJob } from "@/types/api";

export function useActiveJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsApi.getJobs(10),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFetchJobs(filters?: OptionalFilters) {
  // Select function to transform the data
  const selectFn = useCallback((data: InfiniteData<YCombinatorJob[]>) => {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.map((job) => {
          const transformed = transformJobData(job);
          // Add a flag to identify transformed jobs in the cache
          return { ...transformed /* , __transformed: true */ };
        })
      ),
    };
  }, []);

  // Return the infinite query
  return useInfiniteQuery({
    queryKey: ["jobs", filters],
    queryFn: ({ pageParam = 0 }) => jobsApi.getJobs(pageParam, filters),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer than 10 items, we've reached the end
      if (lastPage.length < 10) {
        return undefined;
      }
      // Otherwise, the next offset is the total number of jobs we've fetched so far
      return allPages.length * 10;
    },
    select: selectFn,
    // select: (data: InfiniteData<YCombinatorJob[]>) => selectFn(data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
