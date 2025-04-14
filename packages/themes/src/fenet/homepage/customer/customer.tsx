import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Link } from '@oe/ui';

import { Button } from '@oe/ui';
import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

import { MoveUpRight } from 'lucide-react';
import { CustomerCard, type CustomerProps } from '../_components/customer-card';

export interface FenetHomepageCustomerProps extends SectionTitleProps {
  customer1: CustomerProps;
  customer2: CustomerProps;
  button?: {
    text?: string;
    link?: string;
  };
}

const FenetHomepageCustomer: SectionComponent<'homepage', 'fenetCustomer'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetCustomer');
  const customers = [props?.customer1, props?.customer2]?.filter(Boolean);

  return (
    <div className={cn('bg-primary py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <div className="md:flex md:items-end md:justify-between">
          <SectionTitle title={t('title')} centered={false} variant="secondary" className="mb-4 md:mb-0" />
          <Link
            href={props?.button?.link ? props?.button?.link : '#'}
            className="w-full border-none p-0 hover:bg-transparent hover:no-underline md:w-fit"
          >
            <Button className="w-full" variant="outline" rightSection={<MoveUpRight className="h-4 w-4" />}>
              {t('button.text')}
            </Button>
          </Link>
        </div>
        <div className="space-y-4 md:flex md:justify-between md:gap-8 md:space-y-0">
          {customers.map((customer, index) => (
            <CustomerCard
              key={index.toString()}
              description={customer?.description}
              tag={customer?.tag}
              image={customer?.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { FenetHomepageCustomer };
