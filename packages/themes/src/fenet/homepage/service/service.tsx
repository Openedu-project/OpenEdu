import { cn } from '@oe/ui/utils/cn';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { ServiceCard, type ServiceCardProps } from '../../../scholar/homepage/_components/service-card';
import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

export interface FenetHomepageServiceProps extends SectionTitleProps {
  service1: ServiceCardProps;
  service2: ServiceCardProps;
  service3: ServiceCardProps;
}

const FenetHomepageService: SectionComponent<'homepage', 'fenetService'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetService');

  const services = [
    {
      title: t('service1.title'),
      description: t('service1.description'),
      textButton: t('service1.textButton'),
      link: props?.service1?.link,
      isHighlighted: false,
    },
    {
      title: t('service2.title'),
      description: t('service2.description'),
      textButton: t('service2.textButton'),
      link: props?.service2?.link,
      isHighlighted: false,
    },
    {
      title: t('service3.title'),
      description: t('service3.description'),
      textButton: t('service3.textButton'),
      link: props?.service3?.link,
      isHighlighted: false,
    },
  ];

  return (
    <div className={cn('bg-accent py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

export default FenetHomepageService;
