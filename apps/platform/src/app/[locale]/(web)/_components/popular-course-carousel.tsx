'use client';

import type { ICourse } from '@oe/api/types/course/course';
import { Link } from '@oe/ui/common/navigation';
import { CourseCard } from '@oe/ui/components/course-card';
import { buttonVariants } from '@oe/ui/shadcn/button';
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@oe/ui/shadcn/carousel';
import { cn } from '@oe/ui/utils/cn';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselWrapperProps {
  slides: ICourse[][];
  hasMultipleSlides: boolean;
  viewAllText: string;
  title: string;
}

export function CarouselWrapper({ slides, hasMultipleSlides, viewAllText, title }: CarouselWrapperProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32">{title}</h2>
        <div className="flex items-center gap-2">
          {hasMultipleSlides && (
            <div className="flex gap-2">
              <CarouselPrevious
                className={cn(
                  buttonVariants({
                    variant: 'default',
                  }),
                  'static h-8 w-8 translate-x-0 translate-y-0 rounded-full p-0'
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <CarouselNext
                className={cn(
                  buttonVariants({
                    variant: 'default',
                  }),
                  'static h-8 w-8 translate-x-0 translate-y-0 rounded-full p-0'
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </div>
          )}
          <Link href="/courses" className={buttonVariants({ variant: 'secondary' })}>
            {viewAllText}
          </Link>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <CarouselContent>
          {slides.map(slideItems => (
            <CarouselItem key={slideItems[0]?.id}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {slideItems.map(course => (
                  <CourseCard
                    key={course.id}
                    courseData={course}
                    className="h-full"
                    showHover={true}
                    showPrice={true}
                    showThubnail={true}
                    showOwner={false}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </>
  );
}
