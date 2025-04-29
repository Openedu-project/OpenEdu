import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  introduction: {
    theme: undefined,
    aieduGoal: dynamic(() => import('./aiedu-goal').then(mod => mod.AieduIntroductionGoal)),
    aieduVisionMission: dynamic(() => import('./aiedu-vision-mission').then(mod => mod.AieduIntroductionVisionMission)),
    aieduFeatures: dynamic(() => import('./aiedu-features').then(mod => mod.AieduIntroductionFeatures)),
    aieduExpert: dynamic(() => import('./aiedu-expert').then(mod => mod.AieduIntroductionExpert)),
    aieduMap: dynamic(() => import('./aiedu-map').then(mod => mod.AieduIntroductionMap)),
  },
};

export const AieduIntroductionPage: SectionComponent<'introduction', 'theme'> = ({ props }) => {
  return (
    <>
      <ThemePageRenderer pageKey="introduction" pageRenderData={pageRender} props={props} />
    </>
  );
};
