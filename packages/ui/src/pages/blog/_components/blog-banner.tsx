import TreeStar from '@oe/assets/icons/tree-star';
import BannerBg from '@oe/assets/images/blog-banner-bg.png';
import Banner from '@oe/assets/images/blog-banner.png';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

export function BlogBanner({ className }: { className?: string }) {
  const t = useTranslations('blogBanner');

  return (
    <div className={cn('relative grid grid-cols-1 items-end p-4 md:grid-cols-2 md:px-16', className)}>
      <Image
        src={BannerBg.src}
        alt="blog-banner-background"
        priority
        fill
        containerHeight="auto"
        sizes="(max-width: 768px) 100vw, 70vw"
        className="z-[-1] h-full w-full rounded-3xl"
        noContainer
      />
      <div className="flex flex-col items-start gap-4 p-4 lg:p-10 xl:p-16">
        <div className="flex items-center gap-2">
          <TreeStar />
          <p className="giant-iheading-semibold24 text-primary">{t('subTitle')}</p>
        </div>
        <h3 className="giant-iheading-bold24 lg:giant-iheading-bold32 mb-0">{t('title')}</h3>
        <p className="mcaption-regular14">{t('desc')}</p>
        <Link href={BLOG_ROUTES.createBlog} variant="default">
          {t('createYourBlog')}
        </Link>
      </div>
      <div className="-mb-4 hidden md:block lg:pl-8 xl:pl-32">
        <Image
          src={Banner.src}
          alt="blog-banner"
          priority
          aspectRatio="1:1"
          fill
          containerHeight="auto"
          sizes="(max-width: 768px) 50vw, 30vw"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
