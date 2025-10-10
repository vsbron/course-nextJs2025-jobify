import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  // Returned JSX
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsLoadingCard />
      <StatsLoadingCard />
      <StatsLoadingCard />
    </div>
  );
}

// Helper component
export function StatsLoadingCard() {
  // Returned JSX
  return (
    <Card className="w-full h-[90px]">
      <CardHeader className="flex flex-row justify-between items-center">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardHeader>
    </Card>
  );
}

export default loading;
