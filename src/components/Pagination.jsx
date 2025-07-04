import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
   <div className="flex justify-end mt-4">

      <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-200"
        >
          <ChevronLeft size={16} />
        </button>

        {renderPageNumbers().map((pageNum, index) => (
          <div key={index}>
            {pageNum === "..." ? (
              <div className="flex items-center justify-center w-10 h-10 text-gray-400 border-r border-gray-200">
                ...
              </div>
            ) : (
              <button
                onClick={() => onPageChange(Number(pageNum))}
                className={`flex items-center justify-center w-10 h-10 text-sm font-medium border-r border-gray-200 transition-colors ${
                  page === pageNum
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
