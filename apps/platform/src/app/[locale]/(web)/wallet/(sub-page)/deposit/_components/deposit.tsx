'use client';

import { ChevronLeft } from 'lucide-react';
import React from 'react';

import { useWalletDataStore } from '../../../_store/useWalletDataStore';
import { getExplorerLink } from '../../../_utils/utils';

import { useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import AlertBlock from '../../../_components/shared/alert-block';
import { useWalletVisibilityStore } from '../../../_store/useWalletVisibilityStore';
import AddressSection from './address-section';
import ChooseNetworkDialog from './choose-network-dialog';
import InforPopover from './infor-popover';
import QRCode from './qrcode';

const DepositHeader = React.memo(() => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push('/wallet');
  };
  const t = useTranslations('depositPage');

  return (
    <div className="inline-flex items-center gap-2">
      <Button onClick={handleBackClick} variant="ghost" className="p-2">
        <ChevronLeft color="#6368DC" className="cursor-pointer transition-all hover:scale-110 active:scale-110" />
      </Button>
      <div className="inline-flex gap-2">
        <h2 className="m-0 font-semibold text-[#2C2C2C] text-[24px] leading-[30px]">{t('title')}</h2>
        <InforPopover />
      </div>
    </div>
  );
});

DepositHeader.displayName = 'DepositHeader';

export default function Deposit() {
  const { isLoading } = useWalletVisibilityStore();
  const { chosenChain } = useWalletDataStore();
  const t = useTranslations('depositPage');

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-[0px_4px_30px_0px_#F4F5F6] sm:p-8">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-1/4 rounded bg-gray-200" />
          <div className="space-y-6">
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-40 rounded bg-gray-200" />
            <div className="h-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0px_4px_30px_0px_#F4F5F6] sm:p-8">
      <DepositHeader />
      <div className="space-y-6 pt-6">
        <ChooseNetworkDialog />
        <AddressSection />
        <QRCode />
        <AlertBlock>
          <div className="space-y-4">
            <div>
              <p className="mb-2 font-semibold text-primary">{t('supportToken')}</p>
              <ul className="list-none space-y-2 pl-5">
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  <span className="text-[16px]">NEAR (native)</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  <a
                    href="https://nearblocks.io/token/usdt.tether-token.near"
                    target="_blank"
                    className="text-[16px] text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    USDT
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  <a
                    href="https://nearblocks.io/token/17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1"
                    target="_blank"
                    className="text-[16px] text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    USDC
                  </a>
                </li>
              </ul>
            </div>
            <p className="font-medium text-primary">{t('otherTokenNotSupport')}</p>
          </div>
          <div className="mt-3 rounded-r-xl border-yellow-500 border-l-4 bg-yellow-100 p-4">
            <p className="text-yellow-700">
              <span className="font-bold">{t('caution')}</span> {t('alwaysDoubleCheck')}
            </p>
          </div>
        </AlertBlock>
        {chosenChain && (
          <a
            href={getExplorerLink(chosenChain.chain, 'address', chosenChain.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-[#5055D7] font-semibold text-base text-white">{t('viewTxns')}</Button>
          </a>
        )}
      </div>
    </div>
  );
}
