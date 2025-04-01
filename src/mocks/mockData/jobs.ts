import { YCombinatorJob } from "@/types/api";

export const mockJobs: YCombinatorJob[] = [
  {
    id: "ycw-1234",
    date_posted: "2025-03-15T08:00:00.000Z",
    title: "Senior Software Engineer",
    organization: "TechNova AI",
    organization_url: "https://www.technova.ai",
    employment_type: ["FULL_TIME", "PERMANENT"],
    url: "https://www.ycombinator.com/companies/technova-ai/jobs/ycw-1234",
    organization_logo:
      "https://cdn.ycombinator.com/assets/technova-ai-logo.png",
    locations_derived: ["San Francisco, CA", "Remote, US"],
    countries_derived: ["US"],
    location_type: "REMOTE",
    salary_raw: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
        minValue: 150000,
        maxValue: 200000,
      },
    },
  },
  {
    id: "ycw-5678",
    date_posted: "2025-03-20T10:15:00.000Z",
    title: "Product Manager",
    organization: "FinanceFlow",
    organization_url: "https://www.financeflow.io",
    employment_type: ["FULL_TIME"],
    url: "https://www.ycombinator.com/companies/financeflow/jobs/ycw-5678",
    organization_logo:
      "https://cdn.ycombinator.com/assets/financeflow-logo.png",
    locations_derived: ["New York, NY"],
    countries_derived: ["US"],
    location_type: "ONSITE",
    salary_raw: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR",
        minValue: 130000,
        maxValue: 170000,
      },
    },
  },
  {
    id: "ycw-9012",
    date_posted: "2025-03-25T14:30:00.000Z",
    title: "DevOps Engineer",
    organization: "CloudStack Solutions",
    organization_url: "https://www.cloudstack.dev",
    employment_type: ["FULL_TIME", "CONTRACT"],
    url: "https://www.ycombinator.com/companies/cloudstack-solutions/jobs/ycw-9012",
    organization_logo: "https://cdn.ycombinator.com/assets/cloudstack-logo.png",
    locations_derived: ["Ontario, CA", "Remote, Global"],
    countries_derived: ["CA"],
    location_type: "ONSITE",
    salary_raw: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "HOUR",
        minValue: 75,
        maxValue: 110,
      },
    },
  },
];
