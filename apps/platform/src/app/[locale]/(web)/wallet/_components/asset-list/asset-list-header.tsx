import { Switch } from '@oe/ui/shadcn/switch';
import { useTranslations } from 'next-intl';
import { useWalletVisibilityStore } from '../../_store/useWalletVisibilityStore';

const HiddenSwitcher = () => {
  const { isHiddenZeroAmount } = useWalletVisibilityStore();
  const setIsHiddenZeroAmount = useWalletVisibilityStore(state => state.setIsHiddenZeroAmount);
  const t = useTranslations('walletPage');

  return (
    <div className="flex items-center gap-3">
      <Switch
        className="data-[state=checked]:bg-[#5055D7]"
        checked={isHiddenZeroAmount}
        onCheckedChange={setIsHiddenZeroAmount}
      />
      <p className="text-sm sm:text-base font-semibold">{t('hideAsset1usd')}</p>
    </div>
  );
};

const AssetListHeader = () => (
  <div className="flex items-start justify-between mb-6 gap-2">
    <HiddenSwitcher />
  </div>
);

export default AssetListHeader;
