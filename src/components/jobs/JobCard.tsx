import { Link } from "@tanstack/react-router";
import { JobSummaryData } from "@/types/components/jobs";
import CompanyLogo from "../reusable/CompanyLogo";

export interface JobCardProps {
  data: JobSummaryData;
}

const JobCard = (props: JobCardProps) => {
  const {
    data: {
      id,
      position,
      company,
      companyLogo,
      country,
      postedDate,
      employmentType,
    },
  } = props;

  return (
    <article className="job-card">
      <CompanyLogo logoUrl={companyLogo} companyName={company} />
      <div className="job-card__details">
        <div className="paragraph">
          <span>{postedDate}</span>
          <span> &bull; </span>
          <span>{employmentType}</span>
        </div>
        <Link
          to="/job/$jobId"
          params={{ jobId: id }}
          className="job-card__clickable-title"
        >
          <h3 className="heading" data-level="3">
            {position}
          </h3>
        </Link>
        <p className="paragraph">{company}</p>
      </div>
      <div className="job-card__location">
        <p>{country}</p>
      </div>
    </article>
  );
};

export default JobCard;
