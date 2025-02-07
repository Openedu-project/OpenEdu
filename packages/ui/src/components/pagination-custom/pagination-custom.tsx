import { PAGE_SIZE } from '@oe/core/utils/constants';
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadPagination,
} from '@oe/ui/shadcn/pagination';

interface IPagination {
  currentPage: number;
  totalCount: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const DOTS = '...';

const PaginationCustom = ({ currentPage, totalCount, onPageChange, className, pageSize = PAGE_SIZE }: IPagination) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const generatePageNumbers = () => {
    const pages: unknown[] = [];

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
            {pageCount > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className={` ${currentPage === 1 ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
                  onClick={() => onPageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {generatePageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <PaginationItem key={index.toString()} className="cursor-pointer">
                  <PaginationLink
                    className="h-8 w-8 rounded-m hover:text-primary"
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <span key={index.toString()} className="cursor-default">
                  {DOTS}
                </span>
              )
            )}
            {pageCount > 1 && (
              <PaginationItem>
                <PaginationNext
                  className={`
                    ${currentPage === pageCount ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
                  onClick={() => onPageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </ShadPagination>
      )}
    </>
  );
};

export default PaginationCustom;
