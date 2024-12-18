import { Button } from '@oe/ui/shadcn/button';
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Pagination as ShadPagination,
} from '@oe/ui/shadcn/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IPagination {
  currentPage: number;
  totalCount: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const DOTS = '...';
const DEFAULT_PAGE_SIZE = 10;

const TablePagination = ({
  currentPage,
  totalCount,
  onPageChange,
  className,
  pageSize = DEFAULT_PAGE_SIZE,
}: IPagination) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, DOTS, pageCount);
    } else if (currentPage >= pageCount - 2) {
      pages.push(1, DOTS, pageCount - 3, pageCount - 2, pageCount - 1, pageCount);
    } else {
      pages.push(1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, pageCount);
    }
    return pages;
  };

  return (
    <>
      {pageCount > 1 && (
        <ShadPagination className={className}>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className={`h-8 w-8 rounded-full bg-primary text-primary-foreground ${
                  currentPage === 1 ? 'pointer-events-none opacity-60' : 'cursor-pointer hover:bg-primary/90'
                }`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
            </PaginationItem>
            {generatePageNumbers().map(page =>
              typeof page === 'number' ? (
                <PaginationItem key={page} className="cursor-pointer">
                  <PaginationLink
                    className={`h-8 w-8 rounded-full ${
                      currentPage === page ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-primary/10'
                    }`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <span key={`dots-${page}`} className="cursor-default text-primary">
                  {DOTS}
                </span>
              )
            )}
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className={`h-8 w-8 rounded-full bg-primary text-primary-foreground ${
                  currentPage === pageCount ? 'pointer-events-none opacity-60' : 'cursor-pointer hover:bg-primary/90'
                }`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </ShadPagination>
      )}
    </>
  );
};

export default TablePagination;
