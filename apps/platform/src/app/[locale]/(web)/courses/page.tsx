import { CoursesListPage } from "@oe/ui";

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <CoursesListPage isOpenEdu searchParams={searchParams} />;
}
