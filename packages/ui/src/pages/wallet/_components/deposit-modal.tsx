import type { IWallet } from '@oe/api';
import { ArrowDown, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { copyToClipboard } from '#utils/copy';

export function DepositModal({ network, address, currency }: IWallet) {
  const t = useTranslations('wallets');

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
          <Input type="text" placeholder="Enter amount" readOnly disabled value={network} />
        </Label>
        <Label className="flex flex-col gap-2">
          {t('address')}
          <div className="flex rounded-md border">
            <Input type="text" placeholder="Enter amount" readOnly disabled value={address} className="border-none" />
            <Button
              variant="ghost"
              size="xs"
              className="h-10 gap-1 rounded-none"
              onClick={() => copyToClipboard(address, t('addressCopied'))}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </Label>
        <Label className="flex flex-col gap-2">
          {t('token')}
          <Input type="text" placeholder="Enter amount" readOnly disabled value={currency} />
        </Label>
        {address && (
          <div className="flex justify-center">
            <QRCodeSVG value={address} size={160} level="H" className="rounded border p-2" />
          </div>
        )}
      </div>
    </Modal>
  );
}
