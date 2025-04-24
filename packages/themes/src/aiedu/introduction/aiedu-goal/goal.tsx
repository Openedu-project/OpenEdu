import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Title, type TitleProps } from '../../_components/title';

import { AieduLayoutSection } from '../../_components/layout-section';

export interface AieduIntroductionGoalProps extends TitleProps {
  image?: FileType;
}

const AieduIntroductionGoal: SectionComponent<'introduction', 'aieduGoal'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.introduction.aieduGoal');

  return (
    <AieduLayoutSection className={cn('space-y-8', className)}>
      <Title title={t('title')} description={t('description')} className="mx-auto max-w-3xl text-center" />
      <Image
        alt="image"
        src={props?.image?.url}
        width={props?.image?.width ?? 1280}
        height={props?.image?.height ?? 520}
        className="h-full w-full rounded-lg object-contain"
      />
    </AieduLayoutSection>
  );
};

export { AieduIntroductionGoal };
