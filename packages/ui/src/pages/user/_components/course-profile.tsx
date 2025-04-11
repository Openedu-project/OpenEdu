'use client';

import type { ICourseMyProfile } from '@oe/api';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useCallback, useState } from 'react';
import { Card, CardContent } from '#shadcn/card';
import { Checkbox } from '#shadcn/checkbox';
import { HoverCard, HoverCardTrigger } from '#shadcn/hover-card';
import { Separator } from '#shadcn/separator';

import type { IMutateCourse } from '@oe/api';
import courseBanner from '@oe/assets/images/course-detail-banner.png';
import { formatNumber } from '@oe/core';
import { Image } from '#components/image';
import { RatingStars } from '#components/rating-stars';
import { WishlistButton } from '#components/wishlist-button';
import { cn } from '#utils/cn';
import { useShowProfileItemsStore } from '../_store/userProfileStore';

export interface ICourseCard extends React.ComponentProps<typeof Card> {
  courseData: ICourseMyProfile;
  mutate?: IMutateCourse<ICourseMyProfile>;
  isSetting?: boolean;
}

export function CourseProfile({ className, courseData, mutate, isSetting, ...props }: ICourseCard) {
  const router = useRouter();

  const {
    id,
    slug,
    org,
    levels,
    learner_count,
    rating,
    is_pay,
    currency,
    discount_price,
    price,
    thumbnail,
    name,
    partners,
    is_wishlist,
    cuid,
    bookmark,
    is_show,
  } = courseData;

  const [isShow, setIsShow] = useState<boolean>(is_show);

  const { addItem, removeItem, showItemList } = useShowProfileItemsStore();

  const courseLearningUrl = `${org?.domain ? `https://${org?.domain}` : ''}/courses/${slug}`;

  const handleRedirect = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
      e.preventDefault();
      router.push(url);
    },
    [router]
  );

  const handleShowCourse = useCallback(() => {
    if (isShow) {
      removeItem(cuid);
      setIsShow(false);
    } else if (showItemList.length < 8) {
      addItem(courseData);
      setIsShow(true);
    }
  }, [isShow, showItemList, addItem, removeItem, courseData, cuid]);

  function CourseContent() {
    return (
      <>
        <div className="mcaption-regular12 flex justify-between gap-2 text-[#999999]">
          <span>
            {levels?.[0]?.name ?? 'Unknown level'} &#x2022; {learner_count ?? 0}
            &nbsp;
            {(learner_count ?? 0) > 1 ? 'learners' : 'learner'}
          </span>
          <div>
            <RatingStars rating={rating ?? 0} />
          </div>
        </div>
        <div className="relative flex w-full items-center justify-between">
          <div className="flex items-center gap-[10px]">
            {is_pay ? (
              <>
                <p className="mcaption-bold16 text-neutral-800">
                  {currency} {formatNumber(discount_price && price)}
                </p>
                {Number(discount_price) > 0 && (
                  <p className="mcaption-regular16 text-[#999999] line-through">
                    {currency}&nbsp;
                    {formatNumber(Number(price ?? 0) + Number(discount_price ?? 0))}
                  </p>
                )}
              </>
            ) : (
              <p className="mcaption-bold16 text-neutral-800">FREE</p>
            )}
          </div>
          <WishlistButton
            bookmarkId={bookmark?.id ?? ''}
            entityId={cuid}
            variant="ghost"
            entityType="course"
            isWishlist={is_wishlist}
            onClick={async () => {
              await mutate?.();
            }}
          />
        </div>
      </>
    );
  }

  function LearningCourseCard() {
    return (
      <Card
        id={id}
        className={cn(
          'group !shadow-xl flex h-full w-full min-w-[234px] cursor-pointer flex-col gap-2 rounded-2 border-[3px] border-transparent p-3 sm:min-w-[284px]',
          !isSetting && 'hover:border-[3px] hover:border-primary hover:shadow-shadow-5',
          isShow && 'border-[2px] border-primary',
          className
        )}
        {...props}
      >
        {isSetting && <Checkbox checked={isShow} />}
        <div className="relative h-[122px] w-full rounded-2 bg-[#ebecfb]">
          <Image
            src={thumbnail?.url ?? courseBanner.src}
            alt={name ?? 'course_banner'}
            className="w-full rounded-2"
            containerHeight={122}
            fill
            sizes="(max-width: 768px) 280px, 380px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <p className="giant-iheading-semibold16 line-clamp-2 h-[41px] text-primary group-hover:text-primary">{name}</p>

        <div className="mcaption-regular12 flex items-center gap-2 text-[#585858]">
          {org && (
            <>
              {org?.thumbnail?.url && (
                <Image
                  src={org.thumbnail?.url}
                  alt={org.name}
                  className="h-[20px] w-[20px] rounded-[50%] bg-[#ebecfb]"
                  width={20}
                  height={20}
                  style={{ objectFit: 'contain' }}
                />
              )}
              <p>{org.name}</p>
              <Separator orientation="vertical" className="h-5 bg-bg-neutral-50" />
            </>
          )}
          <p className="truncate">{partners?.filter(p => p?.roles?.includes('owner'))?.[0]?.username ?? 'Unknown'}</p>
        </div>

        <CardContent className="flex flex-col gap-2 p-0 text-[#585858]">
          <CourseContent />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {isSetting ? (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger className={cn('block w-full sm:max-w-[284px]')} onClick={handleShowCourse}>
            <LearningCourseCard />
          </HoverCardTrigger>
        </HoverCard>
      ) : (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger
            className={cn('block w-full sm:max-w-[284px]')}
            href={courseLearningUrl}
            onClick={e => handleRedirect(e, courseLearningUrl)}
          >
            <LearningCourseCard />
          </HoverCardTrigger>
        </HoverCard>
      )}
    </>
  );
}
