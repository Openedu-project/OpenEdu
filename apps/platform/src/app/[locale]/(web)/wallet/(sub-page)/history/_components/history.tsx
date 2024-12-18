'use client';

import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { WalletHistoryTable } from './history/wallet-history-table';
import { RequestWithdrawTable } from './request-withdraw/request-withdraw-table';

const HistoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tHistoryPage = useTranslations('historyPage');

  const handleBackClick = useCallback(() => {
    router.push('/wallet');
  }, [router]);

  const [activeTab, setActiveTab] = useState<TAssetType>(ASSET_TYPES.FIAT);

  const handleTabChange = (changeValue: string) => {
    const newType = Object.values(ASSET_TYPES).includes(changeValue as TAssetType) ? (changeValue as TAssetType) : null;

    if (newType !== null) {
      setActiveTab(newType);
    }
  };

  useEffect(() => {
    const type = searchParams.get('type')?.toLowerCase();

    if (type && Object.values(ASSET_TYPES).includes(type as TAssetType)) {
      const assetType = type as TAssetType;

      setActiveTab(assetType);

      // Remove the 'type' parameter from the URL
      const newSearchParams = new URLSearchParams(searchParams.toString());

      newSearchParams.delete('type');
      router.replace('/wallet/history');
    }
  }, [searchParams, router]);

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button variant="ghost" onClick={handleBackClick} className="p-2 w-fit">
          <ChevronLeft color="#6368DC" />
        </Button>
        <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 mb-0">{tHistoryPage('title')}</h2>
      </div>
      <p className="mt-4 mb-4 text-[#6E6E6E] text-[14px] md:text-[16px] font-normal leading-5">
        {tHistoryPage('desc')}
      </p>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="bg-transparent mb-4">
          <TabsTrigger
            value={ASSET_TYPES.FIAT}
            className="data-[state=active]:border-[#6368DC] data-[state=active]:border data-[state=active]:text-[#6368DC] data-[state=active]:bg-[#F2F1FF] rounded-[8px] text-[16px] font-semibold leading-5"
          >
            {tHistoryPage('fiat')}
          </TabsTrigger>
          <TabsTrigger
            value={ASSET_TYPES.CRYPTO}
            className="data-[state=active]:border-[#6368DC] data-[state=active]:border data-[state=active]:text-[#6368DC] data-[state=active]:bg-[#F2F1FF] rounded-[8px] text-[16px] font-semibold leading-5"
          >
            {tHistoryPage('token')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={ASSET_TYPES.FIAT}>
          <div className="space-y-6">
            <section>
              <h3 className="mb-4 text-[16px] font-semibold">Transactions</h3>
              <WalletHistoryTable type={ASSET_TYPES.FIAT} />
            </section>
            <section>
              <h3 className="mb-4 text-[16px] font-semibold">Request For Withdraw</h3>
              <RequestWithdrawTable />
            </section>
          </div>
        </TabsContent>

        <TabsContent value={ASSET_TYPES.CRYPTO}>
          <WalletHistoryTable type={ASSET_TYPES.CRYPTO} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default HistoryPage;
