import { JobDetailsData } from "@/types/components/jobs";
import JobCard from "./JobCard";

interface JobGridProps {
  jobs: JobDetailsData[];
  isLoading: boolean;
  error: Error | null;
}

const JobsGrid = (props: JobGridProps) => {
  const { jobs, isLoading, error } = props;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
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
