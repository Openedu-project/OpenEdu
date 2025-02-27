import AIGenCourseInfoPage from '@oe/dashboard/creator/courses/ai-course/general-infomation/page';

export default async function AIGeneralCourseInfoPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <AIGenCourseInfoPage id={id} />;
}
