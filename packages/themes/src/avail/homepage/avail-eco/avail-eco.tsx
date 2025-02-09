import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';

import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import type { SectionComponent } from '../../../_types/theme-page';
export interface AvailHomepageEcoProps {
  title?: string;
  section1: {
    title?: string;
    partners?: FileType[];
  };
  section2: {
    title?: string;
    partners?: FileType[];
  };
}

const AvailHomepageEco: SectionComponent<'homepage', 'availEco'> = ({ className, props }) => {
  const t = useTranslations('themePage.avail.homepage.availEco');

  return (
    <div className={cn('space-y-4 bg-accent-foreground p-4 md:space-y-8 md:p-8 lg:p-12', className)}>
      <h2 className="text-center font-bold text-background text-xl uppercase leading-tight lg:text-3xl">
        {t('title')}
      </h2>
      <div className="relative rounded-3xl bg-white p-9">
        <div className="-top-3 -translate-x-1/2 absolute left-1/2 text-nowrap rounded-full bg-primary px-9 py-1 font-semibold text-primary-foreground">
          {t('section1.title')}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-10">
          {props?.section1?.partners?.map((img, index) => (
            <div className="h-[33px] w-[120px]" key={index.toString()}>
              <Image alt="image" src={img?.url} height={33} width={120} className="h-[33px] object-contain" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative rounded-3xl bg-white p-9">
        <div className="-top-3 -translate-x-1/2 absolute left-1/2 text-nowrap rounded-full bg-primary px-9 py-1 font-semibold text-primary-foreground">
          {t('section2.title')}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-10">
          {props?.section2?.partners?.map((img, index) => (
            <div className="h-[33px] w-[120px]" key={index.toString()}>
              <Image alt="image" src={img?.url} height={33} width={120} className="h-[33px] object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailHomepageEco;
