import type { IBlog } from "@oe/api/types/blog";
import { marked } from "@oe/core/utils/marker";
import { BLOG_ROUTES } from "@oe/core/utils/routes";
import { buildUrl } from "@oe/core/utils/url";
import { Link } from "#common/navigation";
import { Image } from "#components/image";
import { Badge } from "#shadcn/badge";
import { cn } from "#utils/cn";
import { ProfileCardWrapper } from "./profile-card-wrapper";

export function BlogDetails({
  data,
  className,
  preview = false,
}: {
  data: IBlog;
  className?: string;
  preview?: boolean;
}) {
  return (
    <div className={cn("text-foreground", className)}>
      <div className="m-auto w-full p-6 py-10 lg:w-9/12">
        <h2 className="giant-iheading-semibold24 md:giant-iheading-semibold32 text-center">
          {data.title}
        </h2>
        <div className="flex items-center justify-between">
          <ProfileCardWrapper data={data} />
        </div>
      </div>

      <div className="m-auto w-full lg:w-3/4">
        <Image
          alt="blog-thumbnail"
          fill
          className="w-full"
          aspectRatio="16:9"
          objectFit="contain"
          containerHeight="auto"
          src={data?.banner?.url}
        />
        <p className="mcaption-regular12 text-center text-foreground italic">
          {data.image_description}
        </p>
      </div>
      <div className="m-auto mt-6 p-6 lg:mt-10 lg:w-9/12">
        <div
          className="rich-text !m-0 py-6 text-foreground"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: data.is_ai_generated
              ? marked.parse(data.content)
              : data.content,
          }}
        />

        {data.hashtag && data.hashtag.length > 0 && (
          <div className="flex flex-wrap gap-6 border-t py-6">
            {preview
              ? data.hashtag?.map((hashtag) => (
                  <Badge
                    key={hashtag.hash}
                    className="lg:!p-2 min-w-[100px] justify-center"
                  >
                    #{hashtag.name}
                  </Badge>
                ))
              : data.hashtag?.map((hashtag) => (
                  <Link
                    className="hover:no-underline"
                    key={hashtag.hash}
                    href={buildUrl({
                      endpoint: BLOG_ROUTES.blogHashtag,
                      params: { id: `${hashtag.hash} ${hashtag.name}` },
                    })}
                  >
                    <Badge className="lg:!p-2 min-w-[100px] justify-center">
                      #{hashtag.name}
                    </Badge>
                  </Link>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
