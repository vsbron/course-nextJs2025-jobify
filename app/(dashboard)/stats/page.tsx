import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ChartsContainer from "@/components/ChartsContainer";
import StatsContainer from "@/components/StatsContainer";
import { getChartsDataAction, getStatsAction } from "@/utils/actions";

async function StatsPage() {
  // Create the query client
  const queryClient = new QueryClient();

  // Prefetch stats and charts data
  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  // Returned JSX
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
}

export default StatsPage;
