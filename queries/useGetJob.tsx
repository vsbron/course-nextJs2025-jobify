import { useQuery } from "@tanstack/react-query";

import { getSingleJobAction } from "@/utils/actions";

// Query to get a single job
export function useGetJob(jobId: string) {
  // Get the data
  const { data } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });

  return { data };
}
