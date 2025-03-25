import JobCard from "./JobCard";
import { useFetchJobs } from "@/hooks/api/useJobs";
import { transformJobData } from "@/utils/transformers/jobs";
import Button from "../reusable/Button";
import ResponsiveFilters from "./filters/ResponsiveFilters";
import { Filters } from "@/types/components/filters";

const Jobs = () => {
  const {
    data: apiData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchJobs();

  console.log("apiData", apiData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  if (!apiData?.pages.length) {
    return <div>No jobs found matching your criteria.</div>;
  }

  // Flatten the pages array to get all jobs
  const allJobs = apiData?.pages.flatMap((page) => page) || [];

  console.log("allJobs", allJobs);

  const formattedJobs = allJobs.map(transformJobData);
  console.log("formattedJobs", formattedJobs);

  const handleSubmit = (filters: Filters) => {
    console.log("filters", filters);
  };

  return (
    <main className="jobs">
      <ResponsiveFilters onSubmit={handleSubmit} />
      <div className="jobs__grid">
        {formattedJobs.map((job, index) => (
          <JobCard key={index} data={job} />
        ))}
      </div>

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load More
        </Button>
      )}
    </main>
  );
};

export default Jobs;
