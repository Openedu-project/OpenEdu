import type { IWallet } from '@oe/api';
import { ArrowDown, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Modal } from '#components/modal';
import { Selectbox } from '#components/selectbox';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { copyToClipboard } from '#utils/copy';

export function DepositModal({ wallets }: { wallets: IWallet[] }) {
  const t = useTranslations('wallets');
  const [selectedWallet, setSelectedWallet] = useState<IWallet>(wallets[0] as IWallet);
  const isOnlyOneWallet = wallets.length === 1;

  const handleSelectWallet = (wallet: IWallet) => {
    setSelectedWallet(wallet);
  };

  const selectBoxOptions = wallets.map(wallet => ({
    id: wallet.network,
    value: wallet.network,
    label: wallet.network,
    style: {
      textTransform: 'uppercase' as const,
    },
  }));

  return (
    <Modal
      title={t('deposit')}
      trigger={
        <Button variant="outline" size="xs" className="gap-1 text-success hover:text-success/80">
          <ArrowDown className="h-4 w-4" />
          {t('deposit')}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <Label className="flex flex-col gap-2">
          {t('network')}
          <Selectbox
            value={selectedWallet.network}
            disabled={isOnlyOneWallet}
            className="uppercase"
            onChange={value => {
              const wallet = wallets.find(w => w.network === value);
              if (wallet) {
                handleSelectWallet(wallet);
              }
            }}
            options={selectBoxOptions}
          />
        </Label>
        <Label className="flex flex-col gap-2">
          {t('address')}
          <div className="flex rounded-md border">
            <Input
              type="text"
              placeholder="Enter amount"
              readOnly
              disabled
              value={selectedWallet.address}
              className="border-none"
            />
            <Button
              variant="ghost"
              size="xs"
              className="h-10 gap-1 rounded-none"
              onClick={() => copyToClipboard(selectedWallet.address, t('addressCopied'))}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </Label>
        <Label className="flex flex-col gap-2">
          {t('token')}
          <Input type="text" placeholder="Enter amount" readOnly disabled value={selectedWallet.currency} />
        </Label>
        {selectedWallet.address && (
          <div className="flex justify-center">
            <QRCodeSVG value={selectedWallet.address} size={160} level="H" className="rounded border p-2" />
          </div>
        )}
      </div>
    </Modal>
  );
}
