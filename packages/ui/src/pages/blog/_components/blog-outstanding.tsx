import type { IBlog } from '@oe/api/types/blog';
import { useTranslations } from 'next-intl';
import { cn } from '#utils/cn';
import { BlogCard } from './blog-card';
import { BlogWithTab } from './blog-with-tab';
import { TopBlogs } from './top-blog-section';

interface IBlogOutstandingProps {
  scrollBlogs: IBlog[];
  defaultBlogs: IBlog[];
  scrollTitle?: string;
  defaultTitle?: string;
  orgBlogs?: IBlog[];
  className?: string;
}

export function BlogOutstanding({
  defaultTitle,
  scrollBlogs,
  defaultBlogs,
  scrollTitle,
  orgBlogs = [],
  className,
}: IBlogOutstandingProps) {
  const t = useTranslations('blogOutstanding');
  return (
    <div className={cn('flex flex-col gap-4 md:gap-8 lg:flex-row', className)}>
      <div className="grow">
        <h2 className="giant-iheading-semibold20 mb-6 border-primary border-l-[2px] pl-2 text-primary">
          {defaultTitle ?? t('features')}
        </h2>
        <div className="flex gap-3 overflow-auto md:grid md:grid-cols-3 md:gap-6">
          {defaultBlogs.slice(0, 4).map((blog, index) => {
            if (index === 0) {
              return <BlogCard key={blog.id} className="min-w-64 md:col-span-3" blog={blog} contentRight />;
            }
            return <BlogCard className="min-w-64 md:min-w-0" key={blog.id} blog={blog} />;
          })}
        </div>
      </div>
      {orgBlogs.length > 0 ? (
        <div className="flex flex-col lg:w-1/4 lg:shrink-0">
          {
            <h2 className="giant-iheading-semibold20 mb-6 line-clamp-2 border-primary border-l-[2px] pl-1 text-primary">
              {scrollTitle ?? t('theNewest')}
            </h2>
          }
          <BlogWithTab
            blogList1={scrollBlogs}
            blogList2={orgBlogs}
            title1={t('author')}
            title2={t('organization')}
            className="w-full grow"
          />
        </div>
      ) : (
        <TopBlogs
          title={scrollTitle ?? t('theNewest')}
          blogs={scrollBlogs}
          className="lg:h-auto lg:w-1/4 lg:shrink-0"
        />
      )}
    </div>
  );
}
