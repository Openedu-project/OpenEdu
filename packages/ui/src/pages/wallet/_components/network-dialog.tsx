import type { IWallet } from '@oe/api';
import { useWallet } from '@oe/api';
// import { copyToClipboard, shortenAddress } from "#utils/utils";
// import { getExplorerLink } from "#utils/wallet";
// import { CRYPTO_CURRENCIES } from "@oe/api";
// import useWalletBase, { type IWalletBase } from "@oe/api";
import { ASSET_TYPES, CRYPTO_CURRENCIES } from '@oe/api';
// import { TokenIcon } from "@web3icons/react";
import { Copy, Network } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { Modal } from '#components/modal';
import { copyToClipboard } from '#utils/copy';
import { shortenAddress } from '#utils/crypto';

interface NetworkItemProps extends IWallet {
  onCopyClick: (address: string) => void;
}

const NetworkItem = ({ network, address, onCopyClick }: NetworkItemProps) => {
  const currencyInfo = Object.values(CRYPTO_CURRENCIES).find(c => c.value.toLowerCase() === network.toLowerCase());
  const explorerLink = `${currencyInfo?.explorerAddr}/${address}`;
  const Icon = currencyInfo?.icon;
  const shortAddress = shortenAddress(address);
  return (
    <div className="flex items-center gap-4 py-4">
      {Icon && <Icon className="h-8 w-8" />}
      <div>
        <h3 className="mb-0 font-medium text-base uppercase">{network}</h3>
        <div className="flex items-center gap-2">
          {explorerLink ? (
            <a
              href={explorerLink}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground text-sm hover:underline"
            >
              {shortAddress}
            </a>
          ) : (
            <span className="text-muted-foreground text-sm">{shortAddress}</span>
          )}
          <Copy
            className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
            onClick={() => onCopyClick(address)}
          />
        </div>
      </div>
    </div>
  );
};

export const NetworkListModal = () => {
  // const tNetworkDialog = useTranslations("networkDialog");
  const tWallets = useTranslations('wallets');
  const tToast = useTranslations('toast');
  const { wallets } = useWallet();

  const handleCopyClick = useCallback(
    (address: string) => {
      copyToClipboard(address, tToast('copied'));
    },
    [tToast]
  );

  return (
    <Modal
      title={tWallets('networks.title')}
      description={tWallets('networks.description')}
      className="max-w-lg"
      trigger={
        <div className="flex h-8 cursor-pointer items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground">
          <Network className="h-4 w-4" />
          <span>{tWallets('networks.title')}</span>
        </div>
      }
    >
      <div className="divide-y">
        {wallets
          ?.filter(wallet => wallet.type === ASSET_TYPES.CRYPTO)
          ?.filter((wallet, index, self) => index === self.findIndex(w => w.network === wallet.network))
          ?.map(wallet => (
            <NetworkItem key={wallet.blockchain_wallet_id} {...wallet} onCopyClick={handleCopyClick} />
          ))}
      </div>
    </Modal>
  );
};
