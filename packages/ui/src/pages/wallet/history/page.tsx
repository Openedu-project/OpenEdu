'use client';
import { WALLET_ROUTES } from '@oe/core';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import { FiatHistory } from './fiat-history';
import { FiatRequestWithdrawHistory } from './fiat-request-withdraw-history';
import { TokenHistory } from './token-history';

export function WalletHistoryPage() {
  const t = useTranslations('wallets.historyPage');

  return (
    <div className="mx-auto max-w-screen-xl space-y-4">
      <div className="flex flex-col gap-2">
        <Link
          href={WALLET_ROUTES.wallet}
          className="flex justify-start gap-2 p-0 hover:bg-transparent hover:underline"
          variant="ghost"
          activeClassName="border-none text-foreground"
        >
          <ChevronLeft className="size-4" />
          <span className="giant-iheading-semibold18">{t('title')}</span>
        </Link>
        <p className="text-muted-foreground text-sm">{t('desc')}</p>
      </div>

      <Tabs defaultValue="token" className="w-full">
        <TabsList>
          <TabsTrigger
            value="token"
            className="data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            {t('token')}
          </TabsTrigger>
          <TabsTrigger
            value="fiat"
            className="data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            {t('fiat')}
          </TabsTrigger>
          <TabsTrigger
            value="fiat_request_withdraw"
            className="data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:text-primary"
          >
            {t('fiat_request_withdraw')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="token">
          <TokenHistory />
        </TabsContent>

        <TabsContent value="fiat">
          <FiatHistory />
        </TabsContent>

        <TabsContent value="fiat_request_withdraw">
          <FiatRequestWithdrawHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
