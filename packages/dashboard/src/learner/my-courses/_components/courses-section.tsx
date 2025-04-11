import type { ICourseOutline } from '@oe/api';
import type { TMyCourseStatus } from '@oe/api';
import { buttonVariants } from '@oe/ui';
import { Link } from '@oe/ui';
import { CourseComingSoon } from '@oe/ui';
import { Spinner } from '@oe/ui';
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@oe/ui';
import { cn } from '@oe/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CourseCard } from '../../_components/course-card';

export function CourseSection({
  title,
  courseList,
  courseStatus,
  isLoading,
  commingSoon,
  href,
}: {
  title: string;
  courseList?: ICourseOutline[];
  courseStatus: TMyCourseStatus;
  isLoading?: boolean;
  commingSoon?: boolean;
  href?: string;
  //   mutate?: IMutateCourse<ICourseInProgress>;
}) {
  const t = useTranslations('myLearningSpace.dashboard');
  const tCourses = useTranslations('myLearningSpace.myCourses');

  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
        loop: false,
      }}
    >
      <div className="shadow-shadow-5">
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <h3 className="mcaption-semibold18 md:mcaption-semibold24 mb-0">{title}</h3>

            <Link
              href={href ?? ''}
              className={cn(buttonVariants({ variant: 'outline' }), 'py-2 text-accent-foreground hover:no-underline')}
            >
              {t('viewAll')}
            </Link>
          </div>
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
        </div>

        {commingSoon ? (
          <CourseComingSoon />
        ) : isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <CarouselContent className="ml-0 flex gap-6">
            {courseList && courseList?.length > 0 ? (
              courseList?.map(course => (
                <CourseCard
                  key={course.id}
                  className="min-w-[234px] max-w-[234px]"
                  courseData={course}
                  courseStatus={courseStatus}
                />
              ))
            ) : (
              <p className="giant-iheading-semibold16 w-full text-center text-bg-neutral-500">{tCourses('noData')}</p>
            )}
          </CarouselContent>
        )}
      </div>
    </Carousel>
  );
}
