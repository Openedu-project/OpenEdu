import { BLOG_ROUTES, buildUrl, formatDate } from '@oe/core';
import { Link } from '@oe/ui';
import { Image } from '@oe/ui';
import { getPopularBlogs } from '../_actions/blogs';
const BlogGridServer = async () => {
  const blogsData = await getPopularBlogs();

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8">
      {/* Featured Post */}
      {blogsData?.featuredPost && (
        <div className="rounded-3xl bg-white p-4 shadow-[0px_4px_30px_0px_rgba(175,175,175,0.20)] md:p-6">
          <Link
            href={buildUrl({
              endpoint: BLOG_ROUTES.blogDetail,
              params: { slug: blogsData?.featuredPost?.id },
            })}
            className="flex h-full flex-col items-start justify-start gap-6 whitespace-break-spaces p-0 text-black no-underline hover:no-underline"
          >
            <div className="w-full overflow-hidden rounded-3xl">
              <Image
                src={blogsData?.featuredPost?.banner?.url}
                alt={blogsData?.featuredPost?.title ?? 'title'}
                width={600}
                height={350}
                className="h-[270px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="mcaption-regular14">{formatDate(blogsData?.featuredPost?.create_at ?? 0)}</div>

              <h3 className="giant-iheading-semibold20 md:giant-iheading-semibold24 hover:text-primary">
                {blogsData?.featuredPost?.title}
              </h3>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full">
                  <Image
                    src={blogsData?.featuredPost?.author?.avatar}
                    alt={blogsData?.featuredPost?.author?.display_name ?? ''}
                    width={24}
                    height={24}
                    className="h-[28px] w-[28px] rounded-full"
                  />
                </div>
                <span className="mbutton-semibold16">{blogsData?.featuredPost?.author?.display_name}</span>
              </div>

              <div
                className="mcaption-regular14 line-clamp-5"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{
                  __html: blogsData?.featuredPost?.content ?? '',
                }}
              />
            </div>
          </Link>
        </div>
      )}

      {/* Other Posts */}
      <div className="space-y-8 lg:w-full">
        {blogsData?.restPost?.map(post => (
          <div key={post?.id} className="group rounded-3xl bg-white shadow-[0px_4px_30px_0px_rgba(175,175,175,0.20)] ">
            <Link
              href={buildUrl({
                endpoint: BLOG_ROUTES.blogDetail,
                params: { slug: post?.id },
              })}
              className="flex h-auto flex-col items-start gap-6 whitespace-break-spaces text-black no-underline hover:no-underline md:flex-row md:items-center"
            >
              <div className="w-full overflow-hidden rounded-2xl md:w-[260px]">
                <Image
                  src={post?.banner?.url}
                  alt={post?.title}
                  width={260}
                  height={152}
                  className="h-[152px] object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mcaption-regular14 mb-2">{formatDate(post?.create_at)}</div>
                <h3 className="giant-iheading-semibold20 mb-3 line-clamp-2">{post?.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.display_name}
                      width={24}
                      height={24}
                      className="h-[28px] w-[28px] rounded-full"
                    />
                  </div>
                  <span className="mbutton-semibold16">{post?.author?.display_name}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

BlogGridServer.displayName = 'BlogGridServer';
export { BlogGridServer };
