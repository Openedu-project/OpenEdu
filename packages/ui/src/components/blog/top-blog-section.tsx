import type { IBlog } from '@oe/api/types/blog';

import WhaleNoData from '@oe/assets/images/whale-no-data.png';
import { useTranslations } from 'next-intl';
import { ScrollArea } from '#shadcn/scroll-area';
import { cn } from '#utils/cn';
import { Image } from '../image';
import { BlogCard } from './blog-card';

interface IBlogsProps {
  blogs?: IBlog[];
  className?: string;
  title: string;
  contentRight?: boolean;
}
export default function TopBlogs({ blogs = [], className, title, contentRight = false }: IBlogsProps) {
  const t = useTranslations('general');

  return (
    <div className={cn('h-[500px]', className)}>
      <h2 className={cn('giant-iheading-semibold20 mb-4 line-clamp-2 border-primary border-l-[2px] pl-1 text-primary')}>
        {title}
      </h2>
      <div className="relative h-[calc(100%-80px)]">
        <div className="absolute top-0 left-0 h-full w-full rounded-lg bg-primary/10 p-3">
          <ScrollArea className="h-full pr-2">
            {blogs.length > 0 ? (
              blogs.map((item, index) => (
                <BlogCard
                  key={`rank-${index + 1}`}
                  blog={item}
                  className="mb-3 bg-white"
                  authorOnTop={!contentRight}
                  contentRight={contentRight}
                />
              ))
            ) : (
              <div className="py-6">
                <Image
                  src={WhaleNoData.src}
                  alt="no-data"
                  priority
                  aspectRatio="1:1"
                  quality={100}
                  fill
                  containerHeight={200}
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
                <p className="mcaption-regular16 lg:mcaption-regular20 w-full p-6 text-center">{t('noData')}</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
