import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  'about-us': {
    theme: undefined,
    vbiCore: dynamic(() => import('./core').then(mod => mod.VbiAboutUsCore)),
    vbiGoal: dynamic(() => import('./goal').then(mod => mod.VbiAboutUsGoal)),
    vbiIntro: dynamic(() => import('./intro').then(mod => mod.VbiAboutUsIntro)),
  },
};

export const VbiAboutUs: SectionComponent<'about-us', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="about-us" pageRenderData={pageRender} props={props} />;
};
