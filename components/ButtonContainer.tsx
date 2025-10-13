"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./ui/button";

// Props types
type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};
type ButtonProps = {
  page: number;
  activeClass: boolean;
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

  // Adding a page button helper function
  const addPageButton = ({ page, activeClass }: ButtonProps) => (
    <Button
      size="icon"
      variant={activeClass ? "default" : "outline"}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </Button>
  );

  // Render all pagination button function
  const renderPageButtons = () => {
    const pageButtons = [];
    // First page
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );

    // Dots
    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      );
    }

    // One before current page
    if (currentPage > 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // Current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }

    // One after current page
    if (currentPage < totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // Dots
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      );
    }

    // Last page
    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );

    // Return the array
    return pageButtons;
  };

  // Returned JSX
  return (
    <div className="flex gap-2">
      {/* Prev button */}
      <Button
        size="icon"
        variant={currentPage === 1 ? "outline" : "default"}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>

      {/* All buttons */}
      {renderPageButtons()}

      {/* Next button */}
      <Button
        size="icon"
        variant={currentPage === totalPages ? "outline" : "default"}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default ButtonContainer;
