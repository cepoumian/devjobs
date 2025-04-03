import { http, HttpResponse } from "msw";
import { mockJobs } from "./mockData/jobs";
import { YCombinatorJob } from "@/types/api";
import { apiHost } from "@/axios";
import { API_ENDPOINTS } from "@/constants/api";

export const url = `https://${apiHost}${API_ENDPOINTS.JOBS.ACTIVE_LAST_7_DAYS}?offset=0`;

export const handlers = [
  http.get(url, async () => {
    return HttpResponse.json<YCombinatorJob[]>(mockJobs);
  }),
];
