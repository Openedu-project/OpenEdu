'use client';

import type { ICourse, ICourseResponse } from '@oe/api/types/course/course';
import MedalStar from '@oe/assets/icons/medal-star';
import SendSquare from '@oe/assets/icons/send-square';
import { VideoSquare } from '@oe/assets/icons/video-square';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Image } from '@oe/ui/components/image';
import { formatCurrency } from '@oe/ui/components/input-currency';
import { RatingStars } from '@oe/ui/components/rating-stars';
import { WishlistButton } from '@oe/ui/components/wishlist-button';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { Separator } from '@oe/ui/shadcn/separator';
import { cn } from '@oe/ui/utils/cn';
import { Book, Layers, UsersRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';
import type { KeyedMutator } from 'swr';

export interface ICourseCard extends React.ComponentProps<typeof Card> {
  courseData: ICourse;
  mutate?: KeyedMutator<ICourseResponse | undefined>;
  showHover?: boolean;
  showPrice?: boolean;
  showThubnail?: boolean;
  showOwner?: boolean;
  contentClassName?: string;
}

export default function CourseCard({
  courseData,
  className,
  contentClassName = '',
  mutate,
  showHover = true,
  showPrice = true,
  showThubnail = true,
  showOwner = false,
  ...props
}: ICourseCard) {
  const router = useRouter();
  const tDetail = useTranslations('courseCard');

  const handleRedirect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, domain?: string) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      if (domain && domain !== window.location.hostname) {
        window.open(PLATFORM_ROUTES.courseDetail.replace(':slug', courseData?.slug), '_blank');
      } else {
        router.push(PLATFORM_ROUTES.courseDetail.replace(':slug', courseData?.slug));
      }
    }
  };

  return (
    <div role="presentation" className={cn('group relative w-full', className)}>
      <Card
        id={courseData?.id}
        className={cn('mx-auto flex h-full w-full flex-col gap-3 rounded-m p-4 shadow-lg', contentClassName)}
        onClick={e => handleRedirect(e, courseData?.org?.domain)}
        {...props}
      >
        {showThubnail && (
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
            />

            <div className="absolute bottom-2 left-2 z-30 inline-flex w-full gap-2 group-hover:hidden">
              {courseData?.categories?.slice(0, 2).map(tag => (
                <Badge
                  className={cn(courseData?.categories && courseData?.categories?.length > 1 && 'max-w-[45%]')}
                  key={tag.id}
                >
                  <span className="truncate">{tag.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <CardContent className="flex basis-full flex-col gap-3 p-0 text-foreground">
          <p className="giant-iheading-semibold20 line-clamp-2 text-foreground">{courseData?.name}</p>
          <div className="mcaption-semibold14 flex items-center gap-4 text-primary/80">
            {courseData?.org && <p>{courseData?.org?.name}</p>}

            {courseData?.mark_as_completed && (
              <div className="-mr-spacing-sm ml-auto w-12 rounded-l-full bg-bg-positive-600">
                <div className="grid h-6 w-6 items-center justify-center">
                  <SendSquare />
                </div>
              </div>
            )}
          </div>
          <div className="mcaption-regular14 flex justify-between gap-4 text-foreground">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <UsersRound className="h-4 w-4" />
                {courseData?.learner_count ?? 0}
              </div>
              <Separator orientation="vertical" />

              <RatingStars
                variant="number-shorten"
                className="px-0"
                rating={(courseData?.rating ?? 0) === 0 ? 5 : (courseData?.rating ?? 0)}
              />
              <Separator orientation="vertical" />

              {courseData?.levels && (
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span className="mcaption-regular14">{courseData?.levels?.[0]?.name}</span>
                </div>
              )}
            </div>
          </div>
          {showPrice && (
            <div className="relative flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                {courseData?.is_pay ? (
                  <>
                    <p className="mcaption-bold20 text-foreground">
                      {courseData?.currency}
                      {formatCurrency(courseData?.discount_price && courseData?.price)}
                      {courseData?.currency}
                    </p>
                    {Number(courseData?.discount_price) > 0 && (
                      <p className="mcaption-regular16 text-foreground line-through">
                        {courseData?.currency}
                        {formatCurrency(
                          String(Number(courseData?.price ?? 0) + Number(courseData?.discount_price ?? 0))
                        )}
                        {Number(courseData?.price ?? 0) + Number(courseData?.discount_price ?? 0)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mcaption-bold20 text-foreground">{tDetail('free')}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {showHover && (
        <Card
          onClick={e => handleRedirect(e, courseData?.org?.domain)}
          className="absolute inset-0 flex cursor-pointer flex-col gap-4 overflow-y-hidden rounded-lg border-2 border-primary bg-white p-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        >
          <p className="giant-iheading-semibold20 line-clamp-2 text-primary">{courseData?.name}</p>
          {courseData?.mark_as_completed && (
            <div className="flex items-center gap-2">
              <div className="grid h-6 w-6 items-center justify-center rounded-full bg-bg-positive-600">
                <SendSquare />
              </div>
              <span className="mcaption-semibold14 md:mcaption-semibold16 text-bg-positive-600">
                {tDetail('contentCompleted')}
              </span>
            </div>
          )}
          {courseData?.description && (
            <div
              className="mcaption-regular16 tiptap !m-0 !min-h-0 line-clamp-3 text-foreground"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: courseData?.description,
              }}
            />
          )}
          <div className="flex flex-grow flex-col gap-3">
            {courseData?.has_certificate && (
              <div className="flex items-center gap-2">
                <MedalStar width={20} height={20} color="hsl(var(--foreground))" />
                <span className="mcaption-regular16 text-foreground">{tDetail('completionCertificate')}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Book width={20} height={20} color="hsl(var(--foreground))" />
              <span className="mcaption-regular16 text-foreground">
                {tDetail('totalSections', {
                  total: courseData?.active_section ?? 0,
                })}
                ,
              </span>
              <span className="mcaption-regular16 text-foreground">
                {tDetail('totalLessons', {
                  total: courseData?.active_lesson ?? 0,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <VideoSquare width={20} height={20} color="hsl(var(--foreground))" />
              <span className="mcaption-regular16 text-foreground">
                {tDetail('totalVideos', {
                  total: courseData?.video_count ?? 0,
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <PaymentButton
              courseData={courseData}
              variant={'primary'}
              size={'medium'}
              className="w-full grow-1 mbutton-regular16 text-bg-neutral-20 h-fit"
            /> */}
            {/* TODO: add the component paymenButton */}
            <Button>Buy this course</Button>
            <WishlistButton
              entityId={courseData?.cuid}
              bookmarkId={courseData?.bookmark?.id}
              isWishlist={courseData?.is_wishlist}
              entityType="course"
              onClick={async () => {
                await mutate?.();
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
