'use client';

import type { IBlog } from '@oe/api/types/blog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#shadcn/carousel';
import { BlogCard, type IBlogCardProps } from './blog-card';

export interface IBlogCarousel {
  title: string;
  viewAllProps?: {
    label?: string;
    href: string;
  };
  blogs: IBlog[];
  className?: string;
  blogCardProps?: IBlogCardProps;
}

export function BlogCarousel({ title, viewAllProps, className, blogs, blogCardProps }: IBlogCarousel) {
  const tGeneral = useTranslations('general');
  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap items-center gap-6">
        <h2 className="giant-iheading-semibold16 md:giant-iheading-semibold20 mb-0 border-primary border-l-[2px] pl-2 text-primary">
          {title}
        </h2>

        {viewAllProps && (
          <Link
            className="mbutton-bold12 md:mbutton-semibold16 text-foreground/70 hover:opacity-80"
            href={viewAllProps.href}
            variant="outline"
            activeClassName=""
          >
            {viewAllProps.label ?? tGeneral('viewAll')}
          </Link>
        )}
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {blogs?.map(blog => (
            <CarouselItem key={`blog-${blog.id}`} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <BlogCard
                blog={blog}
                className="h-full"
                showDescription={blogCardProps?.showDescription}
                showAuthor={blogCardProps?.showAuthor}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {blogs && blogs?.length > 0 && (
          <>
            <CarouselPrevious className="top-[-40px] left-[calc(100%-130px)] hidden h-[48px] w-[48px] bg-white shadow-sm md:flex">
              <ChevronLeft color="var(--primary)" />
            </CarouselPrevious>
            <CarouselNext className="top-[-40px] right-[20px] hidden h-[48px] w-[48px] bg-primary shadow-sm hover:bg-primary md:flex">
              <ChevronRight color="var(--primary-foreground)" />
            </CarouselNext>
          </>
        )}
      </Carousel>
    </div>
  );
}
