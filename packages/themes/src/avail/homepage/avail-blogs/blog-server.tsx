import type { IBlog } from '@oe/api/types/blog';
import type { IFeaturedContent } from '@oe/api/types/featured-contents';
import { BlogCardServer } from '@oe/ui/components/blog-card';
import { cn } from '@oe/ui/utils/cn';
import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { InfoSection } from '../../../vbi/_components/info-section';
import { getPopularBlogs } from '../_actions/blog';

const AvailHomepageBlogsServer: SectionComponent<'homepage', 'availBlogs'> = async ({ className, props }) => {
  const [t, dataPopularBlogs] = await Promise.all([
    getTranslations('themePage.avail.homepage.availBlogs'),
    getPopularBlogs(),
  ]);

  return (
    <div className={cn('space-y-4 bg-accent p-4 md:space-y-8 md:p-8 lg:min-h-[80vh] lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={undefined}
        button={{ text: t?.('button.text'), link: props?.button?.link }}
        className="flex flex-col items-center text-center"
      />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
        {dataPopularBlogs?.map(
          (course: IFeaturedContent<IBlog>) =>
            course?.entity && <BlogCardServer key={course?.entity?.id} blog={course?.entity as IBlog} />
        )}
      </div>
    </div>
  );
};

export default AvailHomepageBlogsServer;
