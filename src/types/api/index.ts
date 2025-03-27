interface QuantitativeValue {
  "@type": "QuantitativeValue";
  unitText?: "YEAR" | "MONTH" | "WEEK" | "DAY" | "HOUR";
  minValue?: number;
  maxValue?: number;
}

export interface SalaryRaw {
  "@type": "MonetaryAmount";
  currency: string;
  value: QuantitativeValue;
}

export interface YCombinatorJob {
  id: string;
  date_posted: string;
  title: string;
  organization: string;
  organization_url: string;
  employment_type: string[];
  url: string;
  organization_logo: string;
  locations_derived: string[];
  countries_derived: string[];
  location_type: string;
  salary_raw: SalaryRaw;
}

export type JobsApiResponse = YCombinatorJob[];
export type SingleJobResponse = YCombinatorJob;
