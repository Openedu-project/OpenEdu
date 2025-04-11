'use client';

import type { IBlogMyProfile } from '@oe/api';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { type HTMLAttributes, useCallback, useState } from 'react';
import { Card, CardContent } from '#shadcn/card';
import { Checkbox } from '#shadcn/checkbox';

import BlogImage from '@oe/assets/images/blog.png';
import { BLOG_ROUTES } from '@oe/core';
import { formatDateHourMinute } from '@oe/core';
import { buildUrl } from '@oe/core';
import { getLocaleFromPathname } from '@oe/i18n';
import { formatDistanceToNow } from 'date-fns';
import { Image } from '#components/image';
import { ProfileCard } from '#components/profile-card';
import { cn } from '#utils/cn';
import { useShowProfileItemsStore } from '../_store/userProfileStore';

interface IBlogCardProps extends HTMLAttributes<HTMLDivElement> {
  blog: IBlogMyProfile;
  contentRight?: boolean;
  authorOnTop?: boolean;
  showAuthorDesc?: boolean;
  isShowDescription?: boolean;
  isShowAuthor?: boolean;
  isSetting?: boolean;
}

export function BlogCardProfile({
  blog,
  contentRight = false,
  className,
  authorOnTop = false,
  showAuthorDesc = false,
  isShowDescription = true,
  isShowAuthor = true,
  isSetting = false,
  ...props
}: IBlogCardProps) {
  const router = useRouter();
  const [isShow, setIsShow] = useState<boolean>(blog?.is_show);

  const { addItem, removeItem, showItemList } = useShowProfileItemsStore();

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      if (blog?.org?.domain && blog?.org?.domain !== window.location.hostname) {
        const locale = getLocaleFromPathname(window?.location?.pathname);
        const url = buildUrl({
          endpoint: `https://${blog?.org?.domain}/${locale}/${BLOG_ROUTES.blogDetail}`,
          params: { slug: blog?.slug },
          queryParams: { type: blog?.blog_type },
        });
        window.open(url, '_blank');
      } else {
        const url = buildUrl({
          endpoint: BLOG_ROUTES.blogDetail,
          params: { slug: blog?.slug },
          queryParams: { type: blog?.blog_type },
        });
        router.push(url);
      }
    }
  };

  const handleClickProfile = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        if (blog?.org?.domain && blog?.org?.domain !== window.location.hostname) {
          const url = buildUrl({
            endpoint: `https://${blog?.org?.domain}/${BLOG_ROUTES.authorBlog}`,
            params: { username: blog?.author?.username },
          });
          window.open(url, '_blank');
        } else {
          const url = buildUrl({
            endpoint: BLOG_ROUTES.authorBlog,
            params: { username: blog?.author?.username },
          });
          router.push(url);
        }
      }
    },
    [router, blog]
  );

  const handleShowBlog = () => {
    if (isShow) {
      removeItem(blog.cuid);
      setIsShow(false);
    } else if (showItemList.length < 8) {
      addItem(blog);
      setIsShow(true);
    }
  };

  return (
    <Card
      className={cn(
        '!shadow-xl flex w-full min-w-[234px] cursor-pointer flex-col gap-4 border-[3px] border-transparent bg-background p-3 sm:min-w-[284px]',
        isShow && 'border-primary border-solid',
        !isSetting && 'hover:border-primary hover:border-solid',
        className
      )}
      onClick={isSetting ? handleShowBlog : handleClick}
      {...props}
    >
      {isSetting && <Checkbox checked={isShow} />}
      <CardContent className={cn('flex basis-full flex-col gap-3 p-0', contentRight && 'grid-cols-2 md:grid')}>
        {authorOnTop && (
          <div className="mb-2 flex items-center justify-between">
            <ProfileCard
              className="!shadow-none !p-[2px] cursor-pointer border-none hover:bg-primary/10"
              profileData={blog?.author}
              handleClick={handleClickProfile}
            />

            <p className="mcaption-regular9 text-foreground">
              {Date.now() - Number(blog?.update_at) < 60 * 60 * 24 * 1000
                ? formatDistanceToNow(new Date(blog?.update_at ?? 0), {
                    addSuffix: false,
                  })
                : formatDateHourMinute(blog?.update_at)}
            </p>
          </div>
        )}
        <div className={cn('relative min-h-[195px] w-full flex-0', contentRight && 'md:min-h-[130px]')}>
          <Image
            src={blog?.banner?.url ?? BlogImage.src}
            alt={blog?.title}
            className="w-full rounded-2"
            fill
            containerHeight={195}
            sizes="(max-width: 768px) 280px, 380px"
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex basis-full flex-col justify-between">
          <div>
            {!authorOnTop && (
              <p className="mcaption-regular9 mb-2 text-foreground">
                {Date.now() - Number(blog?.update_at) < 60 * 60 * 24 * 1000
                  ? formatDistanceToNow(new Date(blog?.update_at ?? 0), {
                      addSuffix: false,
                    })
                  : formatDateHourMinute(blog?.update_at)}
              </p>
            )}
            <p className="giant-iheading-semibold16 mb-4 line-clamp-2 h-[40px] text-foreground">{blog?.title}</p>
            {isShowAuthor && !authorOnTop && (
              <ProfileCard
                className="!shadow-none !p-[2px] mb-4 cursor-pointer border-none hover:bg-primary/10"
                profileData={blog?.author}
                handleClick={handleClickProfile}
              />
            )}
            {isShowDescription && (
              <p
                className={cn(
                  'mcaption-regular12 line-clamp-2 text-foreground',
                  contentRight && 'min-h-[100px] md:line-clamp-[8]'
                )}
              >
                {blog?.description}
              </p>
            )}
          </div>
          {/* <CardFooter className="flex justify-between items-center !px-0 !py-3 flex-wrap">
            <div className="flex space-x-2 items-center p-2">
              <Eye />
              <span className="mcaption-regular12 text-foreground">{abbreviateNumber(blog?.time_read ?? 0)}</span>
            </div>
            <Button variant="ghost" className="!p-2 gap-1 h-auto">
              <Message width={20} height={20} />
              <span className="mcaption-regular12 text-foreground">{abbreviateNumber(blog?.cmt_count ?? 0)}</span>
            </Button>
            <Button variant="ghost" className="!p-2 gap-1 h-auto">
              <LikeOutline />
              <span className="mcaption-regular12 text-foreground">{abbreviateNumber(blog?.like_count ?? 0)}</span>
            </Button>
            <Button variant="ghost" size="icon" className="!p-2 gap-1 h-auto">
              <BookMark width={20} height={20} />
            </Button>
          </CardFooter> */}
        </div>
      </CardContent>
    </Card>
  );
}
