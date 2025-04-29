import { cn } from '@oe/ui';
import { getTranslations } from 'next-intl/server';
import type { SectionComponent } from '../../../_types/theme-page';
import { BlogGridServer } from '../../_components/blog-grid-server';
import { AieduButton } from '../../_components/button';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title } from '../../_components/title';

const AieduHomepageBlogServer: SectionComponent<'homepage', 'aieduBlog'> = async ({ props, className }) => {
  const t = await getTranslations('themePage.aiedu.homepage.aieduBlog');

  return (
    <AieduLayoutSection
      background="bg-gradient-to-b from-primary-foreground to-white"
      className={cn('space-y-6', className)}
    >
      <Title title={t('title')} />
      <BlogGridServer />
      <div className="flex justify-center">
        <AieduButton text={t('button.text')} link={props?.button?.link} />
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageBlogServer };
