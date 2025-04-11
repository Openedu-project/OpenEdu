import { getThemeComponentByPagesConfig } from '../../_utils/function';

import type {
  PageRender,
  PageSectionConfig,
  PageSectionConfigs,
  SectionComponent,
  SectionsByPage,
  ThemePageKey,
} from '../../_types';

import dynamic from 'next/dynamic';

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    availBlogs: dynamic(() => import('./avail-blogs/blog-server')),
    availCourses: dynamic(() => import('./avail-courses/avail-courses-server')),
    availEco: dynamic(() => import('./avail-eco/avail-eco')),
    availFeature: dynamic(() => import('./avail-feature/avail-feature')),
    availHero: dynamic(() => import('./avail-hero/avail-hero')),
    availSolution: dynamic(() => import('./avail-solution/avail-solution')),
  },
};

export const VbiAboutUs: SectionComponent<'about-us', 'theme'> = ({ props }) => {
  if (!props) {
    return;
  }

  const renderPreviewSection = (key: SectionsByPage['homepage']) => {
    const PageComponent = getThemeComponentByPagesConfig<ThemePageKey, SectionsByPage['homepage']>(
      pageRender,
      'homepage',
      key
    );

    const sectionConfig = props?.currentConfigSections?.[key] || props?.pageConfig.homepage?.config?.[key];

    if (!sectionConfig?.enable) {
      return undefined;
    }

    if (!PageComponent) {
      return undefined;
    }

    return (
      <PageComponent
        key={key}
        sectionConfig={sectionConfig as PageSectionConfig<ThemePageKey>}
        props={sectionConfig.props}
      />
    );
  };

  const sortedSections = (currentConfigSections?: PageSectionConfigs<ThemePageKey>) => {
    const configs = currentConfigSections;
    if (configs && Object.keys(configs).length > 0) {
      return Object.entries(configs)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([key, _value]) => key as SectionsByPage['homepage']);
    }
    return [];
  };

  return (
    <>
      {sortedSections(props?.currentConfigSections)?.length > 0 ? (
        sortedSections(props?.currentConfigSections).map(renderPreviewSection)
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">preview</div>
      )}
    </>
  );
};
