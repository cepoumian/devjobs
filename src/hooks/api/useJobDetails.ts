// In a new file: useJobDetails.ts
import {
  InfiniteData,
  QueryKey,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JobDetailsData } from "@/types/components/jobs";
import { transformJobData } from "@/utils/transformers/jobs";
import { SingleJobResponse } from "@/types/api";

type CachedJobsQueries = Array<
  [QueryKey, InfiniteData<JobDetailsData> | undefined]
>;

export const useJobDetails = (jobId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      // Look through all jobs queries in the cache
      const cachedQueries: CachedJobsQueries = queryClient.getQueriesData({
        queryKey: ["jobs"],
      });
      // Search through all cached job queries
      for (const [, data] of cachedQueries) {
        // Skip if there's no data
        if (!data?.pages) continue;

        // Find the job in flattened pages
        const allJobs = data.pages.flat();
        const job = allJobs.find((job) => job.id === jobId);

        if (job) {
          // If found in raw format, transform it first
          return !job.__transformed
            ? transformJobData(job as unknown as SingleJobResponse)
            : job;
        }
      }

      // If we get here, the job wasn't found in cache
      throw new Error(
        `Job with ID ${jobId} not found. Try returning to the jobs list.`
      );
    },
    // Keep this cached result longer since we can't refetch it
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};
