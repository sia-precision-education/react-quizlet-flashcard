import React from 'react';
import { useFlashcardSync } from '@/contexts/FlashcardSyncContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/Pagination/Pagination';
import { cn } from '@/utils/cn';

interface FlashcardPaginationProps {
  className?: string;
}

export const FlashcardPagination: React.FC<FlashcardPaginationProps> = ({
  className,
}) => {
  const { currentIndex, totalCards, setCurrentIndex } = useFlashcardSync();

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getVisiblePages = () => {
    const currentPage = currentIndex + 1;
    const totalPages = totalCards;
    const delta = 1; // Number of pages to show on each side of current page

    let pages: (number | string)[] = [];

    // Always include first page
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push('...');
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }

    // Always include last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination className={cn("select-none pt-4", className)}>
      <PaginationContent className="flex w-full max-w-[600px] items-center justify-between gap-4">
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            className={cn(
              "transition-opacity",
              currentIndex === 0 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>

        <div className="flex items-center justify-center gap-1 min-w-[200px]">
          {getVisiblePages().map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === 'number' ? (
                <PaginationLink
                  onClick={() => setCurrentIndex(page - 1)}
                  isActive={currentIndex === page - 1}
                  className="h-9 w-9 p-0"
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationLink
                  className="pointer-events-none h-9 w-9 p-0"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={cn(
              "transition-opacity",
              currentIndex === totalCards - 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default FlashcardPagination;
