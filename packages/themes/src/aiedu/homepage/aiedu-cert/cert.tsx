import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Check } from 'lucide-react';
import { AieduButton, type AieduButtonProps } from '../../_components/button';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

export interface AieduHomepageCertProps extends TitleProps {
  coursePanel?: {
    title?: string;
    requirements?: string[];
  };
  button?: AieduButtonProps;
  image?: FileType;
}

const AieduHomepageCert: SectionComponent<'homepage', 'aieduCert'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduCert');

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />
      <div className="space-y-4 lg:flex lg:h-[400px] lg:gap-4 lg:space-y-0">
        <div className="h-full flex-1 rounded-xl bg-primary p-8 text-background">
          <h2 className="mb-8 text-center font-bold text-xl lg:text-3xl">{t('coursePanel.title')}</h2>

          <div className="mb-10 space-y-6">
            {props?.coursePanel?.requirements?.map((_requirement, index) => (
              <div key={index.toString()} className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-secondary p-2 text-forground">
                  <Check className="h-4 w-4 text-foreground" />
                </div>
                <p className="text-md lg:text-xl">{t(`coursePanel.requirements.requirement${index + 1}`)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <AieduButton text={t('button.text')} link={props?.button?.link} variant="outline" />
          </div>
        </div>
        <div className="lg:flex lg:basis-1/2 lg:items-center">
          <Image
            alt="banner"
            src={props?.image?.url}
            width={props?.image?.width ?? 574}
            height={props?.image?.height ?? 400}
            className="h-full w-full rounded-lg border-2 border-primary object-cover lg:h-[400px]"
          />
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageCert };
