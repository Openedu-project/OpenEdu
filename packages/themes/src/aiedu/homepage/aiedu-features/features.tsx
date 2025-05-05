import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import AICourseBg from '@oe/assets/images/theme/aiedu/ai-course.png';
import { Image } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';
import { AieduCourseCard, type AieduCourseCardProps } from '../../_components/course-card';
import { AieduLayoutSection } from '../../_components/layout-section';

// Theme step 4: create sectionProps
export interface AieduHomepageFeaturesProps {
  // image?: FileType;
  // modules?: string[];
  // benefits?: string[];
  // button?: AieduButtonProps;
  mainCourse?: AieduCourseCardProps;
  subCourse?: AieduCourseCardProps;
}

//Theme step 7: back to section - hero.tsx, create your code based on the props
const AieduHomepageFeatures: SectionComponent<'homepage', 'aieduFeatures'> = ({ className, props }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduFeatures');

  return (
    <AieduLayoutSection
      background="bg-gradient-to-b from-primary from-50% to-white to-98%"
      className={cn('space-y-8', className)}
    >
      <Image
        src={AICourseBg.src}
        alt="logo"
        // containerHeight={80}
        // fill
        height={AICourseBg?.height ?? 80}
        width={AICourseBg?.width ?? 400}
        quality={100}
        className="h-full w-full object-contain"
      />
      <div className="space-y-4 md:flex md:gap-6 md:space-y-0">
        <AieduCourseCard
          key="main"
          title={t('mainCourse.title')}
          benefits={Array.from({ length: props?.subCourse?.benefits?.length ?? 0 }, (_, i) =>
            t(`mainCourse.benefits.benefit${i + 1}`)
          )}
          image={props?.mainCourse?.image}
          button={{
            text: t('mainCourse.button.text'),
            link: props?.mainCourse?.button?.link,
          }}
        />
        <AieduCourseCard
          key="sub"
          title={t('subCourse.title')}
          benefits={Array.from({ length: props?.subCourse?.benefits?.length ?? 0 }, (_, i) =>
            t(`subCourse.benefits.benefit${i + 1}`)
          )}
          image={props?.subCourse?.image}
          button={{
            text: t('subCourse.button.text'),
            link: props?.subCourse?.button?.link,
          }}
        />
      </div>
    </AieduLayoutSection>
  );
};
// Theme step 22 : export this page
export { AieduHomepageFeatures };
