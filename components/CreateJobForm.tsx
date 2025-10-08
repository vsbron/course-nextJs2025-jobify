"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { JobStatus, JobMode } from "@/utils/types";
import { createAndEditJobSchema, CreateAndEditJobType } from "@/utils/schemas";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { useAddEditJob } from "@/app/queries/useAddEditJob";

function CreateJobForm() {
  // Set up the form with schemas and default values
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  // Get the query client and the router
  const router = useRouter();

  // Get the mutate function and pending state from custom hook
  const { mutate, isPending } = useAddEditJob({
    onSuccess: () => {
      // Redirect the user
      router.push("/jobs");
    },
  });

  // Create form submit handler
  const onSubmit = (values: CreateAndEditJobType) => {
    mutate(values);
  };

  // Returned JSX
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-mutes p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">Add job</h2>
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
            labelText="Job status"
            items={Object.values(JobStatus)}
          />
          {/* MODE */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="Job mode"
            items={Object.values(JobMode)}
          />
          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateJobForm;
