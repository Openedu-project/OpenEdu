import AICreationPage from '@oe/dashboard/creator/courses/ai-course/page';
export default function AICreationDetail({ params }: { params: { id: string } }) {
  return <AICreationPage id={params.id} />;
}
