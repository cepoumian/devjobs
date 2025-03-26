import JobDetails from "@/components/job/JobDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/job/$jobId")({
  component: JobDetailsPage,
});

function JobDetailsPage() {
  // TanStack Router provides params via the useParams hook
  const { jobId } = Route.useParams();

  return (
    <>
      <JobDetails jobId={jobId} />
    </>
  );
}
