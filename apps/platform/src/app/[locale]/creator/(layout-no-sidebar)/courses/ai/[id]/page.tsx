import AICreationPage from '@oe/dashboard/creator/courses/ai-course/page';

export default async function AICreationDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <AICreationPage id={id} />;
}
