import type { FileType } from '@oe/ui/components/uploader';
import { cn } from '@oe/ui/utils/cn';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';
import { ServiceCard, type ServiceCardProps } from './_components/service-card';

export interface ScholarHomepageServiceProps {
  titleSection?: string;
  titleMain?: string;
  titleSub?: FileType;
  services?: {
    service1: ServiceCardProps;
    service2: ServiceCardProps;
    service3: ServiceCardProps;
    service4: ServiceCardProps;
  };
}

const ScholarServicePage: SectionComponent<'homepage', 'scholarService'> = ({ props, className }) => {
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
    <div className={cn('min-h-screen bg-gray-50 px-4 py-16', className)}>
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-2 font-semibold text-lg text-primary uppercase">{t('titleSection')}</h2>
          <h1 className="mb-4 font-bold text-4xl text-foreground">{t('titleMain')}</h1>
          <p className="mx-auto max-w-2xl text-foreground/80">{t('titleSub')}</p>
        </div>

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

export default ScholarServicePage;
