import { type ExtendedImageProps, Image } from '#components/image';

export function FormImage(props: ExtendedImageProps) {
  return <Image {...props} className="w-full" />;
}
