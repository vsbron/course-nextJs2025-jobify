"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { JobStatus } from "@/utils/types";

// Props type
type SearchFormProps = { text: string; status: JobStatus };

// The component
function SearchForm({ text, status }: SearchFormProps) {
  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    console.log(search, jobStatus);
  };

  // Returned JSX
  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input type="text" placeholder="Search jobs..." name="search" />
      <Select name="jobStatus">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((jobStatus) => (
            <SelectItem key={jobStatus} value={jobStatus}>
              {jobStatus}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchForm;
