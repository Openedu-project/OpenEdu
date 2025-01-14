import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../_types/theme-page';
import { StatCard, type StatCardProps } from '../_components/stat-card';

export interface VbiHomepageHeroProps {
  title?: string;
  titleSub?: string;
  button?: {
    text?: string;
    link?: string;
  };
  banner: {
    image?: FileType;
    bannerContent1: StatCardProps;
    bannerContent2: StatCardProps;
    bannerContent3: StatCardProps;
  };
  partners?: FileType[];
}

const VbiHomepageHero: SectionComponent<'homepage', 'vbiHero'> = ({ props, className }) => {
  const t = useTranslations('themePage.vbi.homepage.vbiHero');

  return (
    <div className={cn('relative min-h-[80vh]', className)}>
      {/* Content container */}
      <div className="container relative mx-auto p-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6 text-foreground">
            <h1 className="font-bold text-5xl leading-tight">{t('title')}</h1>
            <p className="text-foreground/80 text-lg">{t('titleSub')}</p>

            <Button>
              <Link
                href={props?.button?.link ? t('button.link') : '#'}
                className="bg-inherit text-primary-foreground hover:no-underline"
              >
                {t('button.text')}
              </Link>
            </Button>
          </div>
          {/* Column - Stats */}
          <div className="relative h-[60vh] lg:h-full">
            {/* Stats layout */}
            <div className="relative z-10 flex h-full flex-col items-end space-y-32">
              {/* Top stat */}
              <StatCard
                value={props?.banner?.bannerContent1?.value}
                label={t('banner.bannerContent1.label')}
                className="lg:-translate-x-1/2 absolute top-1 left-1/3 rounded-lg border-[1px] border-primary bg-background p-2 text-start md:p-4 lg:top-0 lg:left-0 "
              />

              {/* Middle stat */}
              <StatCard
                value={props?.banner?.bannerContent2?.value}
                label={t('banner.bannerContent2.label')}
                className="-translate-x-1/4 absolute left-1/2 rounded-lg border-[1px] border-primary bg-background p-2 text-start md:p-4"
              />

              {/* Bottom stat */}
              <StatCard
                value={props?.banner?.bannerContent3?.value}
                label={t('banner.bannerContent3.label')}
                className="-translate-y-1/3 absolute bottom-0 left-1/3 rounded-lg border-[1px] border-[1px] border-primary bg-background p-2 text-start md:p-4 lg:left-0 lg:translate-x-1/2"
              />
            </div>

            <div className="-z-2 absolute inset-0 bg-transparent">
              <div className="-translate-y-1/2 absolute top-1/2 h-3/4 w-2/3 rounded-lg border-8 border-primary">
                <Image alt="banner" src={props?.banner?.image?.url} noContainer className="rounded-sm object-cover" />
              </div>

              <div
                className="-z-10 absolute inset-y-0 right-0 w-1/2 bg-primary"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  right: 0,
                }}
              />
            </div>
          </div>
        </div>
        {/* Partners */}
        <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-2 md:grid-cols-5 md:gap-x-8 md:gap-y-4">
          {props?.partners?.map((file, index) => (
            <Image
              key={index.toString()}
              src={file.url}
              height={file.height}
              width={file.width}
              alt=""
              className="h-[40px] object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VbiHomepageHero;
