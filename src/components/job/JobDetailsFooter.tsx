import Button from "../reusable/Button";

interface JobDetailsFooterProps {
  position: string;
  companyName: string;
  companyUrl: string;
}

const JobDetailsFooter = (props: JobDetailsFooterProps) => {
  const { companyUrl, companyName, position } = props;

  return (
    <footer className="job-details-footer">
      <div className="job-details-footer__info">
        <h3 className="heading" data-level="3">
          {position}
        </h3>
        <p>{companyName}</p>
      </div>
      <Button isLink url={companyUrl}>
        Company Site
      </Button>
    </footer>
  );
};

export default JobDetailsFooter;
