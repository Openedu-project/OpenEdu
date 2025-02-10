import { getFeaturedOrgServicesAtWebsite } from "@oe/api/services/featured-contents";
import { getOrgByDomainService } from "@oe/api/services/organizations";
import AIFeatureSection from "./_components/ai-features";
import BlogsSection from "./_components/blogs-section";
import CTASection from "./_components/call-to-action";
import CourseLaunchpadSection from "./_components/course-launchpad";
import CreatorsSection from "./_components/creators";
import HeroSection from "./_components/hero-banner";
import LearningPathSection from "./_components/learning-path";
import OrganizationSection from "./_components/organizations";
import PopularCoursesSection from "./_components/polular-courses";
import ReferralProgramSection from "./_components/referral";

import type { IOrganization } from "@oe/api/types/organizations";
import { getCookie } from "@oe/core/utils/cookie";

export const getFeaturedOrgs = async () => {
  const domain =
    (await getCookie(process.env.NEXT_PUBLIC_COOKIE_API_REFERRER_KEY)) ?? "";
  try {
    const orgData = await getOrgByDomainService(undefined, { domain });

    if (!orgData?.id) {
      console.warn("No organization found for domain:", domain);
      return [];
    }

    const featuredOrgs = await getFeaturedOrgServicesAtWebsite(undefined, {
      params: { org_id: orgData?.id ?? "" },
    });

    const organizations = featuredOrgs?.reduce<IOrganization[]>((acc, item) => {
      if (item?.entity) {
        acc.push(item.entity);
      }
      return acc;
    }, []);

    return organizations ?? undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default async function Home() {
  const [organizations] = await Promise.all([getFeaturedOrgs()]);

  return (
    <div className="container mx-auto max-w-[1440px] px-4 py-0 md:px-6 lg:px-8">
      <HeroSection />
      <PopularCoursesSection />
      <LearningPathSection />
      {/* <AIAssistantSection /> */}
      <ReferralProgramSection />
      <AIFeatureSection />
      <CourseLaunchpadSection />
      {/* <TestimonialsSection /> */}
      <BlogsSection />
      <CreatorsSection />
      <OrganizationSection organizations={organizations} />
      <CTASection />
    </div>
  );
}
