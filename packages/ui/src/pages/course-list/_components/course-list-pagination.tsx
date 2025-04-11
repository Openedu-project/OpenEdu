'use client';
import type { ICourseResponse } from '@oe/api';
import { buildQueryParam } from '@oe/core';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from '#common/navigation';
import { PaginationCustom } from '#components/pagination-custom';

export function CourseListPagination({
  pageValue = 1,
  courses,
}: {
  pageValue: number;
  courses: ICourseResponse | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(pageValue);

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      router.push(
        `${pathname}?${buildQueryParam({
          currentParams: searchParams,
          params: [
            {
              name: 'page',
              value: String(page),
            },
          ],
        })}`,
        {
          scroll: false,
        }
      );
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      }
    },
    [pathname, router, searchParams]
  );

  return (
    <PaginationCustom
      currentPage={courses?.pagination?.page ?? page}
      totalCount={courses?.pagination?.total_items ?? 0}
      onPageChange={handlePageChange}
      pageSize={12}
      className="my-6"
    />
  );
}
