import { type ExtendedImageProps, Image } from '#components/image';

export default function FormImage(props: ExtendedImageProps) {
  return <Image {...props} className="w-full" />;
}
