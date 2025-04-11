import type { FileType } from '@oe/ui';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';

export interface AcademiaHomepagePartnersProps {
  title?: string;
  partners?: FileType[];
}

const AcademiaHomepagePartners: SectionComponent<'homepage', 'partners'> = ({ className, props }) => {
  const t = useTranslations('themePage.academia.homepage.partners');

  return (
    <div className={cn('space-y-8 py-8', className)}>
      <h2 className="giant-iheading-bold24 md:giant-iheading-bold44 text-center text-primary">{t('title')}</h2>

      <div className="grid grid-cols-3 gap-x-4 gap-y-2 md:grid-cols-5 md:gap-x-8 md:gap-y-4">
        {props?.partners?.map(
          (file: FileType) =>
            file?.url && (
              <Image
                key={file.url.toString()}
                src={file.url}
                height={file.height}
                width={file.width}
                alt=""
                className="h-[40px] object-contain"
              />
            )
        )}
      </div>
    </div>
  );
};

export { AcademiaHomepagePartners };
