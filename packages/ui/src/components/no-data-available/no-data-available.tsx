import image from '@oe/assets/images/whale-no-data.png';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { cn } from '#utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface NoDataProps {
  className?: string;
  message?: string;
  navigateLink?: string;
  navigateTitle?: string;
  size?: Size;
}

const sizeConfig: Record<Size, { width: number; height: number; containerWidth: string }> = {
  sm: { width: 160, height: 160, containerWidth: 'w-[160px]' },
  md: { width: 200, height: 200, containerWidth: 'w-[200px]' },
  lg: { width: 280, height: 280, containerWidth: 'w-[280px]' },
};

export default function NoDataAvailable({ className, message, navigateLink, navigateTitle, size = 'lg' }: NoDataProps) {
  const t = useTranslations('noDataAvailable');
  const { width, height, containerWidth } = sizeConfig[size];

  return (
    <div className={cn('flex h-full flex-col items-center justify-center gap-5 p-5 md:p-10', className)}>
      <div className={containerWidth}>
        <Image src={image.src} alt="" height={height} width={width} />
      </div>
      <p className="giant-iheading-semibold20 text-foreground/60">
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
