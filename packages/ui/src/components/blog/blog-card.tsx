'use client';

import type { IBlog } from '@oe/api/types/blog';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { BLOG_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { getLocaleFromPathname } from '@oe/i18n/utils';
import { useRouter } from '@oe/ui/common/navigation';
import { formatDistanceToNow } from 'date-fns';
import type React from 'react';
import { type HTMLAttributes, useCallback } from 'react';
import { Image } from '#components/image';
import { ProfileCard } from '#components/profile-card';
import { Card, CardContent } from '#shadcn/card';
import { cn } from '#utils/cn';

export interface IBlogCardProps extends HTMLAttributes<HTMLDivElement> {
  blog: IBlog;
  contentRight?: boolean;
  authorOnTop?: boolean;
  authorDesc?: string;
  showDescription?: boolean;
  showAuthor?: boolean;
}

export function BlogCard({
  blog,
  contentRight = false,
  className,
  authorOnTop = false,
  authorDesc,
  showDescription = true,
  showAuthor = true,
  ...props
}: IBlogCardProps) {
  const router = useRouter();

  const handleClick = () => {
    const targetPath = generateRoute(blog.blog_type === 'org' ? BLOG_ROUTES.blogDetail : BLOG_ROUTES.personBlogDetail, {
      slug: blog?.slug,
      username: blog?.author?.username,
    });

    if (typeof window !== 'undefined') {
      if (blog?.org?.domain !== window?.location?.hostname) {
        const locale = getLocaleFromPathname(window?.location?.pathname);
        window.open(`https://${blog?.org?.domain}/${locale}${targetPath}`, '_blank');
      } else {
        router.push(targetPath);
      }
    }
  };

  const handleClickProfile = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        if (blog?.org?.domain !== window.location.hostname) {
          const locale = getLocaleFromPathname(window?.location?.pathname);

          window.open(
            `https://${blog?.org?.domain}/${locale}${generateRoute(BLOG_ROUTES.authorBlog, { username: blog?.author?.username })}`,
            '_blank'
          );
        } else {
          router.push(generateRoute(BLOG_ROUTES.authorBlog, { username: blog?.author?.username }));
        }
      }
    },
    [router, blog]
  );

  return (
    <Card
      className={cn('w-full cursor-pointer bg-background hover:border hover:border-primary', className)}
      onClick={handleClick}
      {...props}
    >
      <CardContent className={cn('!p-3 flex basis-full flex-col gap-3', contentRight && 'grid-cols-2 md:grid')}>
        {authorOnTop && (
          <div className={cn('mb-2 flex items-center justify-between', contentRight && 'md:col-span-2')}>
            <ProfileCard
              className="cursor-pointer border-none p-[2px] shadow-none hover:bg-primary/10"
              profileData={blog?.author}
              desc={authorDesc}
              handleClick={handleClickProfile}
            />

            <p className="mcaption-regular9 text-foreground">
              {Date.now() - Number(blog?.update_at) < 60 * 60 * 24 * 1000
                ? formatDistanceToNow(blog?.update_at)
                : formatDateHourMinute(blog?.update_at)}
            </p>
          </div>
        )}

        <Image
          src={blog?.banner?.url}
          alt={blog?.title}
          className="w-full flex-0 rounded"
          fill
          aspectRatio="16:9"
          containerHeight="auto"
          sizes="(max-width: 768px) 280px, 380px"
          quality={100}
        />
        <div className="flex basis-full flex-col justify-between">
          <div>
            {!authorOnTop && (
              <p className="mcaption-regular9 mb-2 text-foreground">
                {Date.now() - Number(blog?.update_at) < 60 * 60 * 24 * 1000
                  ? formatDistanceToNow(blog?.update_at)
                  : formatDateHourMinute(blog?.update_at)}
              </p>
            )}
            <p className="giant-iheading-semibold16 mb-2 line-clamp-2 h-[42px] text-foreground">{blog?.title}</p>
            {showAuthor && !authorOnTop && (
              <ProfileCard
                className="!shadow-none !p-[2px] mb-2 cursor-pointer border-none hover:bg-primary/10"
                profileData={blog?.author}
                handleClick={handleClickProfile}
              />
            )}
            {showDescription && (
              <p className={cn('mcaption-regular12 line-clamp-4 text-foreground')}>{blog?.description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
