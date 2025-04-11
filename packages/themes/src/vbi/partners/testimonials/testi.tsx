import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { InfoSection, type InfoSectionProps } from '../../_components/info-section';
import { TestimonialCard, type TestimonialCardProps } from '../_components/testi-card';

export interface VbiPartnersTestiProps extends InfoSectionProps {
  partners: {
    partner1: TestimonialCardProps;
    partner2: TestimonialCardProps;
  };
}

const VbiPartnersTesti: SectionComponent<'partners', 'vbiTesti'> = ({ props, className }) => {
  const t = useTranslations('themePage.vbi.partners.vbiTesti');

  return (
    <div className="bg-muted">
      <div className={cn('container space-y-4 py-8 md:space-y-8 md:p-12 lg:p-16', className)}>
        <InfoSection
          title={t('title')}
          titleSub={t('titleSub')}
          button={{ text: t('button.text'), link: props?.button?.link }}
          className="flex flex-col items-center justify-center text-center"
        />
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
          <TestimonialCard
            key="dark"
            content={t('partners.partner1.content')}
            authorName={t('partners.partner1.authorName')}
            authorRole={t('partners.partner1.authorRole')}
            logo={props?.partners?.partner1?.logo}
            author={props?.partners?.partner1?.author}
            variant="dark"
            className="basis-1/2"
          />
          <TestimonialCard
            key="light"
            content={t('partners.partner2.content')}
            authorName={t('partners.partner2.authorName')}
            authorRole={t('partners.partner2.authorRole')}
            logo={props?.partners?.partner2?.logo}
            author={props?.partners?.partner2?.author}
            variant="light"
            className="basis-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export { VbiPartnersTesti };
