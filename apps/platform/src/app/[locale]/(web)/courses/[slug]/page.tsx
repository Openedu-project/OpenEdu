import CourseDetailPage from '@oe/ui/pages/course';

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div>
      <CourseDetailPage slug={slug} />
    </div>
  );
}
