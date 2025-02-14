import CourseRequests from "./_components/course-requests";

import { DashboardMainPageLayout } from "@oe/ui/common/layout";
import { useTranslations } from "next-intl";

export default function CourseRequestManagement() {
  const tDashboard = useTranslations("dashboard.courses");

  return (
    <DashboardMainPageLayout
      breadcrumbs={[
        { label: tDashboard("courseManagement"), disabled: true },
        { label: tDashboard("coursesReviewing") },
      ]}
      dashboard="admin"
      title={tDashboard("coursesReviewing")}
    >
      <CourseRequests />
    </DashboardMainPageLayout>
  );
}
