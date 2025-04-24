import { cn } from '@oe/ui';
import { useTranslations } from 'next-intl';
import type { SectionComponent } from '../../../_types/theme-page';
import { BlogGridClient } from '../../_components/blog-grid-client';
import { AieduButton, type AieduButtonProps } from '../../_components/button';
import { AieduLayoutSection } from '../../_components/layout-section';
import { Title, type TitleProps } from '../../_components/title';

export interface AieduHomepageBlogsProps extends TitleProps {
  button?: AieduButtonProps;
}

const AieduHomepageBlogClient: SectionComponent<'homepage', 'aieduBlog'> = ({ props, className }) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduBlog');

  return (
    <AieduLayoutSection
      background="bg-gradient-to-b from-primary-foreground to-white"
      className={cn('space-y-6', className)}
    >
      <Title title={t('title')} />
      <BlogGridClient />
      <div className="flex justify-center">
        <AieduButton text={t('button.text')} link={props?.button?.link} />
      </div>
    </AieduLayoutSection>
  );
};

export { AieduHomepageBlogClient };
