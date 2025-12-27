import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { paginationProps } from "@/types";
function PaginationButtons({
  page,
  totalPages,
  onPageChange,
  hasPrevPage,
  hasNextPage,
}: paginationProps) {
  const pageNumbers = Array.from(Array(totalPages).keys()) || 1;

  return (
    <div className="flex justify-center items-center gap-6 mt-12 mb-8 ">
      <button
        disabled={page === 1}
        onClick={() => hasPrevPage && onPageChange(page - 1)}
        className="pagination-prev"
      >
        <FiChevronLeft size={20} />
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num + 1)}
          className={`px-3 py-1 rounded ${
            num + 1 === page
              ? "bg-blue-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {num + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => hasNextPage && onPageChange(page + 1)}
        className="pagination-next"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
}

export default PaginationButtons;
