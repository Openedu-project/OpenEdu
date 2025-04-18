import { getThemeComponentByPagesConfig } from '#utils';

import type {
  PageRender,
  PageSectionConfig,
  PageSectionConfigs,
  SectionComponent,
  SectionsByPage,
  ThemePageKey,
} from '#types';

import dynamic from 'next/dynamic';

const THEMES: PageRender = {
  homepage: {
    theme: undefined,
    fenetHero: dynamic(() => import('./hero').then(mod => mod.FenetHomepageHero)),
    fenetBlog: dynamic(() => import('./blog').then(mod => mod.FenetHomepageBlog)),
    fenetCustomer: dynamic(() => import('./customer').then(mod => mod.FenetHomepageCustomer)),
    fenetExperience: dynamic(() => import('./experience').then(mod => mod.FenetHomepageExperience)),
    fenetExpert: dynamic(() => import('./expert').then(mod => mod.FenetHomepageExpert)),
    fenetFeature: dynamic(() => import('./feature').then(mod => mod.FenetHomepageFeature)),
    fenetPrice: dynamic(() => import('./price').then(mod => mod.FenetHomepagePrice)),
    fenetService: dynamic(() => import('./service').then(mod => mod.FenetHomepageService)),
  },
};

export const FenetHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  if (!props) {
    return;
  }

  const renderPreviewSection = (key: SectionsByPage['homepage']) => {
    const PageComponent = getThemeComponentByPagesConfig<ThemePageKey, SectionsByPage['homepage']>(
      THEMES,
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
