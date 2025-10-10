import { useQuery } from "@tanstack/react-query";

import { getStatsAction } from "@/utils/actions";

// Query to get all the stats
export function useStats() {
  // Get the data
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return { data };
}
