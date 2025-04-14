import type { IBlog } from '@oe/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { cn } from '#utils/cn';
import { TopBlogs } from './top-blog-section';

interface IBlogWithTabProps {
  blogList1: IBlog[];
  blogList2: IBlog[];
  title1: string;
  title2: string;
  className?: string;
}

const BlogTabsTrigger = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <TabsTrigger
    value={value}
    className="mcaption-semibold14 h-auto rounded-full p-2 text-foreground/60 data-[state=active]:bg-background data-[state=active]:text-primary"
  >
    {title}
  </TabsTrigger>
);

const BlogTabsContent = ({
  blogsData,
  value,
}: {
  blogsData: IBlog[];
  value: string;
}) => (
  <TabsContent value={value} className="grow">
    <TopBlogs blogs={blogsData} className="lg:h-full" scrollClassName="p-0 bg-transparent" />
  </TabsContent>
);

export function BlogWithTab({ blogList1, blogList2, title1, title2, className }: IBlogWithTabProps) {
  return (
    <Tabs defaultValue="content1" className={cn('flex flex-col rounded bg-primary/10 p-3', className)}>
      <TabsList className={cn('mb-2 grid w-full grid-cols-2 bg-transparent')}>
        <BlogTabsTrigger title={title1} value="content1" />
        <BlogTabsTrigger title={title2} value="content2" />
      </TabsList>
      <BlogTabsContent value="content1" blogsData={blogList1} />
      <BlogTabsContent value="content2" blogsData={blogList2} />
    </Tabs>
  );
}
