import { getBlogListService } from '@oe/api/services/blog';
import type { IBlog } from '@oe/api/types/blog';
import { formatDate } from '@oe/core/utils/datetime';
import { Link } from '@oe/ui/common/navigation';
import { Image } from '@oe/ui/components/image';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function BlogsSection() {
  const [t, blogsData] = await Promise.all([
    await getTranslations('homePageLayout.blogsSection'),
    getBlogListService(undefined, {
      params: {
        per_page: 4,
        page: 1,
        sort: 'create_at desc',
        is_active: true,
      },
    }),
  ]);

  const featuredPost = blogsData?.results?.[0] as unknown as IBlog;
  const restPost = blogsData?.results?.slice(1) as unknown as IBlog[];

  return (blogsData?.results?.length ?? 0) > 0 ? (
    <section className="container mx-auto px-0 md:px-4">
      {/* Header */}
      <div className="mb-4 text-center lg:mb-10">
        <h2 className="giant-iheading-bold20 md:giant-iheading-bold24 lg:giant-iheading-bold32 mb-4">{t('title')}</h2>
        <p className="mcaption-regular16 lg:mcaption-regular24 mx-auto max-w-[950px]">
          {t('description')}
          <Link
            href="/blog"
            className="mcaption-regular16 lg:mcaption-bold24 inline-flex items-center gap-1 text-primary hover:underline"
          >
            {t('discoverLink.text')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {/* Featured Post */}
        <div className="rounded-2xl bg-white p-4 shadow-[0px_4px_30px_0px_rgba(175,175,175,0.20)] md:p-6">
          <Link
            href={`/blog/${featuredPost?.id}`}
            className="flex h-full flex-col items-start justify-start gap-6 whitespace-break-spaces p-0 text-black no-underline hover:no-underline"
          >
            <div className="h-[152px] w-full overflow-hidden rounded-2xl md:h-[270px]">
              <Image
                src={featuredPost?.banner?.url}
                alt={featuredPost?.title}
                width={600}
                height={270}
                className="h-[152px] w-full object-cover md:h-[270px]"
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="mcaption-regular14">{formatDate(featuredPost?.create_at)}</div>

              <h3 className="giant-iheading-semibold20 md:giant-iheading-semibold24 hover:text-primary">
                {featuredPost?.title}
              </h3>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-2xl">
                  <Image
                    src={featuredPost?.author?.avatar}
                    alt={featuredPost?.author?.display_name}
                    width={24}
                    height={24}
                    className="h-[28px] w-[28px] rounded-2xl"
                  />
                </div>
                <span className="mbutton-semibold16">{featuredPost?.author?.display_name}</span>
              </div>

              <div
                className="mcaption-regular14 line-clamp-5"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{
                  __html: featuredPost?.content,
                }}
              />
            </div>
          </Link>
        </div>

        {/* Other Posts */}
        <div className="space-y-4 lg:w-full lg:space-y-6">
          {restPost.map(post => (
            <div key={post.id} className="group rounded-2xl bg-white shadow-[0px_4px_30px_0px_rgba(175,175,175,0.20)] ">
              <Link
                href={`/blog/${post?.id}`}
                className="flex h-auto flex-col items-start gap-6 whitespace-break-spaces p-4 text-black no-underline hover:no-underline md:flex-row md:items-center"
              >
                <div className="h-[152px] w-full overflow-hidden rounded-2xl md:w-[260px]">
                  <Image
                    src={post?.banner?.url}
                    alt={post?.title}
                    width={260}
                    height={152}
                    priority
                    className="rounded-2xl object-cover"
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
    </section>
  ) : null;
}
