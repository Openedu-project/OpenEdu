// "use client";

import type { ICourse } from '@oe/api/types/course/course';
import { Image } from '@oe/ui/components/image';
import { Badge } from '@oe/ui/shadcn/badge';
import { cn } from '@oe/ui/utils/cn';

interface CourseThumbnailProps {
  courseData: ICourse;
}

export function CourseThumbnail({ courseData }: CourseThumbnailProps) {
  const categories = courseData?.categories ?? [];
  const remainingCount = Math.max(0, categories.length - 2);
  const shouldShowRemainingBadge = remainingCount > 0;
  const visibleCategories = categories.slice(0, 2);

  return (
    <div className="relative w-full shrink-0 rounded-sm bg-background/50">
      <Image
        src={
          courseData?.thumbnail?.url && courseData?.thumbnail?.mime?.includes('image')
            ? courseData?.thumbnail?.url
            : undefined
        }
        alt={courseData?.name}
        className="w-full flex-0 rounded"
        fill
        aspectRatio="16:9"
        containerHeight="auto"
        sizes="(max-width: 768px) 280px, 380px"
        quality={100}
        priority
      />

      <div className="absolute bottom-2 left-2 z-30 inline-flex w-full gap-1 group-hover:hidden">
        {visibleCategories.map(tag => (
          <Badge key={tag.id} className={cn('w-fit max-w-[35%] truncate')}>
            <span className="truncate">{tag.name}</span>
          </Badge>
        ))}

        {shouldShowRemainingBadge && (
          <Badge className={cn('w-fit max-w-[30%] md:max-w-[20%]')}>
            <span className="truncate">+{remainingCount}</span>
          </Badge>
        )}
      </div>
    </div>
  );
}
