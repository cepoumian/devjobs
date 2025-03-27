import { useJobDetails } from "@/hooks/api/useJobDetails";
import { useRouter } from "@tanstack/react-router";
import CompanyCard from "./CompanyCard";
import JobDetailsCard from "./JobDetailsCard";
import JobDetailsFooter from "./JobDetailsFooter";

interface JobDetailsProps {
  jobId: string;
}

const JobDetails = ({ jobId }: JobDetailsProps) => {
  const router = useRouter();

  const { data: job, isLoading, error } = useJobDetails(jobId || "");

  // Handle loading state
  if (isLoading) {
    return <div>Loading job details...</div>;
  }

  // Handle missing job case
  if (error || !job) {
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

  return (
    <>
      <main className="job-details">
        <CompanyCard
          logoUrl={job.companyLogo}
          companyName={job.company}
          companyUrl={job.companyUrl}
        />
        <JobDetailsCard job={job} />
      </main>
      <JobDetailsFooter
        position={job.position}
        companyName={job.company}
        companyUrl={job.companyUrl}
      />
    </>
  );
};

export default JobDetails;
