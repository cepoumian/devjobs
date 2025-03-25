import { useFetchJobs } from "@/hooks/api/useJobs";
import { transformJobData } from "@/utils/transformers/jobs";
import Button from "../reusable/Button";
import ResponsiveFilters from "./filters/ResponsiveFilters";
import { Filters } from "@/types/components/filters";
import { useState } from "react";
import JobsGrid from "./JobsGrid";

const Jobs = () => {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    location: "",
    remoteOnly: false,
  });

  const {
    data: apiData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchJobs(filters);

  // Flatten the pages array to get all jobs
  const allJobs = apiData?.pages.flatMap((page) => page) || [];

  // Transform the data to match the JobCard component's props
  const formattedJobs = allJobs.map(transformJobData);

  const handleSubmit = (filters: Filters) => {
    setFilters(filters);
    refetch();
    console.log("filters", filters);
  };

  return (
    <main className="jobs">
      <ResponsiveFilters onSubmit={handleSubmit} />
      <JobsGrid
        jobs={formattedJobs}
        isLoading={isLoading}
        error={error ? error : null}
      />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load More
        </Button>
      )}
    </main>
  );
};

export default Jobs;
