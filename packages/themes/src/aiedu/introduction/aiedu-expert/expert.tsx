import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Title, type TitleProps } from '../../_components/title';

import { ExpertCard, type ExpertProps } from '../../_components/expert-card';
import { AieduLayoutSection } from '../../_components/layout-section';

export interface AieduIntroductionExpertProps extends TitleProps {
  expert1: ExpertProps;
  expert2: ExpertProps;
  expert3: ExpertProps;
}

const AieduIntroductionExpert: SectionComponent<'introduction', 'aieduExpert'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.introduction.aieduExpert');
  const experts = [props?.expert1, props?.expert2, props?.expert3];

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} description={t('description')} className="text-center" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {experts?.filter(Boolean)?.map((value, index) => (
          <ExpertCard
            key={value?.name ?? index}
            name={value?.name}
            role={value?.role}
            image={value?.image}
            socialLinks={value?.socialLinks}
          />
        ))}
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionExpert };
