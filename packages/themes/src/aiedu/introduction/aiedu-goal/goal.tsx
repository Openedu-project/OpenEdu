import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { AieduLayoutSection } from '../../_components/layout-section';

export interface AieduIntroductionGoalProps {
  image?: FileType;
  title?: string;
  subTitle?: string;
  description?: string;
}

const AieduIntroductionGoal: SectionComponent<'introduction', 'aieduGoal'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.introduction.aieduGoal');

  return (
    <AieduLayoutSection className={cn('space-y-8', className)}>
      <div className="flex flex-col justify-center md:basis-1/2 md:px-4">
        <h2 className="mb-2 whitespace-normal text-center font-bold text-[28px] leading-tight md:mb-4 md:whitespace-nowrap lg:text-[40px]">
          {t('title')}
        </h2>
        <p className="mb-3 whitespace-normal text-center font-bold text-[20px] leading-tight md:mb-6 md:mb-6 md:text-[28px] xl:whitespace-nowrap">
          {t('subTitle')}
        </p>
        <p className="mb-6 text-center text-[16px] text-foreground/80 leading-tight md:text-[24px]">
          {t('description')}
        </p>
      </div>
      <Image
        alt="image"
        src={props?.image?.url}
        width={props?.image?.width ?? 1280}
        height={props?.image?.height ?? 520}
        className="h-full w-full rounded-lg object-contain"
        quality={100}
      />
    </AieduLayoutSection>
  );
};

export { AieduIntroductionGoal };
