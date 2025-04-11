import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '../../_components/web/theme-page-renderer';
import type { PageRender, SectionComponent } from '../../_types';

const pageRender: PageRender = {
  partners: {
    theme: undefined,
    vbiCta: dynamic(() => import('./cta/cta').then(mod => mod.VbiPartnersCta)),
    vbiPartnerFeatures: dynamic(() => import('./features/vbi-features').then(mod => mod.VbiPartnersFeatures)),
    vbiPartnerList: dynamic(() => import('./partner-list/partner-list').then(mod => mod.VbiPartnersList)),
    vbiShowcase: dynamic(() => import('./showcase/showcase').then(mod => mod.VbiPartnersShowcase)),
    vbiTesti: dynamic(() => import('./testimonials/testi').then(mod => mod.VbiPartnersTesti)),
  },
};

export const VbiPartners: SectionComponent<'partners', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="partners" pageRenderData={pageRender} props={props} />;
};
