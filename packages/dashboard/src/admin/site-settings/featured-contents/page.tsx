import { DashboardHeaderCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui';
import FeaturedBlog from './_components/featured-blog';
import PopularCourses from './_components/popular-courses';

export function FeaturedContentsPage() {
  return (
    <Tabs defaultValue="courses" className="w-full">
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[{ label: 'Cài đặt', disabled: true }, { label: 'Tổng quan' }]}
      >
        <p>Featured Contents</p>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
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
