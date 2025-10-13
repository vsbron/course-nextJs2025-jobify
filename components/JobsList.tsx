"use client";
import ButtonContainer from "./ButtonContainer";
import JobCard from "./JobCard";
import { useGetAllJobs } from "@/queries/useGetAllJobs";

function JobsList() {
  // Get the data and isPending state
  const { data, isPending } = useGetAllJobs();

  // Get the jobs from the data
  const jobs = data?.jobs || [];

  // Set up the response data stats
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  // Guard clauses
  if (isPending) return <h2 className="text-xl">Please wait...</h2>;
  if (jobs.length < 1) return <h2 className="text-xl">No jobs found</h2>;

  // Returned JSX
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize">{count} jobs found</h2>
        {totalPages > 1 ? (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        ) : null}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}

export default JobsList;
