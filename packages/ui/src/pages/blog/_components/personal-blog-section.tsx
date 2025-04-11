'use client';

import type { IBlog } from '@oe/api';
import type { IUserProfile } from '@oe/api';
import { getUserBlog } from '@oe/api';
import { BLOG_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';
import { PAGE_SIZE } from '@oe/core';
import { abbreviateNumber } from '@oe/core';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from '#common/navigation';
import { ProfileCard } from '#components/profile-card';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { Skeleton } from '#shadcn/skeleton';
import { BlogCard } from './blog-card';
import { NoBlogData } from './no-blog-data';

export const TopAuthor = ({ topAuthor }: { topAuthor: IUserProfile[] }) => {
  const router = useRouter();
  const t = useTranslations('authorProfileCard');

  const handleClickTopAuthor = (username?: string) => {
    router.push(buildUrl({ endpoint: BLOG_ROUTES.authorBlog, params: { username } }));
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4 pb-4">
        {topAuthor?.map(profile => (
          <ProfileCard
            className="bg-secondary-foreground"
            key={profile.id}
            profileData={profile}
            align
            avatarSize={120}
            desc={
              (profile.followers ?? 0 > 1)
                ? `${t.rich('numberFollowers', {
                    number: abbreviateNumber(profile.followers),
                  })}`
                : `${t.rich('numberFollower', {
                    number: abbreviateNumber(profile.followers ?? 0),
                  })}`
            }
            handleClick={() => handleClickTopAuthor(profile.username)}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export function PersonalBlogSection({
  id,
  name,
  className,
  topAuthor = [],
  initData = [],
  totalPages,
}: {
  id: string;
  name: string;
  className?: string;
  topAuthor?: IUserProfile[];
  initData?: IBlog[];
  totalPages: number;
}) {
  const [blogData, setBlogData] = useState<IBlog[]>(initData);
  const [nextPage, setNextPage] = useState(2);
  const tPersonalBlogs = useTranslations('personalBlogSection');

  const loadMoreBlog = async () => {
    const data = await getUserBlog({
      type: 'personal',
      id,
      page: nextPage,
      noCache: true,
    });
    if (data instanceof Error) {
      return;
    }

    setBlogData(prev => [...prev, ...(data?.results ?? [])]);
    setNextPage(prev => prev + 1);
  };

  return (
    <div className={className}>
      <h2 className="giant-iheading-semibold20 mb-6 border-primary border-l-[2px] pl-1 text-primary uppercase">
        {tPersonalBlogs.rich('userArticles', { name: name })}
      </h2>
      {
        <div className="flex flex-col gap-4">
          {blogData.length > 0 ? (
            <InfiniteScroll
              className="flex flex-col items-center justify-center gap-4"
              dataLength={PAGE_SIZE}
              next={loadMoreBlog}
              hasMore={nextPage <= totalPages}
              loader={Array.from({ length: 5 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Skeleton key={`loading-card-${i}`} className="h-[300px] w-full rounded-xl" />
              ))}
            >
              {blogData.map((blog, index) => {
                if (index === 5 && topAuthor.length > 0) {
                  return (
                    <Fragment key={blog.id}>
                      <TopAuthor topAuthor={topAuthor} />
                      <BlogCard blog={blog} contentRight />
                    </Fragment>
                  );
                }
                return <BlogCard key={blog.id} blog={blog} contentRight />;
              })}
              {blogData.length < 5 && topAuthor.length > 0 && <TopAuthor topAuthor={topAuthor} />}
            </InfiniteScroll>
          ) : (
            <NoBlogData className="h-full w-full" message={tPersonalBlogs('noPersonalBlog')} />
          )}
        </div>
      }
    </div>
  );
}
