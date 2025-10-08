import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getAllJobsAction } from "@/utils/actions";

import JobsList from "@/components/JobsList";
import SearchForm from "@/components/SearchForm";

async function JobsPage() {
  // Create the query client
  const queryClient = new QueryClient();

  // Prefetch all of the jobs
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });

  // Returned JSX
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />
    </HydrationBoundary>
  );
}

export default JobsPage;
