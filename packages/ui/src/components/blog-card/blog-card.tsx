import type { IBlog } from "@oe/api/types/blog";
import { formatDateHourMinute } from "@oe/core/utils/datetime";
import { BLOG_ROUTES } from "@oe/core/utils/routes";
import { buildUrl } from "@oe/core/utils/url";
import { formatDistanceToNow } from "date-fns";
import type { HTMLAttributes } from "react";
import { Link } from "#common/navigation";
import { Image } from "#components/image";
import { ProfileCard } from "#components/profile-card";
import { Card, CardContent } from "#shadcn/card";
import { cn } from "#utils/cn";

export interface IBlogCardProps extends HTMLAttributes<HTMLDivElement> {
  blog: IBlog;
  contentRight?: boolean;
  authorOnTop?: boolean;
  authorDesc?: string;
  showDescription?: boolean;
  showAuthor?: boolean;
}

export function BlogCardServer({
  blog,
  contentRight = false,
  className,
  authorOnTop = false,
  authorDesc,
  showDescription = true,
  showAuthor = true,
  ...props
}: IBlogCardProps) {
  const currentHostname = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME;
  const targetPath = buildUrl({
    endpoint:
      blog.blog_type === "org"
        ? BLOG_ROUTES.blogDetail
        : BLOG_ROUTES.personBlogDetail,
    params: {
      slug: blog?.slug,
      username: blog?.author?.username,
    },
  });

  // const locale = currentPathname ? getLocaleFromPathname(currentPathname) : '';
  const locale = blog?.locale ?? "";
  const isExternalDomain = blog?.org?.domain !== currentHostname;
  const blogUrl =
    isExternalDomain
      ? `https://${blog?.org?.domain}/${locale}${targetPath}`
      : targetPath;

  // const authorUrl = buildUrl({
  //   endpoint: BLOG_ROUTES.authorBlog,
  //   params: { username: blog?.author?.username },
  // });

  // const authorFullUrl = (isExternalDomain && blog?.org?.domain)
  //   ? `https://${blog?.org?.domain}/${locale}${authorUrl}`
  //   : authorUrl;

  return (
    <Link
      href={blogUrl}
      external={isExternalDomain}
      target={isExternalDomain ? "_blank" : undefined}
      className="h-full w-full p-0 hover:no-underline"
    >
      <Card
        className={cn(
          "w-full cursor-pointer bg-background hover:border hover:border-primary",
          className
        )}
        {...props}
      >
        <CardContent
          className={cn(
            "!p-3 flex basis-full flex-col gap-3",
            contentRight && "grid-cols-2 md:grid"
          )}
        >
          {authorOnTop && (
            <div
              className={cn(
                "mb-2 flex items-center justify-between gap-1",
                contentRight && "md:col-span-2"
              )}
            >
              {/* <Link
                href={authorFullUrl}
                target={isExternalDomain ? "_blank" : undefined}
              >
                <ProfileCard
                  className="cursor-pointer border-none p-[2px] shadow-none hover:bg-primary/10"
                  profileData={blog?.author}
                  desc={authorDesc}
                />
              </Link> */}
              <ProfileCard
                className="cursor-pointer border-none p-[2px] shadow-none hover:bg-primary/10"
                profileData={blog?.author}
                desc={authorDesc}
              />

              <p className="mcaption-regular9 text-right text-foreground">
                {Date.now() - Number(blog?.update_at) < 60 * 60 * 24 * 1000
                  ? formatDistanceToNow(blog?.update_at)
                  : formatDateHourMinute(blog?.update_at)}
              </p>
            </div>
          )}

          <Image
            src={blog?.banner?.url}
            alt={blog?.title ?? "blog-thumbnail"}
            className="w-full flex-0 rounded"
            fill
            aspectRatio="16:9"
            containerHeight="auto"
            sizes="(max-width: 768px) 280px, 380px"
          />
          <div>
            {!authorOnTop && (
              <p className="mcaption-regular9 mb-2 text-foreground">
                {Date.now() - Number(blog?.update_at) < 60 * 60 * 24 * 1000
                  ? formatDistanceToNow(blog?.update_at)
                  : formatDateHourMinute(blog?.update_at)}
              </p>
            )}
            <p className="giant-iheading-semibold16 mb-2 line-clamp-2 h-[42px] text-foreground">
              {blog?.title}
            </p>
            {/* {showAuthor && !authorOnTop && blog?.author && (
              <Link
                href={authorFullUrl}
                target={isExternalDomain ? "_blank" : undefined}
              >
                <ProfileCard
                  className="!shadow-none !p-[2px] mb-2 cursor-pointer border-none hover:bg-primary/10"
                  profileData={blog?.author}
                />
              </Link>
            )} */}
            {showAuthor && !authorOnTop && blog?.author && (
              <ProfileCard
                className="!shadow-none !p-[2px] mb-2 cursor-pointer border-none hover:bg-primary/10"
                profileData={blog?.author}
              />
            )}
            {showDescription && (
              <p
                className={cn(
                  "mcaption-regular12 line-clamp-4 w-full text-foreground"
                )}
              >
                {blog?.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
