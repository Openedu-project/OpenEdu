import image from '@oe/assets/images/whale-no-data.png';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

interface NoDataProps {
  className?: string;
  message?: string;
  navigateLink?: string;
  navigateTitle?: string;
}

export default function NoDataAvailable({ className, message, navigateLink, navigateTitle }: NoDataProps) {
  const t = useTranslations('noDataAvailable');

  return (
    <div className={cn('flex h-full flex-col items-center justify-center gap-5 p-5 md:p-10', className)}>
      <div className="w-[280px]">
        <Image src={image.src} alt="" height={280} width={280} />
      </div>
      <p className="giant-iheading-semibold20 text-[#838383]">
        {message && message?.length > 0 ? message : t('nodata')}
      </p>
      {navigateLink && (
        <Link
          href={navigateLink}
          className="mbutton-semibold16 rounded-2 bg-primary p-2 text-primary-foreground hover:opacity-75"
        >
          {navigateTitle ?? t('back')}
        </Link>
      )}
    </div>
  );
}
