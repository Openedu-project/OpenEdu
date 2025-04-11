import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '../../_components/web/theme-page-renderer';
import type { PageRender, SectionComponent } from '../../_types';

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    vbiHero: dynamic(() => import('./vbi-hero/vbi-hero-server').then(mod => mod.VbiHomepageHeroServer)),
    vbiAchievements: dynamic(() => import('./vbi-achievements/server').then(mod => mod.VbiHomepageAchievementsServer)),
    vbiCourses: dynamic(() => import('./vbi-courses/server').then(mod => mod.VbiHomepageCoursesServer)),
    vbiCert: dynamic(() => import('./vbi-cert/server').then(mod => mod.VbiHomepageCertServer)),
    vbiFeatures: dynamic(() => import('./vbi-features/server').then(mod => mod.VbiHomepageFeaturesServer)),
    vbiBlogs: dynamic(() => import('./vbi-blogs/vbi-blogs-server').then(mod => mod.VbiHomepageBlogsServer)),
    vbiEvents: dynamic(() => import('./vbi-events/server').then(mod => mod.VbiHomepageEventsServer)),
    vbiCreators: dynamic(() => import('./vbi-creators/server').then(mod => mod.VbiHomepageCreatorsServer)),
    vbiMap: dynamic(() => import('./vbi-map/server').then(mod => mod.VbiHomepageMapServer)),
  },
};

export const VbiHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="homepage" pageRenderData={pageRender} props={props} />;
};
