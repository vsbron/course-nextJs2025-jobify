import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateJobAction } from "@/utils/actions";
import { CreateAndEditJobType } from "@/utils/schemas";

// Query edit a job
export function useEditJob(jobId: string) {
  // Getting the Query client
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast("there was an error");
        return;
      }
      toast("job updated successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  return { mutate, isPending };
}
