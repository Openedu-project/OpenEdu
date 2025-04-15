import dynamic from 'next/dynamic';
import type { PageRender, SectionComponent } from '#types';
import { ThemePageRenderer } from '../../_components/web/theme-page-renderer';

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    availBlogs: dynamic(() => import('./avail-blogs/blog-server').then(mod => mod.AvailHomepageBlogsServer)),
    availCourses: dynamic(() =>
      import('./avail-courses/avail-courses-server').then(mod => mod.AvailHomepageCoursesServer)
    ),
    availEco: dynamic(() => import('./avail-eco').then(mod => mod.AvailHomepageEco)),
    availFeature: dynamic(() => import('./avail-feature').then(mod => mod.AvailHomepageFeature)),
    availHero: dynamic(() => import('./avail-hero').then(mod => mod.AvailHomepageHero)),
    availSolution: dynamic(() => import('./avail-solution').then(mod => mod.AvailHomepageSolution)),
  },
};

export const AvailHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="homepage" pageRenderData={pageRender} props={props} />;
};
