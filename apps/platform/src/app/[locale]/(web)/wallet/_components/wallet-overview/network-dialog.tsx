'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { copyToClipboard, shortenAddress } from '@oe/ui/utils/utils';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useWalletDataStore } from '../../_store/useWalletDataStore';
import { CHAIN_DATA_INFO, CHAIN_LOGOS, getExplorerLink } from '../../_utils/utils';

interface NetworkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NetworkDialogItem = React.memo(() => {
  const tToast = useTranslations('toast');
  const integratedChainData = useWalletDataStore(state => state.integratedChainData);

  const handleCopyClick = useCallback(
    (address: string) => (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.preventDefault();
      copyToClipboard(address, tToast('copyToClipboard'));
    },
    [tToast]
  );

  return (
    <>
      {Object.entries(integratedChainData || {}).map(([chain, data]) => {
        const { address } = data;
        if (!address) {
          return null;
        }

        const chainKey = chain as keyof typeof CHAIN_DATA_INFO;
        const chainInfo = CHAIN_DATA_INFO[chainKey];
        if (!chainInfo) {
          return null;
        }
        const shortenedAddress = shortenAddress(address, 10, 10);
        const explorerLink = getExplorerLink(chainKey, 'address', address);

        return (
          <div key={chain} className="m-0 flex items-center justify-between gap-3">
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-200">
                <div className="relative h-full w-full">
                  <Image src={CHAIN_LOGOS[chain as keyof typeof CHAIN_LOGOS].src} fill alt={chain} />
                </div>
              </div>

              <div>
                <h3 className="mb-0 font-semibold text-xl leading-6">{chainInfo.name}</h3>
                <div className="inline-flex gap-3">
                  <a
                    className="cursor-pointer text-[#2C2C2C] text-sm underline"
                    target="_blank"
                    href={explorerLink}
                    rel="noreferrer"
                  >
                    {shortenedAddress}
                  </a>
                </div>
              </div>
            </div>

            <Copy onClick={handleCopyClick(address)} className="h-5 w-5 cursor-pointer" />
          </div>
        );
      })}
    </>
  );
});

NetworkDialogItem.displayName = 'NetworkDialogItem';

const NetworkDialog = ({ isOpen, onOpenChange }: NetworkDialogProps) => {
  const tNetwork = useTranslations('networkDialog');
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="mb-0 font-semibold text-[#2C2C2C] text-[28px] leading-9">
            {tNetwork('title')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">{tNetwork('description')}</DialogDescription>
        </DialogHeader>
        <NetworkDialogItem />
      </DialogContent>
    </Dialog>
  );
};

export default NetworkDialog;
