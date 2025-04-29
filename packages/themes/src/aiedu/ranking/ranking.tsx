import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  ranking: {
    theme: undefined,
    aieduDashboard: dynamic(() =>
      import('./aiedu-dashboard/dashboard-server').then(mod => mod.AieduRankingDashboardServer)
    ),
  },
};

export const AieduRankingPage: SectionComponent<'ranking', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="ranking" pageRenderData={pageRender} props={props} />;
};
