import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import type { FileType } from '@oe/ui';
import { Button } from '@oe/ui';
import { Link } from '@oe/ui';
import { Image } from '@oe/ui';
import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

import { MoveUpRight } from 'lucide-react';

export interface FenetHomepageExperienceProps extends SectionTitleProps {
  image?: FileType;
  button?: {
    text?: string;
    link?: string;
  };
}

const FenetHomepageExperience: SectionComponent<'homepage', 'fenetExperience'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetExperience');

  return (
    <div className={cn('bg-accent py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <div className="md:flex md:items-end md:justify-between">
          <SectionTitle title={t('title')} centered={false} className="mb-4 md:mb-0" />
          <Link
            href={props?.button?.link ? props?.button?.link : '#'}
            className="w-full border-none p-0 hover:bg-transparent hover:no-underline md:w-fit"
          >
            <Button className="w-full" rightSection={<MoveUpRight className="h-4 w-4" />}>
              {t('button.text')}
            </Button>
          </Link>
        </div>
        <Image
          alt="image"
          height={props?.image?.height ?? 320}
          width={props?.image?.width ?? 480}
          src={props?.image?.url}
          className="h-full w-full rounded object-contain"
        />
      </div>
    </div>
  );
};

export { FenetHomepageExperience };
