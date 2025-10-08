import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CreateJobForm from "@/components/CreateJobForm";

function AddJobPage() {
  // Set up React Query client
  const queryClient = new QueryClient();

  // Returned JSX
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
  );
}

export default AddJobPage;
