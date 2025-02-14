import { getCoursesPublishService } from "@oe/api/services/course";
import CourseList from "./_components/course-list";

export default async function CoursesListPage({
  isOpenEdu = true,
}: {
  isOpenEdu?: boolean;
}) {
  const courses = await getCoursesPublishService(undefined, {
    params: {
      enable_root: isOpenEdu,
      page: 1,
      per_page: 12,
      sort: "create_at desc",
      preloads: ["Categories", "Owner", "Levels"],
    },
  });

  return <CourseList isOpenEdu={isOpenEdu} fallback={courses} />;
}
