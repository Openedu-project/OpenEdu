import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

import { PriceCard, type PriceCardProps } from '../_components/price-card';

export interface FenetHomepagePriceProps extends SectionTitleProps {
  price1: PriceCardProps;
  price2: PriceCardProps;
  price3: PriceCardProps;
}

const FenetHomepagePrice: SectionComponent<'homepage', 'fenetPrice'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetPrice');
  const prices = [props?.price1, props?.price2, props?.price3]?.filter(Boolean);

  return (
    <div className={cn('bg-primary py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} variant="secondary" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {prices?.map((value, index) => (
            <PriceCard
              key={index?.toString()}
              banner={value?.banner}
              price={value?.price}
              features={value?.features}
              buttonText={value?.buttonText}
              link={value?.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { FenetHomepagePrice };
