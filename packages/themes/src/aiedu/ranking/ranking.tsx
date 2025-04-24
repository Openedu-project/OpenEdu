import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  introduction: {
    theme: undefined,
  },
};

export const AieduRankingPage: SectionComponent<'ranking', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="ranking" pageRenderData={pageRender} props={props} />;
};
