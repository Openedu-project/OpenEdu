import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '#shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '#shadcn/dialog';
import { Input } from '#shadcn/input';
import { Label } from '#shadcn/label';
import { copyToClipboard } from '#utils/copy';

export function DepositDialog({
  network,
  address,
  currency,
}: {
  network: string;
  address: string;
  currency: string;
}) {
  const t = useTranslations('wallets');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t('deposit')}</Button>
      </DialogTrigger>
      <DialogContent className="!rounded-3xl gap-0 p-6">
        <DialogHeader>
          <DialogTitle className="mb-4">{t('deposit')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label className="flex flex-col gap-2">
            {t('network')}
            <Input type="text" readOnly disabled value={network} className="uppercase" />
          </Label>
          <Label className="flex flex-col gap-2">
            {t('address')}
            <div className="flex rounded-md border">
              <Input type="text" readOnly disabled value={address} className="border-none" />
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
            <Input type="text" readOnly disabled value={currency} />
          </Label>
          {address && (
            <div className="flex justify-center">
              <QRCodeSVG value={address} size={160} level="H" className="rounded border p-2" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
