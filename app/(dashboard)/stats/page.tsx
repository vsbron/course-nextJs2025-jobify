import { getStatsAction, getChartsDataAction } from "@/utils/actions";

async function StatsPage() {
  // Get the stats
  const stats = await getChartsDataAction();

  console.log(stats);

  // Returned JSX
  return <div>Stats Page</div>;
}

export default StatsPage;
