'use client';
import { useGetCoursesPublish } from '@oe/api/hooks/useCourse';
import type { ICourse, ICourseResponse } from '@oe/api/types/course/course';
import type { IFilter } from '@oe/api/types/filter';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { CourseCard } from '@oe/ui/components/course-card';
import { buttonVariants } from '@oe/ui/shadcn/button';
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@oe/ui/shadcn/carousel';
import { cn } from '@oe/ui/utils/cn';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselWrapperProps {
  coursesData?: ICourseResponse;
  // hasMultipleSlides: boolean;
  viewAllText: string;
  title: string;
  params: IFilter;
}

export function CarouselWrapper({
  coursesData,
  // hasMultipleSlides,
  viewAllText,
  title,
  params,
}: CarouselWrapperProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  const { dataListCourses, mutateListCourses } = useGetCoursesPublish(params, coursesData);

  const courses = dataListCourses?.results || [];
  const hasMultipleSlides = courses?.length > 8;

  const slides: ICourse[][] = [];
  for (let i = 0; i < courses.length; i += 8) {
    slides.push(courses.slice(i, i + 8));
  }

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
          <Link href={PLATFORM_ROUTES.courses} className={buttonVariants({ variant: 'secondary' })}>
            {viewAllText}
          </Link>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <CarouselContent>
          {slides?.map(slideItems => (
            <CarouselItem key={slideItems[0]?.id}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {slideItems?.map(course => (
                  <CourseCard
                    key={course.id}
                    courseData={course}
                    className="h-full"
                    showHover={true}
                    showPrice={true}
                    showThubnail={true}
                    showOwner={false}
                    mutate={mutateListCourses}
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
