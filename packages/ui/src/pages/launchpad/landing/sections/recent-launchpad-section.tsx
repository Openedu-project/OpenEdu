import type { ILaunchpad } from '@oe/api/types/launchpad';
import { Loader2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CampainCardCompact } from '../../components/campaign-card';

const RecentLaunchpadSection = async ({
  campaigns,
}: {
  campaigns: ILaunchpad[] | undefined;
}) => {
  const t = await getTranslations('launchpadHomepage');
  const renderContent = () => {
    if (!campaigns) {
      return (
        <div className="flex h-64 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        </div>
      );
    }

    if (campaigns.length === 0) {
      return (
        <div className="flex h-64 w-full items-center justify-center">
          <p className="text-neutral-600">{t('recentLaunchpadSection.noRecentLaunchpad')}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {campaigns.map(campaign => (
          <CampainCardCompact key={campaign.id || `campaign-${Math.random()}`} campaign={campaign} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl leading-[125%]">{t('recentLaunchpadSection.title')}</h2>
        {/* <Button
          variant="outline"
          className="rounded-[12px] border-[2px] font-semibold text-neutral-600 text-sm"
          disabled={!campaigns || campaigns.length === 0}
        >
          View all
        </Button> */}
      </div>
      {renderContent()}
    </div>
  );
};

export default RecentLaunchpadSection;
