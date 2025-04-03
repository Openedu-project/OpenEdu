import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Card, CardContent, CardFooter } from '@oe/ui/shadcn/card';

interface CustomerProps {
  description?: string;
  tag?: string;
  image?: FileType;
}

const CustomerCard = ({ description, tag, image }: CustomerProps) => {
  return (
    <Card className="mx-auto h-full max-w-[320px] overflow-hidden border-none bg-card p-2 shadow-xs transition-shadow duration-300 hover:shadow-md md:mx-0 md:w-full md:max-w-none md:p-4">
      <Image
        src={image?.url}
        height={image?.height ?? 300}
        width={image?.width ?? 320}
        alt="avatar"
        className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
      />
      <CardContent className="p-3 sm:p-4">
        <p className="line-clamp-3 text-foreground">{description}</p>
      </CardContent>
      <CardFooter className="!pt-0 p-3 sm:p-4">
        <p className="text-foreground/80 text-xs">{tag}</p>
      </CardFooter>
    </Card>
  );
};
CustomerCard.displayName = 'CustomerCard';

export { CustomerCard, type CustomerProps };
