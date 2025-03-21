import { SingleJobResponse } from "@/types/api";
import { JobCardData } from "@/types/components/jobs";

export function transformJobData(apiJob: SingleJobResponse): JobCardData {
  return {
    position: apiJob?.title || "Developer",
    company: apiJob?.organization || "Company",
    location: apiJob?.locations_derived?.join(", ") || "Remote",
    postedDate: new Date(apiJob?.date_posted)?.toLocaleDateString() || "Today",
    emlpoymentType: apiJob?.employment_type?.join(", ") || "Full-time",
    salary: `${apiJob?.salary_raw?.value?.minValue?.toString() || "100000"} - ${apiJob.salary_raw?.value?.maxValue?.toString() || "200000"}`,
  };
}
