import headerBanner from '@oe/assets/images/header-banner.png';
import { Image } from '@oe/ui';
import { SubTitle, Title } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';
import { StatsCard } from './_components/hero-stats-card';

export interface AcademiaHomepageHeroProps {
  title?: string;
  description?: string;
  // button?: CustomizeButtonProps;
}

const AcademiaHomepageHero: SectionComponent<'homepage', 'hero'> = ({ className }) => {
  const t = useTranslations('themePage.academia.homepage.hero');

  const STATS_DATA = [
    { number: 11000, label: 'Learners', color: '#FD86F5' },
    { number: 1200, label: 'Courses', color: '#FFBD04' },
    { number: 150, label: 'Creators', color: '#53D1D9' },
  ] as const;

  return (
    <div className={cn('flex flex-col items-center gap-4 md:flex-row', className)}>
      <div className="space-y-2">
        <SubTitle>Grow Your Future With Us</SubTitle>
        <Title>{t('title')}</Title>
        <p>{t('description')}</p>
        {/* <Button variant={props?.button?.variant}>{t('button.text')}</Button> */}
        <div className="mt-8 ml-4">
          <div className="flex gap-4">
            {STATS_DATA.map(({ number, label, color }) => (
              <StatsCard key={label} number={number} label={label} color={color} />
            ))}
          </div>
        </div>
      </div>
      <Image src={headerBanner.src} alt="banner" priority height={363} width={359} />
    </div>
  );
};

export { AcademiaHomepageHero };
