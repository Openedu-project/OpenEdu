"use client";
import type { IBlog } from "@oe/api/types/blog";
import { BLOG_ROUTES } from "@oe/core/utils/routes";
import { buildUrl } from "@oe/core/utils/url";
import { useRouter } from "#common/navigation";
import { ProfileCard } from "#components/profile-card";

const ProfileCardWrapper = ({ data }: { data: IBlog }) => {
  const router = useRouter();

  return (
    <ProfileCard
      profileData={data.author}
      className="!shadow-none border-none hover:bg-primary/10"
      handleClick={() => {
        router.push(
          buildUrl({
            endpoint: BLOG_ROUTES.authorBlog,
            params: { username: data.author?.username },
          })
        );
      }}
    />
  );
};
export { ProfileCardWrapper };
