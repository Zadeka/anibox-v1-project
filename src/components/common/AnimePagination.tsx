// src/components/common/AnimePagination.tsx
import { Button } from "@/components/ui/button";

interface AnimePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export function AnimePagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: AnimePaginationProps) {
  const getPaginationRange = () => {
    const range: number[] = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-end gap-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || loading}
      >
        Previous
      </Button>

      {/* First page if not in range */}
      {currentPage > 3 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            disabled={loading}
          >
            1
          </Button>
          {currentPage > 4 && (
            <span className="flex items-center px-2">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {getPaginationRange().map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(pageNum)}
          disabled={loading}
        >
          {pageNum}
        </Button>
      ))}

      {/* Last page if not in range */}
      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && (
            <span className="flex items-center px-2">...</span>
          )}
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            disabled={loading}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || loading}
      >
        Next
      </Button>
    </div>
  );
}
