import { type FileType, Image, cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Sparkles } from 'lucide-react';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

export interface AieduHomepageGuideProps extends TitleProps {
  steps?: string[];
  image?: FileType;
}

const AieduHomepageGuide: SectionComponent<'homepage', 'aieduGuide'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduGuide');

  return (
    <AieduLayoutSection className={cn('space-y-6', className)}>
      <Title title={t('title')} className="text-center" />

      <div className="flex flex-col items-center gap-6 md:flex-row">
        {/* Left side - Steps */}
        <div className="w-full space-y-4 md:w-1/2">
          {props?.steps?.map((_step, index) => (
            <div
              key={index.toString()}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-secondary p-4 transition-colors hover:border-primary"
            >
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-primary">
                  0{Number(index) + 1}
                </div>
                <p className="font-medium text-lg">{t(`steps.step${index + 1}`)}</p>
              </div>
              <div className="text-primary">
                <Sparkles />
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Video player */}
        <div className="w-full md:w-1/2">
          <Image
            alt="banner"
            src={props?.image?.url}
            width={props?.image?.width ?? 673}
            height={props?.image?.height ?? 378}
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageGuide };
