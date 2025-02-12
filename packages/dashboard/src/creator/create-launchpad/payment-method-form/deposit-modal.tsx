import { usePostInitPool } from '@oe/api/hooks/useLaunchpad';
import { useNFTTotalAssets, useWallet } from '@oe/api/hooks/useWallet';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { ASSET_TYPES, CHAIN } from '@oe/api/utils/wallet';
import { Button } from '@oe/ui/shadcn/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@oe/ui/shadcn/dialog';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import useLaunchpadDetail from '../_hooks/useLaunchpadDetail';
import NoticeBlock from '../notice-block';

const DepositModal = () => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad');
  const tModal = useTranslations('creatorSettingLaunchpad.paymentMethod.depositModalDialog');
  const tError = useTranslations('errors');

  const { wallets } = useWallet();
  const { tokenBalances: data } = useNFTTotalAssets();

  const nearWallet = useMemo(
    () => wallets?.find(w => w.type === ASSET_TYPES.CRYPTO && w.network === CHAIN.NEAR),
    [wallets]
  );

  const { mutateAdminLaunchpadDetail, launchpad } = useLaunchpadDetail();

  const { triggerPostInitPool, isLoadingPostInitPool } = usePostInitPool(
    launchpad?.id as string,
    nearWallet?.id as string
  );

  const handleInitPool = useCallback(async () => {
    try {
      await triggerPostInitPool();
      toast.success(tModal('toast.success'));
    } catch (error) {
      console.error('Deposit Near to Launchpad Error', error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    } finally {
      mutateAdminLaunchpadDetail();
    }
  }, [triggerPostInitPool, mutateAdminLaunchpadDetail, tModal, tError]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="text-primary underline">
          {tLaunchpad('paymentMethod.deposit')}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit">
        <DialogHeader>
          <DialogTitle>{tModal('title')}</DialogTitle>
          <NoticeBlock content={<div className="text-center">{tLaunchpad('paymentMethod.depositAlert')}</div>} />
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="w-full">
            <h2 className="font-semibold text-base">{tModal('network')}</h2>
            <span className="flex items-center space-x-2 rounded-lg border border-neutral-100 p-4 text-neutral-900">
              <p className="uppercase">{CHAIN.NEAR ?? ''}</p>
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-base">{tModal('amount')}</h2>
            <span className="flex items-center space-x-2 rounded-lg border border-neutral-100 p-4 text-neutral-900">
              <p>{data?.near?.balance ?? 0}</p>
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleInitPool} loading={isLoadingPostInitPool}>
            {tModal('submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
