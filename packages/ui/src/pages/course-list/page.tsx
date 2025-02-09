import { getCoursesPublishService } from "@oe/api/services/course";
import { getOrgByDomainService } from "@oe/api/services/organizations";
import { getCookie } from "@oe/core/utils/cookie";
import CourseList from "./_components/course-list";

export default async function CoursesListPage({
  isOpenEdu = true,
}: {
  isOpenEdu?: boolean;
}) {
  const domain =
    (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? "";
  const orgData = await getOrgByDomainService(undefined, { domain });

  const courses = await getCoursesPublishService(undefined, {
    params: {
      enable_root: isOpenEdu,
      org_id: isOpenEdu ? undefined : orgData?.id,
      page: 1,
      per_page: 12,
      sort: "create_at desc",
      preloads: ["Categories", "Owner", "Levels"],
    },
  });

  return (
    <CourseList
      isOpenEdu={isOpenEdu}
      orgId={isOpenEdu ? undefined : orgData?.id}
      fallback={courses}
    />
  );
}
