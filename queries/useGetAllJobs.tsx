import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getAllJobsAction } from "@/utils/actions";

// Query to get all of the jobs
export function useGetAllJobs() {
  // Get the search params
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const pageNumber = Number(searchParams.get("page")) || 1;

  // Get the data
  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  return { data, isPending };
}
