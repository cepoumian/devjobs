import { JobSummaryData } from "@/types/components/jobs";
import CompanyLogoProps from "./CompanyLogo";

export interface JobCardProps {
  data: JobSummaryData;
}

const JobCard = (props: JobCardProps) => {
  const {
    data: {
      position,
      company,
      companyLogo,
      country,
      postedDate,
      employmentType,
    },
  } = props;

  return (
    <article className="job-card | stack">
      <CompanyLogoProps logoUrl={companyLogo} companyName={company} />
      <div className="job-card__details">
        <div className="paragraph">
          <span>{postedDate}</span>
          <span> &bull; </span>
          <span>{employmentType}</span>
        </div>
        <h3 className="heading" data-level="3">
          {position}
        </h3>
        <p className="paragraph">{company}</p>
      </div>
      <div className="job-card__location">
        <p>{country}</p>
      </div>
    </article>
  );
};

export default JobCard;
