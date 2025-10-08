import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createJobAction } from "@/utils/actions";
import { CreateAndEditJobType } from "@/utils/schemas";
import { JobType } from "@/utils/types";

// Query to add / edit a job
export function useAddEditJob(options?: { onSuccess?: () => void }) {
  // Getting the Query client
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data: JobType | null) => {
      // Guard clause
      if (!data) {
        toast("There was an error");
        return;
      }
      toast("job created");
      options?.onSuccess?.();

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
  });

  return { mutate, isPending };
}
