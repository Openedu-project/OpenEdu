// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import NextImage from 'next/image';
import { cn } from '#utils/cn';

import defaultImage from '@oe/assets/images/defaultimage.png';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import type { ImageProps } from 'next/image';

export interface ExtendedImageProps extends Omit<ImageProps, 'src'> {
  src?: string;
  externalSrc?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '21:9' | 'none';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  backgroundImage?: boolean;
  containerHeight?: number | string;
  align?: 'start' | 'center' | 'end';
  noContainer?: boolean;
}

const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

const getImageUrl = (src?: string) => {
  if (src?.startsWith(`https://${process.env.NEXT_PUBLIC_MEDIA_S3_HOST}`)) {
    return src.replace(process.env.NEXT_PUBLIC_MEDIA_S3_HOST, process.env.NEXT_PUBLIC_MEDIA_CDN_HOST);
  }
  return src;
};

const aspectRatioClasses = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-4/3',
  '16:9': 'aspect-video',
  '21:9': 'aspect-[21/9]',
};

const objectFitClasses = {
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
  'scale-down': 'object-scale-down',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export function Image({
  src,
  aspectRatio,
  objectFit = 'cover',
  rounded = 'none',
  backgroundImage = false,
  priority = false,
  quality = 85,
  placeholder,
  blurDataURL,
  fill = false,
  sizes = DEFAULT_SIZES,
  className,
  containerHeight = 200,
  externalSrc,
  align = 'center',
  noContainer = false,
  ...props
}: ExtendedImageProps) {
  const imageUrl = getImageUrl(src) || defaultImage;

  const imageClasses = cn(
    'w-full h-full transition-opacity duration-300',
    objectFitClasses[objectFit],
    roundedClasses[rounded],
    className
  );

  const containerClasses = cn(
    'relative',
    fill && !containerHeight && 'h-64', // Default height when fill is true and no containerHeight provided
    aspectRatio && aspectRatio !== 'none' && aspectRatioClasses[aspectRatio],
    roundedClasses[rounded],
    !src && 'w-full',
    className
  );

  const containerStyles = {
    ...(containerHeight !== undefined && { height: containerHeight }),
  };

  const commonProps = {
    src: imageUrl,
    alt: props.alt || '',
    quality,
    priority,
    sizes,
    ...(placeholder && { placeholder }),
    ...(blurDataURL && { blurDataURL }),
  };

  return noContainer ? (
    <NextImage {...commonProps} fill className={imageClasses} {...props} />
  ) : (
    <div
      className={cn(
        'flex w-full border-2 border-transparent',
        align === 'center' && 'justify-center',
        align === 'end' && 'justify-end',
        align === 'start' && 'justify-start'
      )}
    >
      {fill || backgroundImage || (aspectRatio && aspectRatio !== 'none') || externalSrc ? (
        <div className={containerClasses} style={containerStyles}>
          {externalSrc ? (
            <img {...props} src={externalSrc} alt={props.alt || 'image'} className={imageClasses} />
          ) : (
            <NextImage {...commonProps} fill className={imageClasses} {...props} />
          )}
        </div>
      ) : (
        <NextImage className={imageClasses} {...commonProps} {...props} />
      )}
    </div>
  );
}
