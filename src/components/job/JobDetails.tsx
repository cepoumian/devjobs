import { useJobDetails } from "@/hooks/api/useJobDetails";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import CompanyCard from "./CompanyCard";
import JobDetailsCard from "./JobDetailsCard";
import JobDetailsFooter from "./JobDetailsFooter";
import Button from "../reusable/Button";

interface JobDetailsProps {
  jobId: string;
}

const JobDetails = ({ jobId }: JobDetailsProps) => {
  const { data: job, isLoading, error } = useJobDetails(jobId || "");

  if (isLoading) {
    return (
      <div className="job-details__loading">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-details__not-found | stack">
        <h2 className="heading" data-level="1">
          Job Not Found
        </h2>
        <p>
          This job may no longer be available. You may need to browse the job
          listings first.
        </p>
        <Button isLink url="/">
          View All Jobs
        </Button>
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
