import dynamic from 'next/dynamic';
import type { PageRender, SectionComponent } from '#types';
import { ThemePageRenderer } from '../../_components/web/theme-page-renderer';

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    // Theme step 23 : add section (use the server component)
    aieduHero: dynamic(() => import('./aiedu-hero').then(mod => mod.AieduHomepageHero)),
  },
};

// Theme step 24 : create a homepage
export const AieduHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="homepage" pageRenderData={pageRender} props={props} />;
};
