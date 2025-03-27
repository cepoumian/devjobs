export interface JobSummaryData {
  id: string;
  position: string;
  company: string;
  companyLogo: string;
  country: string;
  postedDate: string;
  employmentType: string;
}

export interface JobDetailsData {
  id: string;
  position: string;
  company: string;
  companyLogo: string;
  companyUrl: string;
  location: string;
  country: string;
  postedDate: string;
  employmentType: string;
  salary: string;
  locationType: string;
  url: string;
  __transformed?: boolean;
}
