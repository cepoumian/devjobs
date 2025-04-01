import { JobDetailsData } from "@/types/components/jobs";
import JobCard from "./JobCard";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import Error from "@/components/reusable/Error";

export interface JobGridProps {
  jobs: JobDetailsData[];
  isLoading: boolean;
  error: Error | null;
  retry?: () => void;
}

const JobsGrid = (props: JobGridProps) => {
  const { jobs, isLoading, error, retry } = props;
  if (isLoading) {
    return (
      <div className="jobs__loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <Error error={error} retry={retry} />;
  }

  if (!jobs.length) {
    return <div>No jobs found matching your criteria.</div>;
  }

  return (
    <div className="jobs__grid">
      {jobs.map((job, index) => (
        <JobCard key={index} data={job} />
      ))}
    </div>
  );
};

export default JobsGrid;
