import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";

async function JobPage({ params }: { params: Record<string, string> }) {
  // Create the query client
  const queryClient = new QueryClient();

  // Prefetch all of the jobs
  await queryClient.prefetchQuery({
    queryKey: ["jobs", params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  // Returned JSX
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}

export default JobPage;
