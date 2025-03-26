import { SingleJobResponse, SalaryRaw } from "@/types/api";
import { JobDetailsData } from "@/types/components/jobs";

/**
 * Transforms an ISO date string into a human-readable relative time format
 * e.g. "1 hr ago", "1 day ago", "1 week ago", etc.
 *
 * @param {string} isoDateString - ISO date string from API (e.g. "2025-03-20T15:36:46")
 * @returns {string} - Formatted relative time string
 */
const formatRelativeTime = (isoDateString: string) => {
  // Parse the ISO date string
  const postedDate = new Date(isoDateString);
  const currentDate = new Date();

  // Calculate time difference in milliseconds
  const timeDiff = currentDate.getTime() - postedDate.getTime();

  // Convert to seconds, minutes, hours, days, weeks
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  // Return appropriate string based on time difference
  if (seconds < 60) {
    return seconds === 1 ? "1 sec ago" : `${seconds} secs ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1 hr ago" : `${hours} hrs ago`;
  } else if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (weeks < 4) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
};

/**
 * Transforms employment type from API format to display format
 * @param {string} employmentType - Employment type in API format (e.g., "FULL_TIME", "PART_TIME")
 * @returns {string} - Employment type in display format (e.g., "Full Time", "Part Time")
 */
const transformEmploymentType = (employmentType: string) => {
  if (!employmentType) return "";

  // Handle the case where employmentType might be lowercase
  const type = employmentType.toUpperCase();

  const mappings: { [key: string]: string } = {
    FULL_TIME: "Full Time",
    PART_TIME: "Part Time",
    CONTRACT: "Contract",
    TEMPORARY: "Temporary",
    INTERN: "Internship",
    FREELANCE: "Freelance",
    REMOTE: "Remote",
    // Add more mappings as needed
  };

  return mappings[type as keyof typeof mappings] || employmentType;
};

/**
 * Transforms a location type string into a more readable format.
 *
 * @param locationType - The location type string to transform.
 *                       Possible values are "TELECOMMUTE", "ONSITE", "HYBRID", or any other string.
 * @returns The transformed location type string. If the input is "TELECOMMUTE", "ONSITE", or "HYBRID",
 *          it returns "Telecommute", "Onsite", or "Hybrid" respectively. If the input is any other string,
 *          it returns the input string as is. If the input is falsy, it returns an empty string.
 */
const transformLocationType = (locationType: string) => {
  if (!locationType) return "";

  const mappings: { [key: string]: string } = {
    TELECOMMUTE: "Telecommute",
    ONSITE: "Onsite",
    HYBRID: "Hybrid",
  };

  return mappings[locationType] || locationType;
};

/**
 * Formats a salary_raw object into a human-readable string
 * @param {Object} salaryObj - The salary_raw object from the API
 * @returns {string} Formatted salary string
 */
function formatSalaryRange(salaryObj: SalaryRaw): string {
  // Check if the object has the expected structure
  if (!salaryObj || !salaryObj.value || !salaryObj.currency) {
    return "Salary information unavailable";
  }

  const currency = salaryObj.currency;
  const minValue = salaryObj.value.minValue;
  const maxValue = salaryObj.value.maxValue;
  const unitText = salaryObj.value.unitText?.toLowerCase() || "year";

  // Format the numbers with commas
  const formattedMinValue = minValue ? minValue.toLocaleString() : "";
  const formattedMaxValue = maxValue ? maxValue.toLocaleString() : "";

  // Build the salary string
  let salaryString = "";

  if (minValue && maxValue) {
    // Both min and max are available
    salaryString = `$${formattedMinValue} ${currency} to $${formattedMaxValue} ${currency}`;
  } else if (minValue) {
    // Only min is available
    salaryString = `$${formattedMinValue} ${currency}`;
  } else if (maxValue) {
    // Only max is available
    salaryString = `$${formattedMaxValue} ${currency}`;
  }

  // Add the time period if it's not "year" or if we want to always include it
  if (unitText && unitText !== "year") {
    salaryString += ` per ${unitText}`;
  }

  return salaryString;
}

/**
 * Transforms job data from the API response to the format required by the JobCard component.
 *
 * @param {SingleJobResponse} apiJob - The job data received from the API.
 * @returns {JobCardData} The transformed job data.
 *
 * @remarks
 * This function maps the properties from the API response to the properties required by the JobCard component.
 * Default values are provided for missing properties.
 *
 * @example
 * ```typescript
 * const apiJob = {
 *   title: "Frontend Developer",
 *   organization: "Tech Company",
 *   locations_derived: ["New York", "Remote"],
 *   date_posted: "2023-10-01T00:00:00Z",
 *   employment_type: ["Full-time"],
 *   salary_raw: {
 *     value: {
 *       minValue: 120000,
 *       maxValue: 150000
 *     }
 *   }
 * };
 * const jobCardData = transformJobData(apiJob);
 * console.log(jobCardData);
 * // Output:
 * // {
 * //   position: "Frontend Developer",
 * //   company: "Tech Company",
 * //   location: "New York, Remote",
 * //   postedDate: "10/1/2023",
 * //   employmentType: "Full-time",
 * //   salary: "120000 - 150000"
 * // }
 * ```
 */
export function transformJobData(apiJob: SingleJobResponse): JobDetailsData {
  return {
    id: apiJob?.id || "",
    position: apiJob?.title || "Developer",
    company: apiJob?.organization || "Company",
    companyLogo: apiJob?.organization_logo || "",
    location: apiJob?.locations_derived?.join(", ") || "Remote",
    country:
      apiJob?.countries_derived?.join(", ").split(",")[0] || "United States",
    postedDate: formatRelativeTime(apiJob?.date_posted) || "Today",
    employmentType:
      apiJob?.employment_type?.map(transformEmploymentType).join(", ") ||
      "Full Time",
    salary:
      formatSalaryRange(apiJob?.salary_raw) || "Salary information unavailable",
    locationType: apiJob?.location_type
      ? transformLocationType(apiJob.location_type)
      : "Telecommute",
    __transformed: true,
  };
}
