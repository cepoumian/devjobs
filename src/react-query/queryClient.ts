import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 1200000, // 20 minutes
      refetchOnWindowFocus: false,
    },
  },
});
