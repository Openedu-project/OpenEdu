import CategoryBlogPage from '@oe/ui/pages/blog/category';

export default async function CategoryBlog({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { t?: string };
}) {
  const [{ id }, { t }] = await Promise.all([params, searchParams]);

  return <CategoryBlogPage id={id} name={t} />;
}
