'use client';
import { useGetPopularCoursesAtWebsite } from '@oe/api/hooks/useFeaturedContent';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { ICourse } from '@oe/api/types/course/course';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { CourseCard } from '@oe/ui/components/course-card';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../../vbi/_components/info-section';

export interface AvailHomepageCoursesProps extends InfoSectionProps {}

const AvailHomepageCoursesClient: SectionComponent<'homepage', 'availCourses'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availCourses');
  const { organizationByDomain } = useGetOrganizationByDomain();

  const { dataPopularCourses } = useGetPopularCoursesAtWebsite({
    params: { org_id: organizationByDomain?.id ?? '' },
  });

  return (
    <div className={cn('space-y-4 bg-accent-foreground p-4 md:space-y-8 md:p-8 lg:min-h-[80vh] lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={undefined}
        button={{ text: t?.('button.text'), link: props?.button?.link }}
        className="flex flex-col items-center text-center text-background"
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

export default AvailHomepageCoursesClient;
