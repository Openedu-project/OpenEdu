import BlogCreationPage from '@oe/ui/pages/blog/creation';

export default async function CreationPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <BlogCreationPage id={id} action="update" />;
}
