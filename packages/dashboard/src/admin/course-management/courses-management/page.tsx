import OutlineCourseManagement from "./outline-course-management";

import { DashboardMainPageLayout } from "@oe/ui/common/layout";
import { useTranslations } from "next-intl";

export default function CoursesManagement({
  isOpenEdu,
}: {
  isOpenEdu: boolean;
}) {
  const tDashboard = useTranslations("dashboard.courses");

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard("courseManagement"), disabled: true },
        { label: tDashboard("title") },
      ]}
      dashboard="admin"
      title={tDashboard("title")}
    >
      <OutlineCourseManagement isOpenEdu={isOpenEdu} />
    </DashboardMainPageLayout>
  );
}
