import { useTranslations } from 'next-intl';
import { Spinner } from '#components/spinner';
import { Button } from '#shadcn/button';
import { Checkbox } from '#shadcn/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '#shadcn/dialog';

const ConfirmPledgeDialog = ({
  isOpen,
  onClose,
  isLoading,
  amount,
  currency,
  isTermsAccept,
  onTermsChange,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  amount: string;
  currency?: string;
  isTermsAccept: boolean;
  onTermsChange: (checked: boolean) => void;
  onConfirm: () => void;
}) => {
  const t = useTranslations('launchpadDetailPage.pledgePage.confirmDialog');
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!rounded-3xl gap-0 p-6" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <div className="relative text-black">
          {isLoading && <Spinner />}
          {t('desc1')}
          {amount} {currency}
          {t('desc2')}
          <ul className="mt-2 list-disc bg-slate-200 p-2 pl-5">
            <li>{t('desc3')}</li>
            <li>{t('desc4')}</li>
            <li>{t('desc5')}</li>
          </ul>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isTermsAccept}
                onCheckedChange={(checked: boolean) => onTermsChange(checked)}
                id="terms"
              />
              <label htmlFor="terms" className="cursor-pointer">
                {t('termsAccept')}
              </label>
            </div>
            {!isTermsAccept && isOpen && <p className="text-xs text-red-500">{t('tearmsWarning')}</p>}
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            {t('btnCancel')}
          </Button>
          <Button onClick={onConfirm} disabled={isLoading || !isTermsAccept}>
            {t('btnConfirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPledgeDialog;
