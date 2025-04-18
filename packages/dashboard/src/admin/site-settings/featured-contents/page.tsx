import {
  DashboardHeaderCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@oe/ui";
import { useTranslations } from "next-intl";
import FeaturedBlog from "./_components/featured-blog";
import PopularCourses from "./_components/popular-courses";

export function FeaturedContentsPage() {
  const t = useTranslations("themeFeaturedContent");

  return (
    <Tabs defaultValue="courses" className="w-full">
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[
          { label: t("title"), disabled: true },
          { label: t("settings") },
        ]}
      >
        <h4>{t("title")}</h4>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="courses">{t("courses")}</TabsTrigger>
          <TabsTrigger value="blog">{t("blog")}</TabsTrigger>
        </TabsList>
      </DashboardHeaderCard>
      <div className="rounded-sm bg-background p-4">
        <TabsContent value="courses">
          <PopularCourses />
        </TabsContent>
        <TabsContent value="blog">
          <FeaturedBlog />
        </TabsContent>
      </div>
    </Tabs>
  );
}
