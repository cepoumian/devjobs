import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes (doesn't make sense for stale time to exceed gcTime)
      refetchOnWindowFocus: false,
    },
  },
});
