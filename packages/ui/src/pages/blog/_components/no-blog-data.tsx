import WhaleNoData from '@oe/assets/images/whale-no-data.png';
import { Image } from '#components/image';

export function NoBlogData({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div className={className}>
      <Image
        src={WhaleNoData.src}
        alt="no-data"
        priority
        aspectRatio="1:1"
        quality={100}
        fill
        containerHeight={300}
        sizes="(max-width: 768px) 100vw, 70vw"
      />
      {message && <p className="mcaption-regular16 lg:mcaption-regular20 w-full p-6 text-center">{message}</p>}
    </div>
  );
}
