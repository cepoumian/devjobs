import JobCard from "./JobCard";
import { useFetchJobs } from "@/hooks/api/useActiveJobs";
import { transformJobData } from "@/utils/transformers/jobs";

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

  return (
    <div className="jobs">
      {formattedJobs.map((job, index) => (
        <JobCard
          key={index}
          data={{ position: job.position, company: job.company }}
        />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="load-more-button"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More Jobs"}
        </button>
      )}
    </div>
  );
};

export default Jobs;
