import { cn } from '@oe/ui/utils/cn';
import type { SectionComponent } from '../../../_types/theme-page';

import { getTranslations } from 'next-intl/server';
import { BlogGridServer } from '../../_components/blog-grid-server';
import { InfoSection, type InfoSectionProps } from '../../_components/info-section';

export interface VbiHomepageBlogsServerProps extends InfoSectionProps {}

const VbiHomepageBlogsServer: SectionComponent<'homepage', 'vbiBlogs'> = async ({ className }) => {
  const t = await getTranslations('themePage.vbi.homepage.vbiBlogs');

  return (
    <div className={cn('container space-y-4 bg-background p-4 md:space-y-8 md:p-8 lg:p-12', className)}>
      <InfoSection
        title={t('title')}
        titleSub={t('titleSub')}
        button={{ text: t('button.text'), link: t('button.link') }}
        className="flex flex-col items-center justify-center text-center"
      />
      <BlogGridServer />
    </div>
  );
};

export default VbiHomepageBlogsServer;
