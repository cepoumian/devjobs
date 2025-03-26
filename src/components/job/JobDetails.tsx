// JobDetails.tsx
import { useJobDetails } from "@/hooks/api/useJobDetails";
import { /* useParams, */ useRouter } from "@tanstack/react-router";

interface JobDetailsProps {
  jobId: string;
}

const JobDetails = ({ jobId }: JobDetailsProps) => {
  // const { jobId } = useParams({ from: "/job/$jobId" });
  const router = useRouter();

  const { data: job, isLoading, error } = useJobDetails(jobId || "");

  console.log("job", job);

  // Handle missing job case
  if (error) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>
        <p>
          This job may no longer be available or you need to browse the job
          listings first.
        </p>
        <button onClick={() => router.navigate({ to: "/" })}>
          View All Jobs
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading job details...</div>;
  }

  return (
    <main className="job-details">
      {job ? <h1>{job.position}</h1> : <h1>Uuuupppss!</h1>}
      {/* Rest of your job details UI */}
    </main>
  );
};

export default JobDetails;
