import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';

import { InfoSection, type InfoSectionProps } from '../_components/info-section';

export interface VbiHomepageCoursesProps extends InfoSectionProps {}

const VbiHomepageCourses: SectionComponent<'homepage', 'vbiCourses'> = ({ props, className }) => {
  const t = useTranslations('themePage.vbi.homepage.vbiCourses');
  console.log(props);

  return (
    <div className={cn('space-y-4', className)}>
      <InfoSection
        title={t('title')}
        titleSub={t('titleSub')}
        button={{ text: t('button.text'), link: t('button.link') }}
        className="flex flex-col items-center text-center"
      />
      {/* TODO: list courses */}
    </div>
  );
};

export default VbiHomepageCourses;
