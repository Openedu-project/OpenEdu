import { useRouter } from '@oe/ui/common/navigation';
import type React from 'react';
import { memo } from 'react';

import { ASSET_TYPES, CURRENCY_SYMBOLS, WITHDRAW_STATE } from '@oe/api/utils/wallet';
import { InputCurrency } from '@oe/ui/components/input-currency';
import { Button } from '@oe/ui/shadcn/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { useTranslations } from 'next-intl';
import { useWithdrawForm } from '../../../_hooks/useWithdrawForm';
import { FORM_STYLES } from '../../../_utils/utils';
import BankAccountSelect from './bank-accounts-select';
import { WithdrawDialog } from './withdraw-dialog';

const FiatWithdrawForm = memo(() => {
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
  } = useWithdrawForm({ type: ASSET_TYPES.FIAT, minAmount: 20000 });

  const tWithdrawPage = useTranslations('withdrawPage');

  const router = useRouter();

  if (formData.type !== ASSET_TYPES.FIAT) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className={FORM_STYLES.LABEL} htmlFor="fiatType">
          {tWithdrawPage('form.fiatType')}
        </label>
        <Select
          name="fiatType"
          onValueChange={value =>
            handleChange({
              target: { name: 'fiatType', value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          defaultValue={formData.fiatType}
        >
          <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
            <SelectValue placeholder={tWithdrawPage('form.selectFiatType')} defaultValue={CURRENCY_SYMBOLS.VND} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CURRENCY_SYMBOLS.VND}>VND</SelectItem>
          </SelectContent>
        </Select>
        {error.fiatType && <p className="text-red-500 text-sm">{error.fiatType}</p>}
      </div>

      <BankAccountSelect formData={formData} handleChange={handleChange} error={error} />

      <div className="space-y-3">
        <label className={FORM_STYLES.LABEL} htmlFor="fiatAmount">
          {tWithdrawPage('form.amount')}
        </label>
        <div className="flex items-center gap-1">
          <div className="flex-grow">
            <InputCurrency
              name="fiatAmount"
              placeholder={tWithdrawPage('form.enterAmount')}
              className={FORM_STYLES.INPUT}
              value={formData.amount ? Number(formData.amount) : undefined}
              onChange={value =>
                handleChange({
                  target: { name: 'amount', value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </div>

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
          {formatVNDCurrency('vnd', Number(getAvailableBalance()))}
        </p>
        {error.amount && <p className="text-red-500 text-sm">{error.amount}</p>}
      </div>

      <Button onClick={handleSubmit} className="w-full bg-[#5055D7] font-semibold text-base text-white">
        {tWithdrawPage('btn.submit')}
      </Button>

      <WithdrawDialog
        state={withdrawState}
        setState={setWithdrawState}
        isLoading={isLoading}
        amount={formData.amount}
        currency={formData.fiatType}
        onSubmit={handlePostWithdraw}
        onClose={() => setWithdrawState(WITHDRAW_STATE.INIT)}
        onNavigate={router.push}
        type="fiat"
      />
    </div>
  );
});

FiatWithdrawForm.displayName = 'FiatWithdrawForm';

export default FiatWithdrawForm;
