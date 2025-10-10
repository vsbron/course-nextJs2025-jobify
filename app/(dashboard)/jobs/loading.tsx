import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  // Returned JSX
  return (
    <Card className="w-full h-[100px] py-8 px-2">
      <CardHeader className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </CardHeader>
    </Card>
  );
}

export default loading;
