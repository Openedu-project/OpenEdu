'use client';
import { useGetBlogsPublish } from '@oe/api/hooks/useBlog';
import type { IBlogsResponse, IPublishBlogType } from '@oe/api/types/blog';
import { useEffect, useState } from 'react';
import { PaginationCustom } from '#components/pagination-custom';
import { BlogCard } from './blog-card';
import { BlogGridSkeleton } from './blog-skeleton';

const PER_PAGE = 12;

interface BlogListProps {
  fallbackData?: IBlogsResponse;
  id?: string;
  searchText?: string;
  type: IPublishBlogType;
}

export function BlogList({ type, fallbackData, id, searchText = '' }: BlogListProps) {
  const [params, setParams] = useState({
    page: 1,
    per_page: PER_PAGE,
    sort: 'update_at desc',
    search_categories: 'title',
    search_term: searchText,
  });

  useEffect(() => {
    setParams(prev => ({ ...prev, search_term: searchText }));
  }, [searchText]);

  const { dataListBlog: dataBlogPublish, isLoadingBlog } = useGetBlogsPublish(
    type,
    params,
    id,
    params.page === 1 ? fallbackData : undefined
  );

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  if (isLoadingBlog) {
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
        currentPage={dataBlogPublish?.pagination?.page ?? 1}
        totalCount={dataBlogPublish?.pagination?.total_items ?? 0}
        onPageChange={handlePageChange}
        pageSize={PER_PAGE}
      />
    </>
  );
}
