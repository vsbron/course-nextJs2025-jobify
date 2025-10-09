import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";

// Props type
interface JobPageProps {
  params: Promise<{ id: string }>;
}

// The component
async function JobPage({ params }: JobPageProps) {
  // Get the ID from the params
  const { id } = await params;

  // Create the query client
  const queryClient = new QueryClient();

  // Prefetch all of the jobs
  await queryClient.prefetchQuery({
    queryKey: ["jobs", id],
    queryFn: () => getSingleJobAction(id),
  });

  // Returned JSX
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  );
}

export default JobPage;
