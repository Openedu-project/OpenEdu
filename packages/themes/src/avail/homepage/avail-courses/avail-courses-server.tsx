import { cn } from '@oe/ui';
import { getTranslations } from 'next-intl/server';
import { PopularCourseList } from '../../../_components/web/popular-course-list';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection } from '../../../vbi/_components/info-section';
import { getPopularCourses } from '../_actions/popular-course';

const AvailHomepageCoursesServer: SectionComponent<'homepage', 'availCourses'> = async ({ className, props }) => {
  const [t, dataPopularCourses] = await Promise.all([
    getTranslations('themePage.avail.homepage.availCourses'),
    getPopularCourses(),
  ]);

  return (
    <div className={cn('bg-accent-foreground px-4 py-8 md:p-8 lg:p-12', className)}>
      <div className="container space-y-4 md:space-y-8">
        <InfoSection
          title={t('title')}
          titleSub={undefined}
          button={{ text: t?.('button.text'), link: props?.button?.link }}
          className="flex flex-col items-center text-center text-background"
        />
        {/* <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
          {dataPopularCourses?.map(
            (course: IFeaturedContent<ICourse>) =>
              course?.entity && (
                <CourseCard
                  key={course?.entity?.id}
                  courseData={course?.entity}
                />
              )
          )}
        </div> */}
        <PopularCourseList fallback={dataPopularCourses} />
      </div>
    </div>
  );
};

export { AvailHomepageCoursesServer };
