// import dynamic from "next/dynamic";
import { ThemePageRenderer } from "../../_components/web/theme-page-renderer";
import type { PageRender, SectionComponent } from "../../_types";

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    // fenetBlog: dynamic(() => import('./blog/blog')),
    // fenetCustomer: dynamic(() => import('./customer/customer')),
    // fenetExperience: dynamic(() => import('./experience/experience')),
    // fenetExpert: dynamic(() => import('./expert/expert')),
    // fenetHero: dynamic(() => import('./hero/hero')),
    // fenetPrice: dynamic(() => import('./price/price')),
    // fenetService: dynamic(() => import('./service/service')),
    // fenetFeature: dynamic(() => import('./feature/feature')),
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
