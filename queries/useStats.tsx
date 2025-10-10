import { useQuery } from "@tanstack/react-query";

import { getStatsAction } from "@/utils/actions";

// Query to get a single job
export function useStats() {
  // Get the data
  const { data, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return { data, isPending };
}
