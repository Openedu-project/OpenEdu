import { getPopularCoursesServicesAtWebsite } from '@oe/api/services/featured-contents';
import type { ICourse } from '@oe/api/types/course/course';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { CourseCard } from '@oe/ui/components/course-card';
import { cn } from '@oe/ui/utils/cn';
import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection } from '../../../vbi/_components/info-section';

const AvailHomepageCoursesServer: SectionComponent<'homepage', 'availCourses'> = async ({ className, props }) => {
  const [t, dataPopularCourses] = await Promise.all([
    getTranslations('themePage.avail.homepage.availCourses'),
    getPopularCoursesServicesAtWebsite(undefined, {
      params: { org_id: 'apI3DY5K8EphHA2Z' },
    }),
  ]);

  return (
    <div className={cn('space-y-4 bg-accent p-4 md:space-y-8 md:p-8 lg:min-h-[80vh] lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={undefined}
        button={{ text: t?.('button.text'), link: props?.button?.link }}
        className="flex flex-col items-center text-center"
      />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
        {dataPopularCourses?.map(
          (course: IFeaturedContent<ICourse>) =>
            course?.entity && <CourseCard key={course?.entity?.id} courseData={course?.entity} />
        )}
      </div>
    </div>
  );
};

export default AvailHomepageCoursesServer;
