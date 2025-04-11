import { Image } from '@oe/ui';

import type { FileType } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { AchievementStat, type AchievementStatProps } from '../_components/achievement-stat';
import { SectionHeader, type SectionHeaderProps } from '../_components/section-header';

export interface ScholarHomepageAchievementsProps extends SectionHeaderProps {
  image?: FileType;
  achievements: {
    stat1: AchievementStatProps;
    stat2: AchievementStatProps;
    stat3: AchievementStatProps;
    stat4: AchievementStatProps;
  };
}

const ScholarHomepageAchievements: SectionComponent<'homepage', 'scholarAchievements'> = ({ className, props }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarAchievements');

  return (
    <div className={cn('bg-primary py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} description={t('description')} variant="secondary" />
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <Image
            src={props?.image?.url}
            height={props?.image?.height ?? 500}
            width={props?.image?.width ?? 300}
            alt="achievement"
            className="rounded-lg"
          />
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            {props?.achievements &&
              Object.entries(props.achievements).map(([key, value], index) => (
                <AchievementStat
                  key={key}
                  percentage={value.percentage}
                  variant={index % 3 ? 'primary' : 'secondary'}
                  description={value.description}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ScholarHomepageAchievements };
