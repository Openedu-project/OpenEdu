import { cn } from '@oe/ui';

import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';

import { SectionTitle, type SectionTitleProps } from '../_components/section-title';

import { BlogCard, type BlogCardProps } from '../_components/blog-card';

export interface FenetHomepageBlogProps extends SectionTitleProps {
  blog1: BlogCardProps;
  blog2: BlogCardProps;
}

const FenetHomepageBlog: SectionComponent<'homepage', 'fenetBlog'> = ({ props, className }) => {
  const t = useTranslations('themePage.fenet.homepage.fenetBlog');
  const blogs = [props?.blog1, props?.blog2]?.filter(Boolean);

  return (
    <div className={cn('bg-accent py-12 md:py-16 lg:py-20', className)}>
      <div className="container space-y-8">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {blogs?.map((value, index) => (
            <BlogCard
              key={index?.toString()}
              banner={value?.banner}
              date={value?.date}
              creator={value?.creator}
              title={value?.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { FenetHomepageBlog };
