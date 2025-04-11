import { CURRENCY_SYMBOLS, type TCurrencySymbol } from '@oe/api';
import { getLaunchpadService } from '@oe/api';
import { type NearTokenBalances, getNearTokens } from '@oe/api';
import { getWalletSevice } from '@oe/api';
import { ChevronLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { CampaignInformationCard } from './campaign-information-card';
import { PledgeForm } from './pledge-form';

interface LaunchpadPledgePageProps {
  id: string;
}

const LaunchpadPledgePage = async ({ id }: LaunchpadPledgePageProps) => {
  try {
    const [campaign, wallets, t] = await Promise.all([
      getLaunchpadService(undefined, {
        id,
        preloads: ['Investment'],
      }),
      getWalletSevice(),
      getTranslations('launchpadDetailPage.pledgePage'),
    ]);

    if (!(campaign && wallets)) {
      notFound();
    }

    const walletInvest = wallets.find(wallet => wallet.currency === campaign.funding_goal.currency);
    const nearWallet = wallets.find(wallet => wallet.currency === CURRENCY_SYMBOLS.NEAR);

    let tokenInvestBalance: number | undefined;
    if (walletInvest && nearWallet) {
      const nearBalances: NearTokenBalances = await getNearTokens(nearWallet.address);
      tokenInvestBalance = nearBalances?.tokens[walletInvest.currency as TCurrencySymbol]?.balance;
    }

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
          <PledgeForm walletInvest={walletInvest} launchpadId={campaign.id} tokenInvestBalance={tokenInvestBalance} />
          <CampaignInformationCard campaign={campaign} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading launchpad page:', error);
    throw error;
  }
};

export { LaunchpadPledgePage };
