import { AIFeatureSection } from "./_components/ai-features";
import { BlogsSection } from "./_components/blogs-section";
import { CTASection } from "./_components/call-to-action";
import { LaunchpadSection } from "./_components/course-launchpad";
import { CreatorsSection } from "./_components/creators";
import { HeroSection } from "./_components/hero-banner";
import { LearningPathSection } from "./_components/learning-path";
import { OrganizationSection } from "./_components/organizations";
import { PopularCoursesSection } from "./_components/polular-courses";
import { ReferralProgramSection } from "./_components/referral";

export default function Home() {
  return (
    <div className="container mx-auto flex max-w-[1440px] flex-col gap-[60px] px-4 py-0 md:px-6 lg:px-8">
      <HeroSection />
      <PopularCoursesSection />
      <LearningPathSection />
      {/* <AIAssistantSection /> */}
      <ReferralProgramSection />
      <AIFeatureSection />
      <LaunchpadSection />
      {/* <TestimonialsSection /> */}
      <CreatorsSection />
      <BlogsSection />
      <OrganizationSection />
      <CTASection />
    </div>
  );
}
