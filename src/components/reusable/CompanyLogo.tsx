import { useState } from "react";

interface CompanyLogoProps {
  logoUrl: string;
  companyName: string;
  size?: "small" | "medium" | "large";
  className?: string;
  style?: React.CSSProperties;
}

const CompanyLogo = ({
  logoUrl,
  companyName,
  size = "small",
  className = "",
  style = {},
}: CompanyLogoProps) => {
  const [hasError, setHasError] = useState(false);

  // If a logo is not available, we use the first letter of organization name for the fallback
  const hasLogo = logoUrl && logoUrl.trim() !== "" && !hasError;
  const firstLetter = companyName ? companyName.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`company-logo__container company-logo__container--${size} ${className}`}
      style={{ ...style }}
    >
      {hasLogo ? (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className="company-logo__image"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="company-logo__fallback">{firstLetter}</div>
      )}
    </div>
  );
};

export default CompanyLogo;
