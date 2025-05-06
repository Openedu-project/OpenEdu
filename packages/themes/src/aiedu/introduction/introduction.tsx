import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  introduction: {
    theme: undefined,
    aieduGoal: dynamic(() => import('./aiedu-goal').then(mod => mod.AieduIntroductionGoal)),
    aieduVisionMission: dynamic(() => import('./aiedu-vision-mission').then(mod => mod.AieduIntroductionVisionMission)),
    aieduFeatures: dynamic(() => import('./aiedu-features').then(mod => mod.AieduIntroductionFeatures)),
    // aieduExpert: dynamic(() => import('./aiedu-expert').then(mod => mod.AieduIntroductionExpert)),
    aieduTeacher: dynamic(() => import('./aiedu-teacher').then(mod => mod.AieduIntroductionTeacher)),
    aieduMentor: dynamic(() => import('./aiedu-mentor').then(mod => mod.AieduIntroductionMentor)),
    aieduMap: dynamic(() => import('./aiedu-map').then(mod => mod.AieduIntroductionMap)),
    aieduTrend: dynamic(() => import('./aiedu-trend').then(mod => mod.AieduIntroductionTrend)),
    aieduBenefit: dynamic(() => import('./aiedu-benefit').then(mod => mod.AieduIntroductionBenefit)),
  },
};

export const AieduIntroductionPage: SectionComponent<'introduction', 'theme'> = ({ props }) => {
  return (
    <>
      <ThemePageRenderer pageKey="introduction" pageRenderData={pageRender} props={props} />
    </>
  );
};
