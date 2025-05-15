"use client";
import dynamic from "next/dynamic";

const BlogsSection = dynamic(
  () => import("./blogs-section").then((mod) => mod.BlogsSection),
  {
    ssr: false,
  }
);
const CreatorsSection = dynamic(
  () => import("./creators").then((mod) => mod.CreatorsSection),
  {
    ssr: false,
  }
);
const LaunchpadSection = dynamic(
  () => import("./course-launchpad").then((mod) => mod.LaunchpadSection),
  {
    ssr: false,
  }
);
const LearningPathSection = dynamic(
  () => import("./learning-path").then((mod) => mod.LearningPathSection),
  {
    ssr: false,
  }
);
const OrganizationSection = dynamic(
  () => import("./organizations").then((mod) => mod.OrganizationSection),
  {
    ssr: false,
  }
);
const PopularCoursesSection = dynamic(
  () => import("./polular-courses").then((mod) => mod.PopularCoursesSection),
  {
    ssr: false,
  }
);
const ReferralProgramSection = dynamic(
  () => import("./referral").then((mod) => mod.ReferralProgramSection),
  {
    ssr: false,
  }
);
const AIFeatureSection = dynamic(
  () => import("./ai-features").then((mod) => mod.AIFeatureSection),
  {
    ssr: false,
  }
);
const CTASection = dynamic(
  () => import("./call-to-action").then((mod) => mod.CTASection),
  {
    ssr: false,
  }
);

export function LazySections() {
  return (
    <>
      <PopularCoursesSection />
      <LearningPathSection />
      <ReferralProgramSection />
      <AIFeatureSection />
      <LaunchpadSection />
      <CreatorsSection />
      <BlogsSection />
      <OrganizationSection />
      <CTASection />
    </>
  );
}
