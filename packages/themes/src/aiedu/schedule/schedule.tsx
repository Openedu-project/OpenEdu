import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  introduction: {
    theme: undefined,
  },
};

export const AieduSchedulePage: SectionComponent<'schedule', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="schedule" pageRenderData={pageRender} props={props} />;
};
