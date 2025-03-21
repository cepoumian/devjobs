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
  location_type: string;
  salary_raw: {
    value: {
      minValue: number;
      maxValue: number;
    };
  };
}

export type JobsApiResponse = YCombinatorJob[];
export type SingleJobResponse = YCombinatorJob;
