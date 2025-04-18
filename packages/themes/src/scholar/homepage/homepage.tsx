import dynamic from 'next/dynamic';
import { ThemePageRenderer } from '#components';
import type { PageRender, SectionComponent } from '#types';

const pageRender: PageRender = {
  homepage: {
    theme: undefined,
    scholarAboutUs: dynamic(() => import('./about-us').then(mod => mod.ScholarHomepageAboutUs)),
    scholarAchievements: dynamic(() => import('./achievements').then(mod => mod.ScholarHomepageAchievements)),
    scholarContact: dynamic(() => import('./contact').then(mod => mod.ScholarHomepageContact)),
    scholarHero: dynamic(() => import('./hero').then(mod => mod.ScholarHomepageHero)),
    scholarProjects: dynamic(() => import('./projects').then(mod => mod.ScholarHomepageProjects)),
    scholarService: dynamic(() => import('./service').then(mod => mod.ScholarHomepageService)),
    scholarTeam: dynamic(() => import('./team').then(mod => mod.ScholarHomepageTeam)),
    scholarTestimonials: dynamic(() => import('./testimonials').then(mod => mod.ScholarHomepageTestimonials)),
  },
};

export const ScholarHomepage: SectionComponent<'homepage', 'theme'> = ({ props }) => {
  return <ThemePageRenderer pageKey="homepage" pageRenderData={pageRender} props={props} />;
};
