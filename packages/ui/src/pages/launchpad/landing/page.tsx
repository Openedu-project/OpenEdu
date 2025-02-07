import { getLaunchpadsService } from '@oe/api/services/launchpad';
import { LaunchpadBackground } from './components';
import { FeaturingSection, HeroSection, HowToSection, RecentLaunchpadSection, StepSection } from './sections';

export default async function LaunchpadPage() {
  const campains = await getLaunchpadsService(undefined, {
    params: {
      page: 1,
      per_page: 12,
      sort: 'create_at desc',
      preloads: ['Owner', 'Investment'],
    },
  });

  return (
    <main className="relative">
      <LaunchpadBackground />
      <div className="container z-1 mx-auto px-2 pb-24 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <HeroSection />

        <div className="space-y-20">
          <FeaturingSection campaigns={campains?.results} />
          <StepSection />
          <RecentLaunchpadSection campaigns={campains?.results} />
          <HowToSection />
        </div>
      </div>
    </main>
  );
}
