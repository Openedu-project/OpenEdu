import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

export interface FenetHomepageHeroProps extends SectionTitleProps {
  partners?: FileType[];
  banner?: FileType;
  button?: {
    text?: string;
    link?: string;
  };
}

const FenetHomepageHero: SectionComponent<'homepage', 'fenetHero'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetHero');

  return (
    <div
      className={cn(
        'space-y-8 bg-background md:flex md:h-[calc(100vh-var(--header-height))] md:flex-col md:justify-between',
        className
      )}
    >
      <div className="container flex h-full flex-col items-center justify-center gap-4 py-12 md:flex-row md:justify-between md:gap-16">
        <div className="w-full space-y-8">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} centered={false} />
          <Button className="w-full sm:w-fit">
            <Link
              href={props?.button?.link ? props?.button?.link : '#'}
              className="!text-primary-foreground w-full bg-inherit hover:bg-transparent hover:no-underline"
            >
              {t('button.text')}
            </Link>
          </Button>
        </div>
        <Image
          alt="banner"
          height={props?.banner?.height ?? 500}
          width={props?.banner?.width ?? 500}
          src={props?.banner?.url}
          className="w-full"
        />

        {/* Logo Section */}
      </div>
      <div className="bg-primary">
        <div className="container space-y-8 py-12">
          <p className="text-center font-bold text-muted">{t('partnerTitle')}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {props?.partners?.map((file: FileType, index: number) => (
              <div
                key={index?.toString()}
                className="flex h-[60px] w-[56px] items-center justify-center rounded-lg bg-card p-2 hover:bg-card/80 md:h-[72px] md:w-[128px]"
              >
                <Image
                  src={file?.url}
                  height={file?.height ?? 48}
                  width={file?.width ?? 56}
                  alt=""
                  className="h-[48px] w-full rounded-md object-contain md:h-[56px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FenetHomepageHero;
