import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { InfoSection, type InfoSectionProps } from '../../_components/info-section';
import { ProjectCard, type ProjectCardProps } from '../_components/project-card';

export interface VbiPartnersShowcaseProps extends InfoSectionProps {
  projects: {
    project1: ProjectCardProps;
    project2: ProjectCardProps;
    project3: ProjectCardProps;
  };
}

const VbiPartnersShowcase: SectionComponent<'partners', 'vbiShowcase'> = ({ props, className }) => {
  const t = useTranslations('themePage.vbi.partners.vbiShowcase');

  const projects = [
    {
      title: t('projects.project1.title'),
      // description: t("projects.project1.description"),
      image: props?.projects?.project1?.image,
      stats: {
        stat1: {
          value: props?.projects?.project1?.stats?.stat1?.value,
          label: t('projects.project1.stats.stat1.label'),
        },
        stat2: {
          value: props?.projects?.project1?.stats?.stat2?.value,
          label: t('projects.project1.stats.stat2.label'),
        },
        stat3: {
          value: props?.projects?.project1?.stats?.stat3?.value,
          label: t('projects.project1.stats.stat3.label'),
        },
      },
    },
    {
      title: t('projects.project2.title'),
      // description: t("projects.project2.description"),
      image: props?.projects?.project2?.image,
      stats: {
        stat1: {
          value: props?.projects?.project2?.stats?.stat1?.value,
          label: t('projects.project2.stats.stat1.label'),
        },
        stat2: {
          value: props?.projects?.project2?.stats?.stat2?.value,
          label: t('projects.project2.stats.stat2.label'),
        },
        stat3: {
          value: props?.projects?.project2?.stats?.stat3?.value,
          label: t('projects.project2.stats.stat3.label'),
        },
      },
    },
    {
      title: t('projects.project3.title'),
      // description: t("projects.project3.description"),
      image: props?.projects?.project3?.image,
      stats: {
        stat1: {
          value: props?.projects?.project3?.stats?.stat1?.value,
          label: t('projects.project3.stats.stat1.label'),
        },
        stat2: {
          value: props?.projects?.project3?.stats?.stat2?.value,
          label: t('projects.project3.stats.stat2.label'),
        },
        stat3: {
          value: props?.projects?.project3?.stats?.stat3?.value,
          label: t('projects.project3.stats.stat3.label'),
        },
      },
    },
  ];
  return (
    <div className={cn('container space-y-4 bg-background py-8 md:space-y-8 md:py-12 lg:py-16', className)}>
      <InfoSection
        title={t('title')}
        titleSub={t('titleSub')}
        className="flex flex-col items-center justify-center text-center"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {projects.map((p, index) => (
          <ProjectCard
            key={index.toString()}
            title={p?.title}
            // description={p?.description}
            image={p?.image}
            stats={p?.stats}
          />
        ))}
      </div>
    </div>
  );
};

export { VbiPartnersShowcase };
