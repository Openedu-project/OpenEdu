import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Sparkle } from 'lucide-react';
import { ExpertCard, type ExpertProps } from '../../_components/expert-card';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';
export interface AieduHomepageExpertProps extends TitleProps {
  teachers?: ExpertProps[];
  mentors?: ExpertProps[];
}

const AieduHomepageExpert: SectionComponent<'homepage', 'aieduExpert'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduExpert');

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
            <ExpertCard
              key={`${value?.name}-${index}-teacher`}
              name={value?.name}
              role={value?.role}
              image={value?.image}
            />
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
            <ExpertCard
              key={`${value?.name}-${index}-mentor`}
              name={value?.name}
              role={value?.role}
              image={value?.image}
            />
          ))}
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageExpert };
