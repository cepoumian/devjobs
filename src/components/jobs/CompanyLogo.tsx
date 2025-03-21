import { useState } from "react";

interface CompanyLogoProps {
  logoUrl: string;
  companyName: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const CompanyLogo = ({
  logoUrl,
  companyName,
  size = "small",
  className = "",
}: CompanyLogoProps) => {
  const [hasError, setHasError] = useState(false);

  // Check if the logo URL exists
  const hasLogo = logoUrl && logoUrl.trim() !== "" && !hasError;

  // Get the first letter of organization name for the fallback
  const firstLetter = companyName ? companyName.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`company-logo__container company-logo__container--${size} ${className}`}
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
