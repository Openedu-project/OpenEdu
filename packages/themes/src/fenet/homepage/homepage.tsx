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

const THEMES: PageRender = {
  homepage: {
    theme: undefined,
    fenetHero: dynamic(() => import('./hero').then(mod => mod.FenetHomepageHero)),
    // fenetAchievements: dynamic(() => import('./achievements').then(mod => mod.FenetHomepageAchievements)),
    // fenetAboutUs: dynamic(() => import('./about-us').then(mod => mod.FenetHomepageAboutUs)),
    // fenetContact: dynamic(() => import('./contact').then(mod => mod.FenetHomepageContact)),
    // fenetProjects: dynamic(() => import('./projects').then(mod => mod.FenetHomepageProjects)),
    fenetService: dynamic(() => import('./service').then(mod => mod.FenetHomepageService)),
    // fenetTeam: dynamic(() => import('./team').then(mod => mod.FenetHomepageTeam)),
    // fenetTestimonials: dynamic(() => import('./testimonials').then(mod => mod.FenetHomepageTestimonials)),
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
