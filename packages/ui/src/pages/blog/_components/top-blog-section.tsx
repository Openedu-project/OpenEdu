import type { IBlog } from '@oe/api/types/blog';
import { useTranslations } from 'next-intl';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import { BlogCard } from './blog-card';
import { NoBlogData } from './no-blog-data';

interface IBlogsProps {
  blogs?: IBlog[];
  className?: string;
  title?: string;
  contentRight?: boolean;
  scrollClassName?: string;
}
export function TopBlogs({ blogs = [], className, title, contentRight = false, scrollClassName }: IBlogsProps) {
  const t = useTranslations('blogSearch');

  return (
    <div className={cn('flex flex-col lg:h-[500px]', className)}>
      {title && (
        <h2
          className={cn('giant-iheading-semibold20 mb-6 line-clamp-2 border-primary border-l-[2px] pl-1 text-primary')}
        >
          {title}
        </h2>
      )}
      <div className="relative grow">
        <div className={cn('top-0 left-0 h-full w-full rounded-lg bg-primary/10 p-3 lg:absolute', scrollClassName)}>
          <ScrollArea className="h-full">
            {blogs.length > 0 ? (
              <div className="flex gap-2 lg:flex-col">
                {blogs.map((item, index) => (
                  <BlogCard
                    key={`rank-${index + 1}`}
                    blog={item}
                    className="w-full min-w-64 bg-white lg:w-auto lg:min-w-0"
                    authorOnTop={!contentRight}
                    contentRight={contentRight}
                  />
                ))}
              </div>
            ) : (
              <NoBlogData message={t('noBlogAvailable')} />
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
