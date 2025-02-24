import type { ISourceProps } from '@oe/api/types/conversation';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { Card } from '#shadcn/card';
import { cn } from '#utils/cn';
interface ISourceCardProps extends ISourceProps {
  className?: string;
}

export function SourceCard({ url, title, content, className }: ISourceCardProps) {
  const domain = new URL(url).hostname ?? '';
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <Card className={cn('flex flex-col gap-2 border-0 p-2 shadow-none', className)}>
      <div className="flex items-center gap-1">
        <div>
          <Image
            externalSrc={faviconUrl}
            alt={`${domain}-logo`}
            aspectRatio="1:1"
            fill
            sizes="30px"
            objectFit="contain"
            className="h-6 w-6 rounded-full bg-background"
            containerHeight="auto"
          />
        </div>
        <p className="mcaption-semibold12">{domain}</p>
      </div>
      <Link href={url} className="!p-0 mcaption-semibold14 !m-0 h-auto justify-start whitespace-normal" target="_blank">
        {title}
      </Link>
      <p className="mcaption-regular14 line-clamp-3">{content}</p>
    </Card>
  );
}
