"use client";
import JobCard from "./JobCard";
import { useGetAllJobs } from "@/queries/useGetAllJobs";

function JobsList() {
  // Get the data and isPending state
  const { data, isPending } = useGetAllJobs();

  // Get the jobs from the data
  const jobs = data?.jobs || [];

  // Guard clauses
  if (isPending) return <h2 className="text-xl">Please wait...</h2>;
  if (jobs.length < 1) return <h2 className="text-xl">No jobs found</h2>;

  // Returned JSX
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobsList;
