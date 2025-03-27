import { JobDetailsData } from "@/types/components/jobs";
import { useIsMobile } from "@/hooks/generic/useIsMobile";
import Button from "../reusable/Button";

const JobDetailsCard = ({ job }: { job: JobDetailsData }) => {
  const isMobile = useIsMobile();

  return (
    <article className="job-details-card">
      <section className="job-details-card__highlights">
        <div className="paragraph">
          <span>{job.postedDate}</span>
          <span> &bull; </span>
          <span>{job.employmentType}</span>
        </div>
        <h1 className="heading" data-level={isMobile ? "4" : "2"}>
          {job.position}
        </h1>
        <div className="job-details-card__location">
          <p>{job.country}</p>
        </div>
      </section>
      <section className="job-details-card__more-info">
        <div>
          <h2 className="heading" data-level="4">
            Salary Range
          </h2>
          <p>{job.salary}</p>
        </div>
        <div>
          <h2 className="heading" data-level="4">
            Location Type
          </h2>
          <p>{job.locationType}</p>
        </div>
        <Button isLink url={job.companyUrl}>
          Apply Now
        </Button>
      </section>
    </article>
  );
};

export default JobDetailsCard;
