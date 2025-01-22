'use client';
import { useGetListBlogs } from '@oe/api/hooks/useBlog';
import type { IBlogsResponse } from '@oe/api/types/blog';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { PaginationCustom } from '#components/pagination-custom';
import { BlogCard } from './blog-card';
import { BlogGridSkeleton } from './blog-skeleton';

const PER_PAGE = 12;

interface BlogListProps {
  fallbackData?: IBlogsResponse;
}

export function BlogList({ fallbackData }: BlogListProps) {
  const searchParams = useSearchParams();
  const [params, setParams] = useState({
    ...Object.fromEntries(searchParams),
    page: 1,
    per_page: PER_PAGE,
    sort: 'create_at desc',
  });

  const { blogsData: dataBlogPublish, isLoadingBlogs } = useGetListBlogs(
    {params,
    fallback: params.page === 1 ? fallbackData : undefined}
  );

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isLoadingBlogs) {
    return <BlogGridSkeleton />;
  }

  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:grid-cols-3 lg:grid-cols-4">
        {dataBlogPublish?.results?.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <PaginationCustom
        className="mb-4"
        currentPage={dataBlogPublish?.pagination?.page ?? 1}
        totalCount={dataBlogPublish?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
      />
    </>
  );
}
