import { getLaunchpadsService } from '@oe/api/services/launchpad';
import Icon from '@oe/assets/images/launchpad/icons/launchpad-list-icon.svg';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
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
      <Link href={PLATFORM_ROUTES.myLaunchpad} className="fixed top-[120px] right-[30px] z-10 h-auto p-0">
        <div className="flex max-w-[60px] justify-center rounded-full lg:max-w-[80px]">
          <Image src={Icon.src} height={80} width={80} alt="failed-icon" />
        </div>
      </Link>
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
