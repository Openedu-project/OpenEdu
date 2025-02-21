'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from '#common/navigation';
import { PaginationCustom } from '#components/pagination-custom';

export default function MyLaunchpadPagination({
  currentPage = 1,
  totalCount = 1,
}: {
  currentPage: number;
  totalCount: number;
}) {
  const [page, setPage] = useState<number>(currentPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      router.push(`${pathname}?${createQueryString('page', String(page))}`, {
        scroll: false,
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      }
    },
    [createQueryString, pathname, router]
  );

  return (
    <PaginationCustom
      className="mt-6"
      currentPage={page ?? 1}
      totalCount={totalCount ?? 0}
      onPageChange={handlePageChange}
      pageSize={12}
    />
  );
}
