import { getLaunchpadService } from '@oe/api/services/launchpad';
import { ChevronLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import CourseInformation from './course-informations';
import VotingCard from './voting-card';

const LaunchpadVotePage = async ({ id }: { id: string }) => {
  const [campaign, t] = await Promise.all([
    getLaunchpadService(undefined, {
      id,
      preloads: ['Investment', 'Courses', 'VotingMilestones', 'Outline', 'Owner'],
    }),
    getTranslations('launchpadDetailPage.votePage'),
  ]);

  return (
    <main className="container z-1 mx-auto px-2 pt-8 pb-24 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <header className="mb-6 flex items-center gap-2">
        <Link href={`/launchpad/${id}`} className="border-none p-0">
          <Button variant="ghost">
            <ChevronLeft className="size-4" />
          </Button>
        </Link>

        <h2 className="m-0 font-semibold text-2xl leading-[125%]">{t('title')}</h2>
      </header>

      <div className="flex flex-col-reverse items-start gap-3 md:flex-row lg:flex-row">
        <CourseInformation campaign={campaign} />
        <VotingCard campaign={campaign} />
      </div>
    </main>
  );
};

export default LaunchpadVotePage;
