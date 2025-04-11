import { getCourseOutlineService } from "@oe/api";
import { Payment } from "@oe/ui";

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const course = await getCourseOutlineService(undefined, { id: slug });

  return course ? (
    <Payment courseData={course} />
  ) : (
    <p>There's no data available</p>
  );
}
