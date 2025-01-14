'use client';

import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#shadcn/tabs';
import useUrlStateHandler from '../hooks/useUrlStateHandler';
import { WalletHistoryTable } from './history-table';
import { RequestWithdrawTable } from './request-withdraw-table';

const HistoryList = () => {
  const [activeTab, setActiveTab] = useState<TAssetType>(ASSET_TYPES.FIAT);
  const handleTabChange = (changeValue: string) => {
    const newType = Object.values(ASSET_TYPES).includes(changeValue as TAssetType) ? (changeValue as TAssetType) : null;

    if (newType !== null) {
      setActiveTab(newType);
    }
  };
  const t = useTranslations('historyPage');

  useUrlStateHandler({
    handlers: [
      {
        type: ASSET_TYPES.CRYPTO,
        handler: () => setActiveTab(ASSET_TYPES.CRYPTO),
      },
    ],
  });

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="bg-transparent mb-4">
        <TabsTrigger
          value={ASSET_TYPES.FIAT}
          className="data-[state=active]:border-[#6368DC] data-[state=active]:border data-[state=active]:text-[#6368DC] data-[state=active]:bg-[#F2F1FF] rounded-[8px] text-[16px] font-semibold leading-5"
        >
          {t('fiat')}
        </TabsTrigger>
        <TabsTrigger
          value={ASSET_TYPES.CRYPTO}
          className="data-[state=active]:border-[#6368DC] data-[state=active]:border data-[state=active]:text-[#6368DC] data-[state=active]:bg-[#F2F1FF] rounded-[8px] text-[16px] font-semibold leading-5"
        >
          {t('token')}
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
  );
};

export default HistoryList;
