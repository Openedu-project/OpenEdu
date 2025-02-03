import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection, type InfoSectionProps } from '../../../vbi/_components/info-section';
export interface AvailHomepageCoursesProps extends InfoSectionProps {}

const AvailHomepageCourses: SectionComponent<'homepage', 'availCourses'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availCourses');

  return (
    <div className={cn('space-y-4 bg-accent p-4 md:space-y-8 md:p-8 lg:min-h-[80vh] lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={undefined}
        button={{ text: t?.('button.text'), link: props?.button?.link }}
        className="flex flex-col items-center text-center"
      />
    </div>
  );
};

export default AvailHomepageCourses;
