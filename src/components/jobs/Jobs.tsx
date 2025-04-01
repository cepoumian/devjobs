import { useFetchJobs } from "@/hooks/api/useJobs";
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

  const allJobs = apiData?.pages.flatMap((page) => page) || [];

  const handleSubmit = (filters: Filters) => {
    setFilters(filters);
    refetch();
  };

  return (
    <main className="jobs">
      <ResponsiveFilters onSubmit={handleSubmit} />
      <JobsGrid
        jobs={allJobs}
        isLoading={isLoading}
        error={error ? error : null}
        retry={refetch}
      />
      {hasNextPage && (
        <div className="jobs__load-more">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            Load More
          </Button>
        </div>
      )}
    </main>
  );
};

export default Jobs;
