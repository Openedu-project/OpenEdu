import CategoryBlogPage from '@oe/ui/pages/blog/category';

export default async function CategoryBlog({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <CategoryBlogPage id={id.split('%20')[0] ?? ''} name={id.split('%20').slice(1).join(' ')} />;
}
