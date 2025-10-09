import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteJobAction } from "@/utils/actions";
import { JobType } from "@/utils/types";

// Query to add / edit a job
export function useDeleteJob() {
  // Getting the Query client
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data: JobType | null) => {
      // Guard clause
      if (!data) {
        toast("There was an error");
        return;
      }
      toast("job removed successfully");

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
  });

  return { mutate, isPending };
}
