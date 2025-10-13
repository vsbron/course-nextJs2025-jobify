"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";

// Props type
type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

// The component
function ButtonContainer({ currentPage, totalPages }: ButtonContainerProps) {
  // Get the search params, router and pathname
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Set the array of pagination buttons
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Page change handler
  const handlePageChange = (page: number) => {
    // Set the params based on the current url
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };
    const params = new URLSearchParams(defaultParams);

    // Redirect the user with new search params
    router.push(`${pathname}?${params.toString()}`);
  };

  // Returned JSX
  return (
    <div className="flex gap-2">
      {pageButtons.map((page) => (
        <Button
          key={page}
          size="icon"
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
}

export default ButtonContainer;
