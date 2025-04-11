import { MyBlogManagement } from "@oe/ui";
import { useTranslations } from "next-intl";

export default function MyOrgBlogManagement() {
  const tDashboard = useTranslations("dashboard.blog");

  return (
    <MyBlogManagement
      breadcrumbs={[{ label: tDashboard("myBlog") }]}
      type="org"
      AIButton
    />
  );
}
