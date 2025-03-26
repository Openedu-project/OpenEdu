import { cn } from '@oe/ui/utils/cn';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { SectionHeader, type SectionHeaderProps } from '../_components/section-header';
import { ServiceCard, type ServiceCardProps } from '../_components/service-card';

export interface ScholarHomepageServiceProps extends SectionHeaderProps {
  services?: {
    service1: ServiceCardProps;
    service2: ServiceCardProps;
    service3: ServiceCardProps;
    service4: ServiceCardProps;
  };
}

const ScholarHomepageService: SectionComponent<'homepage', 'scholarService'> = ({ props, className }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarService');

  const services = [
    {
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      textButton: t('services.service1.textButton'),
      isHighlighted: !!props?.services?.service1?.isHighlighted,
    },
    {
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      textButton: t('services.service2.textButton'),
      isHighlighted: true,
    },
    {
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      textButton: t('services.service3.textButton'),
      isHighlighted: false,
    },
    {
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      textButton: t('services.service4.textButton'),
      isHighlighted: false,
    },
  ];

  return (
    <div className={cn('bg-accent py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} description={t('description')} />

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index.toString()}
              title={service.title}
              description={service.description}
              textButton={service.textButton}
              isHighlighted={service.isHighlighted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarHomepageService;
