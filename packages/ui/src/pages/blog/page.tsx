import { getBlogsPublishService } from '@oe/api';
import { getCategoriesTreeService } from '@oe/api';
import { getOrgByDomainService } from '@oe/api';
// import { BlogBanner } from "./_components/blog-banner";
import { BlogCateCarousel } from './_components/blog-cate-carousel';
import { BlogHeader } from './_components/blog-header';
import { BlogOutstanding } from './_components/blog-outstanding';

const getOtherOrgBlog = async (isOpenEdu?: boolean) => {
  if (!isOpenEdu) {
    return undefined;
  }
  try {
    const orgData = await getOrgByDomainService();
    const orgBlogData = await getBlogsPublishService(undefined, {
      params: {
        page: 1,
        per_page: 10,
        sort: 'update_at desc',
        not_org_id: orgData?.id,
      },
    });
    return orgBlogData?.results;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function BlogDefaultPage({ isOpenEdu }: { isOpenEdu?: boolean }) {
  const [blogsData, categories, orgBlogData] = await Promise.all([
    getBlogsPublishService(undefined, {
      params: {
        page: 1,
        per_page: 14,
        sort: 'update_at desc',
      },
    }),
    getCategoriesTreeService(undefined, {
      queryParams: { active: true, type: 'blog' },
    }),
    getOtherOrgBlog(isOpenEdu),
  ]);

  return (
    <>
      <BlogHeader />
      <div className="container flex w-full flex-col gap-10 p-4 md:gap-20 md:p-8 lg:px-24">
        {(blogsData?.results?.length ?? 0) > 0 && (
          <BlogOutstanding
            className="lg:-mx-16"
            defaultBlogs={blogsData?.results?.slice(0, 4) ?? []}
            scrollBlogs={blogsData?.results?.slice(4, 14) ?? []}
            orgBlogs={orgBlogData}
          />
        )}
        {/* <BlogBanner /> */}
        {categories?.map(cate => (
          <BlogCateCarousel key={cate.id} id={cate.id} name={cate.name} />
        ))}
      </div>
    </>
  );
}
