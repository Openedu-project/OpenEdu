import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';

import AICourseBg from '@oe/assets/images/theme/aiedu/ai-course.png';
import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import type { SectionComponent } from '../../../_types/theme-page';
import { AieduButton, type AieduButtonProps } from '../../_components/button';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

// Theme step 4: create sectionProps
export interface AieduHomepageFeaturesProps extends TitleProps {
  image?: FileType;
  modules?: string[];
  benefits?: string[];
  button?: AieduButtonProps;
}

//Theme step 7: back to section - hero.tsx, create your code based on the props
const AieduHomepageFeatures: SectionComponent<'homepage', 'aieduFeatures'> = ({ className, props }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduFeatures');
  return (
    <AieduLayoutSection
      background="bg-gradient-to-b from-primary from-50% to-white to-98%"
      className={cn('space-y-6', className)}
    >
      <Image
        src={AICourseBg.src}
        alt="logo"
        // containerHeight={80}
        // fill
        height={AICourseBg?.height ?? 80}
        width={AICourseBg?.width ?? 400}
        // quality={100}
        className="h-full w-full object-contain"
      />
      <div className="space-y-2 md:flex md:justify-between">
        {/* Left side - Title */}
        {/* biome-ignore lint/nursery/useSortedClasses: <explanation> */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:max-w-[400px]">
          <Title title={t('title')} variant="secondary" />
        </div>

        {/* Right side - Bullet points */}
        <div className="text-background md:w-1/2 md:pl-8">
          <ul className="space-y-2">
            {props?.benefits?.map((_benefit, index) => (
              <li key={index.toString()} className="flex items-start">
                <div className="mt-1 mr-2 min-w-4">•</div>
                <div>{t(`benefits.benefit${index + 1}`)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-2 rounded-lg bg-background p-4 md:flex md:gap-8 md:p-8">
        <div className="md:w-1/2">
          <Image
            alt="image"
            src={props?.image?.url}
            width={props?.image?.width ?? 570}
            height={props?.image?.height ?? 320}
            className="h-full max-h-[320px] w-full rounded-lg object-cover"
          />
        </div>
        {/* Course modules */}
        <div className="space-y-3 md:flex md:w-1/2 md:flex-col md:justify-around">
          {props?.modules?.map((_module, index) => (
            <div key={index.toString()} className="flex items-center">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-primary">
                0{Number(index) + 1}
              </div>
              <div className="ml-3 font-medium">{t(`modules.module${index + 1}`)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <AieduButton link={props?.button?.link} text={props?.button?.text} />
      </div>
    </AieduLayoutSection>
  );
};
// Theme step 22 : export this page
export { AieduHomepageFeatures };
