// import dynamic from 'next/dynamic';
import { ThemePageRenderer } from "../../_components/web/theme-page-renderer";
import type { PageRender, SectionComponent } from "../../_types";

const pageRender: PageRender = {
  "about-us": {
    theme: undefined,
    // vbiCore: dynamic(() => import('./core/core')),
    // vbiGoal: dynamic(() => import('./goal/goal')),
    // vbiIntro: dynamic(() => import('./intro/intro')),
  },
};

const AboutUsPage: SectionComponent<"about-us", "theme"> = ({ props }) => {
  return (
    <ThemePageRenderer
      pageKey="about-us"
      pageRenderData={pageRender}
      props={props}
    />
  );
};

export default AboutUsPage;
