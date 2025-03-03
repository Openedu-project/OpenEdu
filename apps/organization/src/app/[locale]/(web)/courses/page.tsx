import CoursesListPage from '@oe/ui/pages/course-list';

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <CoursesListPage isOpenEdu={false} searchParams={searchParams} />;
}
