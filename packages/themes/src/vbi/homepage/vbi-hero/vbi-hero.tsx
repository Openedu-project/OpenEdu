import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import type { SectionComponent } from '../../../_types/theme-page';
import { StatCard, type StatCardProps } from '../../_components/stat-card';

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

const VbiHomepageHero: SectionComponent<'homepage', 'vbiHero'> = ({ props, className, t }) => {
  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Content container */}
      <div className="container relative mx-auto px-4 md:px-8 md:pr-0 lg:px-12 lg:pr-0">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Content */}
          <div className="flex-auto space-y-6 text-foreground lg:flex-1">
            <h1 className="font-bold text-5xl leading-tight">{t?.('title')}</h1>
            <p className="text-foreground/80 text-lg">{t?.('titleSub')}</p>

            <Button>
              <Link
                href={props?.button?.link ? (t?.('button.link') ?? '#') : '#'}
                className="bg-inherit text-primary-foreground hover:no-underline"
              >
                {t?.('button.text')}
              </Link>
            </Button>
          </div>
          {/* Column - Stats */}
          <div className="relative order-first h-[80vh] w-full flex-auto lg:order-last lg:flex-1">
            {/* Stats layout */}
            <div className="relative z-10 flex h-full w-full flex-col items-end">
              {/* Top stat */}
              <StatCard
                value={props?.banner?.bannerContent1?.value}
                label={t?.('banner.bannerContent1.label')}
                className="lg:-translate-x-1/2 -translate-y-1/2 absolute top-[20%] left-0 w-fit flex-none translate-x-1/2 rounded-lg border-[1px] border-primary bg-background p-2 p-2 text-start md:p-4 lg:flex-1"
              />

              {/* Middle stat */}
              <StatCard
                value={props?.banner?.bannerContent2?.value}
                label={t?.('banner.bannerContent2.label')}
                className="absolute top-[40%] right-1/3 w-fit translate-x-1/2 rounded-lg border-[1px] border-primary bg-background p-2 text-start md:p-4"
              />

              {/* Bottom stat */}
              <StatCard
                value={props?.banner?.bannerContent3?.value}
                label={t?.('banner.bannerContent3.label')}
                className="-translate-x-1/2 absolute bottom-[20%] left-1/2 w-fit translate-y-1/2 rounded-lg border-[1px] border-primary bg-background p-2 text-start md:p-4"
              />
            </div>

            <div className="-z-2 absolute inset-0 bg-transparent">
              <div className="-translate-y-1/2 absolute top-1/2 h-3/5 w-2/3 rounded-lg border-8 border-primary">
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
