import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { SectionHeader, type SectionHeaderProps } from '../_components/section-header';

import { ExpertCard, type ExpertProps } from '../_components/expert-card';

export interface ScholarHomepageTeamProps extends SectionHeaderProps {
  expert1: ExpertProps;
  expert2: ExpertProps;
  expert3: ExpertProps;
}

const ScholarHomepageTeam: SectionComponent<'homepage', 'scholarTeam'> = ({ className, props }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarTeam');
  const experts = [props?.expert1, props?.expert2, props?.expert3];
  return (
    <div className={cn('bg-background py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} description={t('description')} variant="primary" />
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
      </div>
    </div>
  );
};

export { ScholarHomepageTeam };
