import type React from 'react';

import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardFooter, CardHeader } from '@oe/ui/shadcn/card';
import { CheckIcon } from 'lucide-react';

interface PriceCardProps {
  banner?: FileType;
  price?: string;
  features?: string[];
  tag?: string;
  buttonText?: string;
  link?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ banner, price, features, tag, buttonText, link }) => {
  return (
    <Card className="overflow-hidden rounded-lg bg-card p-2 shadow-lg md:p-4">
      <CardHeader className="p-0">
        <Image
          src={banner?.url}
          height={150}
          width={banner?.width ?? 330}
          className="h-[150px] w-full rounded object-cover"
          alt="image"
        />
      </CardHeader>

      <CardContent className="px-6 pt-6 pb-2">
        <div className="mb-6 text-center">
          <p className="font-bold text-2xl md:text-3xl">{price}</p>
        </div>

        <div className="space-y-2 md:space-y-3">
          {features?.map((feature, index) => (
            <div key={index?.toString()} className="flex items-center text-foreground/60 text-xs md:text-md">
              <CheckIcon className="mr-1.5 h-3 w-3 shrink-0 text-primary/60 sm:mr-2 md:h-4 md:w-4" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-2 flex justify-center">
          <Badge variant="outline">{tag}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Link href={link ?? '#'} className="w-full border-none p-0 hover:bg-transparent hover:no-underline md:w-fit">
          <Button className="w-full" variant="outline">
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export { PriceCard, type PriceCardProps };
