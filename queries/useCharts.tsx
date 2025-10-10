import { useQuery } from "@tanstack/react-query";

import { getChartsDataAction } from "@/utils/actions";

// Query to get the charts data
export function useCharts() {
  // Get the data
  const { data, isPending } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  return { data, isPending };
}
