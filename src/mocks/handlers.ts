import { http, HttpResponse } from "msw";
import { mockJobs } from "./mockData/jobs";
import { YCombinatorJob } from "@/types/api";
import { apiHost } from "@/axios";

export const url = `https://${apiHost}/active-jb-7d?offset=0`;

export const handlers = [
  http.get(url, async () => {
    return HttpResponse.json<YCombinatorJob[]>(mockJobs);
  }),
];
