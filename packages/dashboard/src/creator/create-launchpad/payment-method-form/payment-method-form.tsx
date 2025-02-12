import { useNFTTotalAssets } from '@oe/api/hooks/useWallet';
import { CREATE_LAUNCHPAD_FORM_ID } from '@oe/core/utils/constants';
import { formatNumber } from '@oe/core/utils/utils';
import { Link } from '@oe/ui/common/navigation';
import { CircleAlert, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useLaunchpadDetail from '../_hooks/useLaunchpadDetail';
import NoticeBlock from '../notice-block';
import DepositModal from './deposit-modal';

const PaymentMethodBlock = () => {
  const tLaunchpad = useTranslations('creatorSettingLaunchpad.paymentMethod');
  const { tokenBalances: data } = useNFTTotalAssets();
  const { launchpad } = useLaunchpadDetail();

  const isHavePool = launchpad?.props.pool_id !== '';

  return launchpad ? (
    <div className="mx-auto flex max-w-5xl flex-col gap-spacing-m rounded-lg bg-white px-6 py-5">
      <div id={CREATE_LAUNCHPAD_FORM_ID.paymentMethod ?? ''} className="grid w-full gap-[10px]">
        <h1 className="col-span-1 font-semibold text-xl">{tLaunchpad('title')}</h1>
        <span className="flex items-center space-x-2">
          <CircleAlert size={16} />
          <p>{tLaunchpad('subTitle')}</p>
        </span>

        <Link href="/wallet" target="_blank" className="!no-underline w-full p-0 text-base">
          <div className="!p-4 flex w-full items-center justify-between rounded-lg border border-primary-600 bg-primary-20 text-neutral-900 ">
            <p className="font-semibold">{tLaunchpad('openEduWallet')}</p>
            <p>{formatNumber(data?.tokens?.USDT?.balance ?? 0)} USDT</p>
          </div>
        </Link>

        <div>
          <h2 className="font-semibold text-base">{tLaunchpad('verifyEmail')} *</h2>
          <span className="flex items-center space-x-2 rounded-lg border border-neutral-100 bg-neutral-20 p-4 text-neutral-900">
            <Mail size={18} />
            <p>{launchpad?.owner?.email}</p>
          </span>
        </div>

        {isHavePool ? (
          <div>
            <h2 className="font-semibold text-base">{tLaunchpad('fee')} *</h2>
            <div className="w-full rounded-xl border border-positive-600 bg-positive-50 p-4 text-center">
              {tLaunchpad('depositSuccess')}
            </div>
          </div>
        ) : (
          <div>
            <NoticeBlock
              title={tLaunchpad('fee')}
              content={
                <div className="text-center">
                  {tLaunchpad.rich('depositModal', {
                    modal: () => <DepositModal />, // Wrap in function to satisfy type
                    amount: 1,
                  })}
                </div>
              }
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
};

PaymentMethodBlock.displayName = 'PaymentMethodBlock';

export default PaymentMethodBlock;
