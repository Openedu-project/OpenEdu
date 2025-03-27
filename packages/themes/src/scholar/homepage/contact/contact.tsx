import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';

export interface ScholarHomepageContactProps {
  title?: string;
  description?: string;
  button: {
    text?: string;
    link?: string;
  };
  image?: FileType;
}

const ScholarHomepageContact: SectionComponent<'homepage', 'scholarContact'> = ({ className, props }) => {
  const t = useTranslations('themePage.scholar.homepage.scholarContact');
  return (
    <div className={cn('bg-primary/10 py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8 md:flex md:justify-between md:gap-8">
        <div className="space-y-2 md:w-full md:max-w-[500px] md:space-y-4">
          <h2 className="mb-4 font-bold text-3xl text-foreground text-primary md:text-4xl">{t('title')}</h2>
          <p className="text-md text-primary md:text-lg">{t('description')}</p>
          <Link
            href={props?.button?.link ? props?.button?.link : '#'}
            className="!mt-8 w-full border-none p-0 hover:bg-transparent hover:no-underline md:w-fit"
          >
            <Button className="w-full">{t('button.text')}</Button>
          </Link>
        </div>
        <div className="flex justify-end md:w-full md:max-w-[500px]">
          <Image
            alt="contact"
            src={props?.image?.url}
            height={props?.image?.height ?? 300}
            width={props?.image?.width ?? 300}
            className="h-full w-full rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default ScholarHomepageContact;
