"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useGetJob } from "@/queries/useGetJob";
import { useEditJob } from "@/queries/useEditJob";
import { createAndEditJobSchema, CreateAndEditJobType } from "@/utils/schemas";
import { JobStatus, JobMode } from "@/utils/types";

function EditJobForm({ jobId }: { jobId: string }) {
  // Get the job and mutate functions
  const { data } = useGetJob(jobId);
  const { mutate, isPending } = useEditJob(jobId);

  // Get the router
  const router = useRouter();

  // Set up the form with schema
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  // Form submit handler
  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
    router.push("/jobs");
  };

  // Returned JSX
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* POSITION */}
          <CustomFormField name="position" control={form.control} />
          {/* COMPANY */}
          <CustomFormField name="company" control={form.control} />
          {/* LOCATION */}
          <CustomFormField name="location" control={form.control} />

          {/* STATUS */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* TYPE */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          {/* BUTTON */}
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "updating..." : "edit job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default EditJobForm;
