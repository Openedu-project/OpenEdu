'use client';

import type { IBlog } from '@oe/api/types/blog';
import { useRouter } from '@oe/ui/common/navigation';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetUserBlog } from '@oe/api/hooks/useBlog';
import type { IUserProfile } from '@oe/api/types/user-profile';
import WhaleNoData from '@oe/assets/images/whale-no-data.png';
import { PAGE_SIZE } from '@oe/core/utils/constants';
import { abbreviateNumber } from '@oe/core/utils/helpers';
import { BLOG_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { ProfileCard } from '#components/profile-card';
import { ScrollArea, ScrollBar } from '#shadcn/scroll-area';
import { Skeleton } from '#shadcn/skeleton';
import { Image } from '../image';
import { BlogCard } from './blog-card';

export const TopAuthor = ({ topAuthor }: { topAuthor: IUserProfile[] }) => {
  const router = useRouter();
  const t = useTranslations('authorProfileCard');

  const handleClickTopAuthor = (username?: string) => {
    router.push(generateRoute(BLOG_ROUTES.authorBlog, { username }));
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
                ? `${t.rich('numberFollowers', { number: abbreviateNumber(profile.followers) })}`
                : `${t.rich('numberFollower', { number: abbreviateNumber(profile.followers ?? 0) })}`
            }
            handleClick={() => handleClickTopAuthor(profile.username)}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default function PersonalBlogSection({
  id,
  name,
  className,
  topAuthor = [],
}: { id: string; name: string; className?: string; topAuthor?: IUserProfile[] }) {
  const [blogData, setBlogData] = useState<IBlog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tPersonalBlogs = useTranslations('personalBlogSection');
  const personalKey = useRef(Date.now());

  const { data: personBlogs, isLoading: personBlogLoading } = useGetUserBlog(
    'personal',
    id,
    {
      page: currentPage,
      per_page: PAGE_SIZE,
      sort: 'update_at desc',
    },
    personalKey
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (personBlogs) {
      if (currentPage === 1) {
        setBlogData(personBlogs.results);
      } else {
        setBlogData([...blogData, ...personBlogs.results]);
      }
    }
  }, [personBlogs]);

  return (
    <div className={className}>
      <h2 className="giant-iheading-semibold20 mb-6 border-primary border-l-[2px] pl-1 text-primary uppercase">
        {tPersonalBlogs.rich('userArticles', { name: name })}
      </h2>
      {personBlogLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={`personal_blog_${i}`} className="h-[300px] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {blogData.length > 0 ? (
            <InfiniteScroll
              className="flex flex-col items-center justify-center gap-4"
              dataLength={PAGE_SIZE}
              next={() => {
                setCurrentPage(prev => prev + 1);
              }}
              hasMore={currentPage < (personBlogs?.pagination.total_pages ?? 1)}
              loader={<Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            >
              {blogData.map((blog, index) => {
                if (index === 0 && topAuthor.length === 0) {
                  return (
                    <Fragment key={blog.id}>
                      <TopAuthor topAuthor={topAuthor} />
                      <BlogCard blog={blog} contentRight />
                    </Fragment>
                  );
                }
                return <BlogCard key={blog.id} blog={blog} contentRight />;
              })}
              {blogData.length < 3 && topAuthor.length > 0 && <TopAuthor topAuthor={topAuthor} />}
            </InfiniteScroll>
          ) : (
            <div className="h-full w-full">
              <Image
                src={WhaleNoData.src}
                alt="no-data"
                priority
                aspectRatio="1:1"
                quality={100}
                fill
                containerHeight={300}
                sizes="(max-width: 768px) 100vw, 70vw"
              />
              <p className="mcaption-regular16 lg:mcaption-regular20 w-full p-6 text-center">
                {tPersonalBlogs('noPersonalBlog')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
