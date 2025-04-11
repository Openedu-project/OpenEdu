// import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '../../_components/web/theme-page-renderer';
import type { PageRender, SectionComponent } from '../../_types';

const pageRender: PageRender = {
  'about-us': {
    theme: undefined,
    // vbiCore: dynamic(() => import('./core/core')),
    // vbiGoal: dynamic(() => import('./goal/goal')),
    // vbiIntro: dynamic(() => import('./intro/intro')),
  },
};

export const AvailHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="homepage" pageRenderData={pageRender} props={props} />;
};
