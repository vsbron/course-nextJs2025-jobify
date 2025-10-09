import { useDeleteJob } from "@/queries/useDeleteJob";
import { Button } from "./ui/button";

function DeleteJobBtn({ id }: { id: string }) {
  // Get the mutate function and isPending state
  const { mutate, isPending } = useDeleteJob();

  // Returned JSX
  return (
    <Button size="sm" onClick={() => mutate(id)} disabled={isPending}>
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
}

export default DeleteJobBtn;
