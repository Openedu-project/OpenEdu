import Banner from '@oe/assets/images/blog-banner.png';
import { BLOG_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Image } from '#components/image';

export function BlogBanner() {
  const t = useTranslations('blogBanner');

  return (
    <div className="container grid grid-cols-1 items-center md:grid-cols-2">
      <div className="relative">
        <Image
          src={Banner.src}
          alt="blog-banner"
          priority
          aspectRatio="16:9"
          fill
          containerHeight="auto"
          sizes="(max-width: 768px) 100vw, 70vw"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-col items-start gap-4 p-4 lg:p-12">
        <h3 className="giant-iheading-bold24 lg:giant-iheading-bold40 mb-0 text-primary">{t('title')}</h3>
        <p className="mcaption-regular14">{t('desc')}</p>
        <Link href={BLOG_ROUTES.createBlog} variant="default">
          {t('writeYourBlog')}
        </Link>
      </div>
    </div>
  );
}
