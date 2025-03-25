import type { FileType } from '@oe/ui/components/uploader';
import { cn } from '@oe/ui/utils/cn';
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
    <div className={cn('bg-primary p-4 md:p-8 lg:p-12', className)}>
      <div className="container mt-4 space-y-12 md:space-y-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} description={t('description')} variant="secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {props?.achievements &&
            Object.entries(props.achievements).map(([key, value], index) => (
              <AchievementStat
                key={key}
                percentage={value.percentage}
                variant={index % 2 ? 'primary' : 'secondary'}
                description={value.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarHomepageAchievements;
