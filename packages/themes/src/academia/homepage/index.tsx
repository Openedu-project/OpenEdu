import dynamic from "next/dynamic";
import { ThemePageRenderer } from "../../_components/web/theme-page-renderer";
import type { PageRender, SectionComponent } from "../../_types";

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    hero: dynamic(() =>
      import("./hero").then((mod) => mod.AcademiaHomepageHero)
    ),
    features: dynamic(() =>
      import("./features").then((mod) => mod.AcademiaHomepageFeatures)
    ),
    partners: dynamic(() =>
      import("./partners").then((mod) => mod.AcademiaHomepagePartners)
    ),
    organizations: dynamic(() =>
      import("./organizations").then((mod) => mod.AcademiaHomepageOrganizations)
    ),
    explores: dynamic(() =>
      import("./explores").then((mod) => mod.AcademiaHomepageExplores)
    ),
  },
};

const Homepage: SectionComponent<"homepage", "theme"> = ({ props }) => {
  return (
    <ThemePageRenderer
      pageKey="homepage"
      pageRenderData={pageRender}
      props={props}
    />
  );
};

export default Homepage;
