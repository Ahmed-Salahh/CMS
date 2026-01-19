"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SharedPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const SharedPagination: React.FC<SharedPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  basePath = "/programs",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateURL = (page: number, perPage?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    if (perPage) {
      params.set("per_page", perPage.toString());
    }
    startTransition(() => {
      router.push(`${basePath}?${params.toString()}`);
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateURL(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    updateURL(1, parseInt(value)); // Reset to page 1 when changing items per page
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Show 5 page numbers at a time

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6 py-4 border-t border-[#e2e4e9]">
      {/* Left side - Page info */}
      <div className="text-sm whitespace-nowrap text-[#525866]">
        Page {currentPage} of {totalPages}
      </div>

      {/* Center - Pagination controls */}
      <Pagination>
        <PaginationContent>
          {/* First page */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={currentPage === 1}
            >
              ««
            </PaginationLink>
          </PaginationItem>

          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ),
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={`cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>

          {/* Last page */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              className={`cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              aria-disabled={currentPage === totalPages}
            >
              »»
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Right side - Items per page */}
      <div className="flex items-center gap-2">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={handleItemsPerPageChange}
          disabled={isPending}
        >
          <SelectTrigger className="w-[120px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8 / page</SelectItem>
            <SelectItem value="16">16 / page</SelectItem>
            <SelectItem value="24">24 / page</SelectItem>
            <SelectItem value="32">32 / page</SelectItem>
            <SelectItem value="48">48 / page</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SharedPagination;
