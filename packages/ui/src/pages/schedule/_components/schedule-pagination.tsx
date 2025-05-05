'use client';
import type { IScheduleEventRes } from '@oe/api';
import { buildQueryParam } from '@oe/core';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from '#common/navigation';
import { PaginationCustom } from '#components/pagination-custom';

export function ScheduleEventListPagination({
  pageValue = 1,
  events,
}: {
  pageValue: number;
  events: IScheduleEventRes | null;
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
      currentPage={events?.pagination?.page ?? page}
      totalCount={events?.pagination?.total_items ?? 0}
      onPageChange={handlePageChange}
      pageSize={10}
      className="my-6"
    />
  );
}
