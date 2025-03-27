import CompanyLogo from "../reusable/CompanyLogo";
import Button from "../reusable/Button";
import { useIsMobile } from "@/hooks/generic/useIsMobile";

interface CompanyCardProps {
  logoUrl: string;
  companyName: string;
  companyUrl: string;
}

const CompanyCard = (props: CompanyCardProps) => {
  const isMobile = useIsMobile();
  const { logoUrl, companyName, companyUrl } = props;

  return (
    <article
      className={`company-card ${isMobile ? "-translate-y-20" : "-translate-y-50"}`}
    >
      <div className="company-card__logo">
        <CompanyLogo
          logoUrl={logoUrl}
          companyName={companyName}
          className={isMobile ? "-translate-y-20" : ""}
          size={isMobile ? "small" : "medium"}
        />
      </div>
      <div className="company-card__content">
        <div className="company-card__company">
          <h2 className="company-card__name" data-level="4">
            {companyName}
          </h2>
          <p className="company-card__hostname">
            {new URL(companyUrl).hostname}
          </p>
        </div>
        <Button isLink url={companyUrl}>
          Company Site
        </Button>
      </div>
    </article>
  );
};

export default CompanyCard;
