import { Check, ChevronDown, LoaderCircle } from 'lucide-react';
import type React from 'react';
import { memo, useCallback, useMemo } from 'react';

import type { TChain } from '@oe/api/utils/wallet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@oe/ui/shadcn/dialog';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import AlertBlock from '../../../_components/shared/alert-block';
import { useWalletDataStore } from '../../../_store/useWalletDataStore';
import { CHAIN_DATA_INFO } from '../../../_utils/utils';

type ChoosingBlockParams = {
  isChosen?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const ChoosingBlock = memo(({ isChosen, children, onClick }: ChoosingBlockParams) => (
  <button
    type="button"
    className={cn(
      'w-full relative block cursor-pointer overflow-hidden rounded-[8px] border p-4 font-normal text-[#2C2C2C] text-base leading-5',
      isChosen && 'border-[#6368DC]'
    )}
    onClick={onClick}
    onKeyPress={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.();
      }
    }}
  >
    {children}
    {isChosen && (
      <div className="absolute top-0 right-0 rounded-bl-md bg-[#6368DC] p-1">
        <Check className="h-4 w-4 text-white" />
      </div>
    )}
  </button>
));

ChoosingBlock.displayName = 'ChoosingBlock';

const NetworkDialogTrigger = memo(() => {
  const chosenChain = useWalletDataStore(state => state.chosenChain);
  const t = useTranslations('walletPage');

  return (
    <div className="space-y-3">
      <span className="font-semibold text-[#424242] text-[16px] leading-5">{t('network')}</span>
      <DialogTrigger className="w-full">
        <div className="flex cursor-pointer items-center justify-between rounded-lg border border-[#DBDBDB] p-4">
          <span className="font-normal text-[16px] capitalize leading-5">{chosenChain?.chain || 'Choose Network'}</span>
          <ChevronDown />
        </div>
      </DialogTrigger>
    </div>
  );
});

NetworkDialogTrigger.displayName = 'NetworkDialogTrigger';

const NetworkDialogContent = memo(() => {
  const selectedChain = useWalletDataStore(state => state.chosenChain);
  const setChosenChain = useWalletDataStore(state => state.setChosenChain);
  const integratedChainData = useWalletDataStore(state => state.integratedChainData);
  const t = useTranslations('depositPage');

  const handleNetworkChange = useCallback(
    (newNetwork: keyof typeof CHAIN_DATA_INFO) => {
      setChosenChain(newNetwork as TChain, {
        address: integratedChainData?.[newNetwork]?.address || '',
      });
    },
    [setChosenChain, integratedChainData]
  );

  const chainKeys = useMemo(() => Object.keys(integratedChainData || {}), [integratedChainData]);

  return (
    <DialogContent className="p-8 sm:rounded-2xl">
      <DialogHeader>
        <DialogTitle className="mb-6 font-semibold text-[24px] leading-[30px]">{t('chooseNetwork')}</DialogTitle>
        <div className="space-y-3">
          <DialogDescription>
            <AlertBlock>{t('ensureNetwork')}</AlertBlock>
          </DialogDescription>

          {chainKeys.length > 0 ? (
            chainKeys.map(chain => {
              if (!chain) {
                return null;
              }
              const chainKey = chain as keyof typeof CHAIN_DATA_INFO;

              return (
                <ChoosingBlock
                  key={chain}
                  isChosen={chain === selectedChain?.chain}
                  onClick={() => handleNetworkChange(chainKey)}
                >
                  <span className="mr-1 font-semibold">{CHAIN_DATA_INFO[chainKey]?.symbol}</span>
                  <span className="opacity-90">{CHAIN_DATA_INFO[chainKey]?.name}</span>
                </ChoosingBlock>
              );
            })
          ) : (
            <div className="mt-4 flex w-full items-center justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
        </div>
      </DialogHeader>
    </DialogContent>
  );
});

NetworkDialogContent.displayName = 'NetworkDialogContent';

const ChooseNetworkDialog = () => (
  <Dialog>
    <NetworkDialogTrigger />
    <NetworkDialogContent />
  </Dialog>
);

export default ChooseNetworkDialog;
