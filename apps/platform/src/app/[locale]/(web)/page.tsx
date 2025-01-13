import AIAssistantSection from './_components/ai-assistant';
import BlogsSection from './_components/blogs-section';
import CTASection from './_components/call-to-action';
import CourseLaunchpadSection from './_components/course-launchpad';
import CreatorsSection from './_components/creators';
import FeatureSection from './_components/features';
import HeroSection from './_components/hero-banner';
import IntroductionSection from './_components/introduce';
import OrganizationSection from './_components/organizations';
import PartnerSection from './_components/partners';
import ReferralProgramSection from './_components/referral';
import TestimonialsSection from './_components/testimonials';

export default function Home() {
  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-0 md:px-6 lg:px-8">
      <HeroSection />
      <PartnerSection />
      <IntroductionSection />
      <AIAssistantSection />
      <BlogsSection />
      <ReferralProgramSection />
      <CourseLaunchpadSection />
      <OrganizationSection />
      <FeatureSection />
      <CreatorsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
