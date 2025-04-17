import { DashboardHeaderCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui';
import { useTranslations } from 'next-intl';
import FeaturedBlog from './_components/featured-blog';
import PopularCourses from './_components/popular-courses';

export function FeaturedContentsPage() {
  const t = useTranslations('themeFeaturedContent');

  return (
    <Tabs defaultValue="blog" className="w-full">
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[{ label: 'Cài đặt', disabled: true }, { label: 'Tổng quan' }]}
      >
        <p>{t('title')}</p>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="courses">{t('courses')}</TabsTrigger>
          <TabsTrigger value="blog">{t('blog')}</TabsTrigger>
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
