import { cn } from '@oe/ui/utils/cn';
import type { SectionComponent } from '../../../_types/theme-page';

import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

export interface VbiHomepageCoursesProps extends InfoSectionProps {}

const VbiHomepageCourses: SectionComponent<'homepage', 'vbiCourses'> = ({ className, t }) => {
  if (!t) {
    return null;
  }

  return (
    <div className={cn('space-y-4 p-4 md:space-y-8 md:p-8 lg:p-12', className)}>
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
