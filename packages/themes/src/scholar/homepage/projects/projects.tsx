import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';

import { Image } from '@oe/ui/components/image';

import type { FileType } from '@oe/ui/components/uploader';
import { SectionHeader, type SectionHeaderProps } from '../_components/section-header';

export interface ScholarHomepageProjectsProps extends SectionHeaderProps {
  button: {
    text?: string;
    link?: string;
  };
  banner1?: FileType;
  banner2?: FileType;
  banner3?: FileType;
  banner4?: FileType;
}

const ScholarHomepageProjects: SectionComponent<'homepage', 'scholarProjects'> = ({ className, props }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarProjects');

  const banners = [props?.banner1, props?.banner2, props?.banner3, props?.banner4];
  return (
    <div className={cn('bg-background py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8 md:flex md:gap-8">
        <div className="space-y-4 md:order-last">
          <SectionHeader
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            variant="primary"
            centered={false}
          />
          <Button>
            <Link
              href={props?.button?.link ? props?.button?.link : '#'}
              className="!text-primary-foreground bg-inherit hover:bg-transparent hover:no-underline"
            >
              {t('button.text')}
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2 gap-4 md:order-first md:grid-cols-2">
          {banners?.filter(Boolean)?.map((b, index) => (
            <Image
              key={b?.url ?? index}
              alt="image"
              src={b?.url}
              height={b?.height ?? 300}
              width={b?.width ?? 300}
              className="h-full w-full rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarHomepageProjects;
