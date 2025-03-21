import axios from "axios";

const apiHost =
  import.meta.env.VITE_RAPID_API_HOST ||
  "free-y-combinator-jobs-api.p.rapidapi.com";
const apiKey = import.meta.env.VITE_RAPID_API_KEY;

export const jobsApiClient = axios.create({
  baseURL: `https://${apiHost}`,
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
});

jobsApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("RapidAPI Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
