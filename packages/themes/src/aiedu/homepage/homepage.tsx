import dynamic from 'next/dynamic';
import type { PageRender, SectionComponent } from '#types';
import { ThemePageRenderer } from '../../_components/web/theme-page-renderer';

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    // Theme step 23 : add section (use the server component)
    aieduHero: dynamic(() => import('./aiedu-hero').then(mod => mod.AieduHomepageHero)),
    aieduFeatures: dynamic(() => import('./aiedu-features').then(mod => mod.AieduHomepageFeatures)),
    // aieduExpert: dynamic(() => import('./aiedu-expert').then(mod => mod.AieduHomepageExpert)),
    aieduTeacher: dynamic(() => import('./aiedu-teacher').then(mod => mod.AieduHomepageTeacher)),
    aieduMentor: dynamic(() => import('./aiedu-mentor').then(mod => mod.AieduHomepageMentor)),
    aieduDashboard: dynamic(() =>
      import('./aiedu-dashboard/dashboard-server').then(mod => mod.AieduHomepageDashboardServer)
    ),
    aieduBlog: dynamic(() => import('./aiedu-blog/aiedu-blog-server').then(mod => mod.AieduHomepageBlogServer)),
    aieduCert: dynamic(() => import('./aiedu-cert').then(mod => mod.AieduHomepageCert)),
    aieduGuide: dynamic(() => import('./aiedu-guide').then(mod => mod.AieduHomepageGuide)),
    aieduSponsors: dynamic(() => import('./aiedu-sponsors').then(mod => mod.AieduHomepageSponsors)),
    aieduGallery: dynamic(() => import('./aiedu-gallery').then(mod => mod.AieduHomepageGallery)),
  },
};

// Theme step 24 : create a homepage
export const AieduHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="homepage" pageRenderData={pageRender} props={props} />;
};
