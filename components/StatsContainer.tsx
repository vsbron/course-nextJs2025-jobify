"use client";
import { useStats } from "@/queries/useStats";
import StatsCard from "./StatsCard";

function StatsContainer() {
  // Get the stats from the custom hook
  const { data } = useStats();

  // Returned JSX
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="pending jobs" value={data?.pending || 0} />
      <StatsCard title="interviews set" value={data?.interview || 0} />
      <StatsCard title="jobs declined" value={data?.declined || 0} />
    </div>
  );
}

export default StatsContainer;
