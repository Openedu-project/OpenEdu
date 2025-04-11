import { CoursePreviewDetail } from "@oe/ui";

export default async function CourseDetailPreviePage({
  params,
}: {
  params: Promise<{ orgId: string; courseId: string }>;
}) {
  const { orgId, courseId } = await params;

  return (
    <div>
      <CoursePreviewDetail orgId={orgId} courseId={courseId} />
    </div>
  );
}
