import BlogDetailsPage from '@oe/ui/pages/blog/details';

export default async function PersonalBlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  return <BlogDetailsPage slug={slug} type="personal" />;
}
