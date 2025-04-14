'use client';
import type { IUserProfile } from '@oe/api';
import { BLOG_ROUTES } from '@oe/core';
import { buildUrl } from '@oe/core';
import { useRouter } from '#common/navigation';
import { ProfileCard } from '#components/profile-card';

export function BlogDetailHeader({ author }: { author: IUserProfile }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <ProfileCard
        profileData={author}
        className="!shadow-none border-none hover:bg-primary/10"
        handleClick={() => {
          router.push(
            buildUrl({
              endpoint: BLOG_ROUTES.authorBlog,
              params: { username: author?.username },
            })
          );
        }}
      />
    </div>
  );
}
