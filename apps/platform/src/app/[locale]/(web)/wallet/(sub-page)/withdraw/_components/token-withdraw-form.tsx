import { ASSET_TYPES, CHAIN, CURRENCY_SYMBOLS, WITHDRAW_STATE } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { Input } from '@oe/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useWithdrawForm } from '../../../_hooks/useWithdrawForm';
import { FORM_STYLES } from '../../../_utils/utils';
import { WithdrawDialog } from './withdraw-dialog';

const TokenWithdrawForm = () => {
  const router = useRouter();

  const {
    formData,
    error,
    isLoading,
    withdrawState,
    handleChange,
    handleSubmit,
    handleMaxAmount,
    handlePostWithdraw,
    setWithdrawState,
    getAvailableBalance,
  } = useWithdrawForm({
    type: ASSET_TYPES.CRYPTO,
    minAmount: 0.01,
  });

  const tWithdrawPage = useTranslations('withdrawPage');

  if (formData.type !== ASSET_TYPES.CRYPTO) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="network" className={FORM_STYLES.LABEL}>
          {tWithdrawPage('form.network')}
        </label>
        <Select
          name="network"
          onValueChange={value =>
            handleChange({
              target: { name: 'network', value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          value={formData.network}
        >
          <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CHAIN.NEAR}>Near</SelectItem>
            <SelectItem value={CHAIN.AVAIL}>Avail</SelectItem>
          </SelectContent>
        </Select>
        {error.network && <p className="text-red-500 text-sm">{error.network}</p>}
      </div>
      <div>
        <label htmlFor="address" className={FORM_STYLES.LABEL}>
          {tWithdrawPage('form.address')}
        </label>
        <Input
          name="address"
          placeholder={tWithdrawPage('form.enterWithdrawAddr')}
          className={FORM_STYLES.INPUT}
          value={formData.address}
          onChange={handleChange}
        />
        {error.address && <p className="text-red-500 text-sm">{error.address}</p>}
      </div>
      <div>
        <label htmlFor="token" className={FORM_STYLES.LABEL}>
          {tWithdrawPage('form.token')}
        </label>
        <Select
          name="token"
          onValueChange={value =>
            handleChange({
              target: { name: 'token', value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          value={formData.token}
        >
          <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
            <SelectValue placeholder={tWithdrawPage('form.selectToken')} />
          </SelectTrigger>
          <SelectContent>
            {formData.network === CHAIN.NEAR ? (
              <>
                <SelectItem value={CURRENCY_SYMBOLS.NEAR}>NEAR</SelectItem>
                <SelectItem value={CURRENCY_SYMBOLS.USDT}>USDT</SelectItem>
                <SelectItem value={CURRENCY_SYMBOLS.USDC}>USDC</SelectItem>
              </>
            ) : formData.network === CHAIN.AVAIL ? (
              <SelectItem value={CURRENCY_SYMBOLS.AVAIL}>AVAIL</SelectItem>
            ) : null}
          </SelectContent>
        </Select>
        {error.token && <p className="text-red-500 text-sm">{error.token}</p>}
      </div>
      {formData.token && (
        <div>
          <label htmlFor="amount" className={FORM_STYLES.LABEL}>
            {tWithdrawPage('form.amount')}
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              name="amount"
              placeholder={tWithdrawPage('form.enterAmount')}
              className={FORM_STYLES.INPUT}
              value={formData.amount}
              onChange={handleChange}
            />
            <Button
              onClick={handleMaxAmount}
              variant="default"
              className="h-full rounded-[8px] bg-[#F2F1FF] text-[#5055D7] shadow-none hover:text-white"
            >
              {tWithdrawPage('btn.max')}
            </Button>
          </div>
          <p className="font-normal text-[#5055D7] text-sm leading-5">
            {tWithdrawPage('form.available')}
            {getAvailableBalance()} {formData.token.toUpperCase()}
          </p>
          {error.amount && <p className="text-red-500 text-sm">{error.amount}</p>}
        </div>
      )}
      <Button onClick={handleSubmit} className="w-full bg-[#5055D7] font-semibold text-base text-white">
        {tWithdrawPage('btn.submit')}
      </Button>
      <WithdrawDialog
        state={withdrawState}
        setState={setWithdrawState}
        isLoading={isLoading}
        amount={formData.amount}
        currency={formData.token.toUpperCase()}
        address={formData.address}
        onSubmit={handlePostWithdraw}
        onClose={() => setWithdrawState(WITHDRAW_STATE.INIT)}
        onNavigate={router.push}
        type="crypto"
      />
    </div>
  );
};

export default TokenWithdrawForm;
