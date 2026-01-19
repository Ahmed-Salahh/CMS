"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  showAdvanced?: boolean;
  showFirstLast?: boolean;
  showNextPrevious?: boolean;
  perPageOptions?: number[];
}

export default function Pagination({
  currentPage,
  totalPages,
  perPage,
  totalItems,
  onPageChange,
  onPerPageChange,
  showAdvanced = true,
  showFirstLast = true,
  showNextPrevious = true,
  perPageOptions = [7, 9, 12, 15, 20],
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

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
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex w-full items-center gap-6">
      {showAdvanced && (
        <div className="flex w-[200px] items-center">
          <p className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#525866]">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}

      <div className="flex flex-1 items-center justify-center gap-2">
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="First page"
          >
            <ChevronsLeft className="h-5 w-5 text-[#525866]" />
          </button>
        )}

        {showNextPrevious && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5 text-[#525866]" />
          </button>
        )}

        <div className="flex items-center justify-center gap-2">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2e4e9] bg-white p-1.5 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
                >
                  <p className="font-['Montserrat'] text-center text-sm font-medium leading-5 tracking-[-0.084px] text-[#525866]">
                    ...
                  </p>
                </div>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(pageNumber)}
                className={`flex h-8 w-8 items-center justify-center rounded-md border border-[#e2e4e9] p-1.5 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] transition-colors ${
                  isActive ? "bg-[#f6f8fa]" : "bg-white hover:bg-gray-50"
                }`}
              >
                <p
                  className={`font-['Montserrat'] text-center text-sm font-medium leading-5 tracking-[-0.084px] ${
                    isActive ? "text-[#0a0d14]" : "text-[#525866]"
                  }`}
                >
                  {page}
                </p>
              </button>
            );
          })}
        </div>

        {showNextPrevious && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5 text-[#525866]" />
          </button>
        )}

        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Last page"
          >
            <ChevronsRight className="h-5 w-5 text-[#525866]" />
          </button>
        )}
      </div>

      {showAdvanced && onPerPageChange && (
        <div className="flex w-[200px] flex-col items-end justify-center">
          <div className="relative">
            <button
              className="flex items-center gap-1 rounded-lg border border-[#e2e4e9] bg-white px-3 py-1.5 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] hover:bg-gray-50"
              onClick={(e) => {
                const btn = e.currentTarget;
                const menu = btn.nextElementSibling as HTMLElement;
                if (menu) {
                  menu.classList.toggle("hidden");
                }
              }}
            >
              <span className="font-['Montserrat'] text-sm font-normal leading-5 tracking-[-0.084px] text-[#0a0d14]">
                {perPage} / page
              </span>
              <ChevronDown className="h-5 w-5 text-[#525866]" />
            </button>
            <div className="absolute right-0 top-full z-10 mt-1 hidden w-32 rounded-lg border border-[#e2e4e9] bg-white shadow-lg">
              {perPageOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onPerPageChange(option);
                    // Close dropdown
                    const menu = document.querySelector(
                      ".absolute.right-0",
                    ) as HTMLElement;
                    if (menu) menu.classList.add("hidden");
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                    option === perPage ? "bg-[#f6f8fa] font-medium" : ""
                  }`}
                >
                  {option} / page
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
