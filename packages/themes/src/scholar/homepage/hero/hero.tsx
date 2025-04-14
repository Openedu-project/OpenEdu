import type { FileType } from '@oe/ui';
import { Button } from '@oe/ui';
import { Link } from '@oe/ui';
import { Image } from '@oe/ui';
import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { HexagonLayout } from '../_components/hexagon-layout';

export interface ScholarHomepageHeroProps {
  title?: string;
  subTitle?: string;
  bannerMain?: FileType;
  bannerTop?: FileType;
  bannerBottom?: FileType;
  partners?: FileType[];
  button?: {
    text?: string;
    link?: string;
  };
}

const ScholarHomepageHero: SectionComponent<'homepage', 'scholarHero'> = ({ props, className }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarHero');

  return (
    <div className={cn('bg-primary md:h-[calc(100vh-var(--header-height))]', className)}>
      <div className="container h-full space-y-8 py-12 md:flex md:flex-col md:justify-center md:space-y-12">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-12">
          {/* Right Column - Image Grid */}
          <div className="w-full md:order-last lg:p-8">
            <HexagonLayout
              bannerMain={props?.bannerMain}
              bannerTop={props?.bannerTop}
              bannerBottom={props?.bannerBottom}
            />
          </div>

          <div className="w-full space-y-6 text-background md:w-[80%] lg:w-full">
            <h1 className="font-bold text-xl leading-tight md:text-2xl lg:text-3xl">{t('title')}</h1>
            <p className="text-background/80 text-md md:text-lg">{t('subTitle')}</p>
            <Link
              href={props?.button?.link ? props?.button?.link : '#'}
              className="w-full border-none p-0 hover:bg-transparent hover:no-underline md:w-fit"
            >
              <Button className="w-full" variant="outline">
                {t('button.text')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Logo Section */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3 md:gap-x-8 md:gap-y-4 lg:grid-cols-6">
          {props?.partners?.map((file: FileType, index: number) => (
            <Image
              key={index?.toString()}
              src={file?.url}
              height={file.height}
              width={file.width}
              alt=""
              className="h-[60px] w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ScholarHomepageHero };
