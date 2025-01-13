'use client';

import { PaginationCustom } from '@oe/ui/components/pagination-custom';

interface PaginationWrapperProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function PaginationWrapper({ currentPage, totalCount, pageSize, onPageChange }: PaginationWrapperProps) {
  return (
    <PaginationCustom
      currentPage={currentPage}
      totalCount={totalCount}
      onPageChange={onPageChange}
      pageSize={pageSize}
      className="p-8"
    />
  );
}
