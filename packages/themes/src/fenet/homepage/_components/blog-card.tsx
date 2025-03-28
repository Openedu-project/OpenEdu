import { Image } from '@oe/ui/components/image';
import type { FileType } from '@oe/ui/components/uploader';
import { Card, CardContent, CardHeader } from '@oe/ui/shadcn/card';
import type React from 'react';

interface BlogCardProps {
  banner?: FileType;
  date?: string;
  creator?: string;
  title?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ banner, date, creator, title }) => {
  return (
    <Card className="overflow-hidden rounded-lg bg-transparent p-2 shadow-lg md:p-4">
      <CardHeader className="p-0">
        <Image
          src={banner?.url}
          height={330}
          width={banner?.width ?? 330}
          className="h-[330px] w-full rounded object-cover"
          alt="image"
        />
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="flex justify-between gap-2">
          <p className="text-foreground/60 text-xs">{date}</p>
          <p className="text-foreground/60 text-xs">{creator}</p>
        </div>
        <p className="line-clamp-2 font-bold text-xl md:text-2xl">{title}</p>
      </CardContent>
    </Card>
  );
};

export { BlogCard, type BlogCardProps };
