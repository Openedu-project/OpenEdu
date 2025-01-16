'use client';

import type { ICourse, ICourseResponse } from '@oe/api/types/course/course';
import MedalStar from '@oe/assets/icons/medal-star';
import SendSquare from '@oe/assets/icons/send-square';
import { VideoSquare } from '@oe/assets/icons/video-square';
import { WishlistButton } from '@oe/ui/components/wishlist-button';
import { Button } from '@oe/ui/shadcn/button';
import { Book } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { KeyedMutator } from 'swr';
import { Card } from '#shadcn/card';
import { CourseLinkWrapper } from './course-link-wrapper';

interface CourseHoverContentProps {
  courseData: ICourse;
  mutate?: KeyedMutator<ICourseResponse | undefined>;
}

export function CourseHoverContent({ courseData, mutate }: CourseHoverContentProps) {
  const tDetail = useTranslations('courseCard');

  return (
    <Card className="absolute inset-0 flex cursor-pointer flex-col gap-4 overflow-y-hidden rounded-lg border-2 border-primary bg-background p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
      <CourseLinkWrapper
        slug={courseData?.slug}
        domain={courseData?.org?.domain}
        className="flex flex-col items-start gap-4 whitespace-break-spaces"
      >
        <p className="giant-iheading-semibold20 line-clamp-2 whitespace-break-spaces text-primary">
          {courseData?.name}
        </p>

        {courseData?.mark_as_completed && (
          <div className="flex w-full items-center gap-2">
            <div className="grid h-6 w-6 items-center justify-center rounded-full bg-success">
              <SendSquare className="h-4 w-4" />
            </div>
            <span className="mcaption-semibold14 md:mcaption-semibold16 text-success">
              {tDetail('contentCompleted')}
            </span>
          </div>
        )}

        {courseData?.description && (
          <div
            className="mcaption-regular14 rich-text !m-0 !min-h-0 line-clamp-3 w-full whitespace-break-spaces text-foreground"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: courseData?.description,
            }}
          />
        )}

        <CourseFeatures courseData={courseData} />
      </CourseLinkWrapper>

      <div className="flex items-center justify-between gap-2">
        {/* TODO: payment button */}
        <Button className="w-full">Buy this course</Button>
        <WishlistButton
          entityId={courseData?.cuid}
          bookmarkId={courseData?.bookmark?.id ?? ''}
          isWishlist={courseData?.is_wishlist}
          entityType="course"
          onSuccess={async () => {
            await mutate?.();
          }}
        />
      </div>
    </Card>
  );
}

function CourseFeatures({ courseData }: { courseData: ICourse }) {
  const tDetail = useTranslations('courseCard');

  return (
    <div className="flex w-full flex-grow flex-col gap-3">
      {courseData?.has_certificate && (
        <div className="flex items-center gap-2">
          <MedalStar width={20} height={20} color="hsl(var(--foreground))" />
          <span className="mcaption-regular14 text-foreground">{tDetail('completionCertificate')}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Book width={20} height={20} color="hsl(var(--foreground))" />
        <span className="mcaption-regular14 text-foreground">
          {tDetail('totalSections', {
            total: courseData?.active_section ?? 0,
          })}
          ,
        </span>
        <span className="mcaption-regular14 text-foreground">
          {tDetail('totalLessons', {
            total: courseData?.active_lesson ?? 0,
          })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <VideoSquare width={20} height={20} color="hsl(var(--foreground))" />
        <span className="mcaption-regular14 text-foreground">
          {tDetail('totalVideos', {
            total: courseData?.video_count ?? 0,
          })}
        </span>
      </div>
    </div>
  );
}
