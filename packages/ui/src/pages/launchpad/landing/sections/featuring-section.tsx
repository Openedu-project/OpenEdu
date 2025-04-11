import type { ILaunchpad } from '@oe/api';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CampainCardFull, CampainCardHorizontal } from '../../components/campaign-card';

const FeaturingSection = ({
  campaigns,
}: {
  campaigns: ILaunchpad[] | undefined;
}) => {
  const t = useTranslations('launchpadHomepage');

  const renderContent = () => {
    if (!campaigns) {
      return (
        <div className="flex h-96 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
        </div>
      );
    }

    if (campaigns.length === 0) {
      return (
        <div className="flex h-96 w-full items-center justify-center">
          <p className="text-neutral-600">{t('common.noLaunchpads')}</p>
        </div>
      );
    }

    const horizontalCardsCount = Math.min(2, campaigns.length - 1);

    return (
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="w-full md:w-1/2">{campaigns[0] && <CampainCardFull campaign={campaigns[0]} />}</div>

        {horizontalCardsCount > 0 && (
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              {campaigns.slice(1, 3).map((item: ILaunchpad, index: number) => (
                <CampainCardHorizontal key={item.id || index} campaign={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="z-10 space-y-3 px-1 pt-5 md:pt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl leading-[125%]">{t('featuringSection.title')}</h2>
        {/* TODO: Temporarily hidden - Will be implemented later
        <Button
          variant="outline"
          className="rounded-[12px] border-[2px] font-semibold text-neutral-600 text-sm"
          disabled={!campaigns || campaigns.length === 0}
        >
          View all
        </Button> */}
      </div>
      {renderContent()}
    </section>
  );
};

export { FeaturingSection };
