"use client";
import { useGetPopularContentsAtWebsite } from "@oe/api/hooks/useFeaturedContent";
import type { IBlog } from "@oe/api/types/blog";
import { getAPIReferrerAndOriginClient } from "@oe/api/utils/referrer-origin";
import { formatDate } from "@oe/core/utils/datetime";
import { Link } from "@oe/ui/common/navigation";
import { Image } from "@oe/ui/components/image";
const BlogGridClient = () => {
  const { host } = getAPIReferrerAndOriginClient();
  const { dataPopularContents } = useGetPopularContentsAtWebsite<IBlog>({
    params: { org_id: host ?? "", entity_type: "blog" },
  });

  const featuredPost = dataPopularContents?.[0]?.entity;
  const restPost = dataPopularContents?.slice(1, 3)?.map((v) => v?.entity);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
      {/* Featured Post */}
      <div className="rounded-3xl bg-white p-4 shadow-[0px_4px_30px_0px_rgba(175,175,175,0.20)] md:p-6">
        <Link
          href={`/blog/${featuredPost?.id}`}
          className="flex h-full flex-col items-start justify-start gap-6 whitespace-break-spaces p-0 text-black no-underline hover:no-underline"
        >
          <div className="w-full overflow-hidden rounded-3xl">
            <Image
              src={featuredPost?.banner?.url}
              alt={featuredPost?.title ?? ""}
              width={600}
              height={350}
              className="h-[270px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="mcaption-regular14">
              {formatDate(featuredPost?.create_at ?? 0)}
            </div>

            <h3 className="giant-iheading-semibold20 md:giant-iheading-semibold24 hover:text-primary">
              {featuredPost?.title}
            </h3>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full">
                <Image
                  src={featuredPost?.author?.avatar}
                  alt={featuredPost?.author?.display_name ?? ""}
                  width={24}
                  height={24}
                  className="h-[28px] w-[28px] rounded-full"
                />
              </div>
              <span className="mbutton-semibold16">
                {featuredPost?.author?.display_name}
              </span>
            </div>

            <div
              className="mcaption-regular14 line-clamp-5"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{
                __html: featuredPost?.content ?? "",
              }}
            />
          </div>
        </Link>
      </div>

      {/* Other Posts */}
      <div className="space-y-8 lg:w-full">
        {restPost?.map(
          (post) =>
            post && (
              <div
                key={post?.id}
                className="group rounded-3xl bg-white shadow-[0px_4px_30px_0px_rgba(175,175,175,0.20)] "
              >
                <Link
                  href={`/blog/${post?.id}`}
                  className="flex h-auto flex-col items-start gap-6 whitespace-break-spaces text-black no-underline hover:no-underline md:flex-row md:items-center"
                >
                  <div className="w-full overflow-hidden rounded-2xl md:w-[260px]">
                    <Image
                      src={post?.banner?.url}
                      alt={post?.title || ""}
                      width={260}
                      height={152}
                      className="h-[152px] object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mcaption-regular14 mb-2">
                      {formatDate(post?.create_at || 0)}
                    </div>
                    <h3 className="giant-iheading-semibold20 mb-3 line-clamp-2">
                      {post?.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-full">
                        <Image
                          src={post?.author?.avatar}
                          alt={post?.author?.display_name || ""}
                          width={24}
                          height={24}
                          className="h-[28px] w-[28px] rounded-full"
                        />
                      </div>
                      <span className="mbutton-semibold16">
                        {post?.author?.display_name}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
};

BlogGridClient.displayName = "BlogGridClient";
export { BlogGridClient };
