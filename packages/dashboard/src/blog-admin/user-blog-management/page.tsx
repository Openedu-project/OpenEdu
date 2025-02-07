import { getTranslations } from 'next-intl/server';
import BlogTable from '../_components/blog-table';

export default async function UserBlogManagement() {
  const tBlogs = await getTranslations('blogManagement');
  return (
    <>
      <div className="mb-6 flex justify-between gap-10 rounded-b-2xl border bg-background p-4">
        <h2 className="giant-iheading-semibold32 tracking-tight md:text-3xl">{tBlogs('userBlogManagement')}</h2>
      </div>
      <BlogTable type="personal" className="bg-background" />
    </>
  );
}
