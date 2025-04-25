import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Title } from '../../_components/title';

import { Sparkle } from 'lucide-react';
import { ExpertCard } from '../../_components/expert-card';
import { AieduLayoutSection } from '../../_components/layout-section';

const AieduIntroductionExpert: SectionComponent<'introduction', 'aieduExpert'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.introduction.aieduExpert');

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-4">
          <Sparkle className="text-primary" />
          <h3 className="text-primary">{t('teacher')}</h3>
          <Sparkle className="text-primary" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {props?.teachers?.filter(Boolean)?.map((value, index) => (
            <ExpertCard key={value?.name ?? index} name={value?.name} role={value?.role} image={value?.image} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-4">
          <Sparkle className="text-primary" />
          <h3 className="text-primary">{t('mentor')}</h3>
          <Sparkle className="text-primary" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {props?.mentors?.filter(Boolean)?.map((value, index) => (
            <ExpertCard key={value?.name ?? index} name={value?.name} role={value?.role} image={value?.image} />
          ))}
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduIntroductionExpert };
