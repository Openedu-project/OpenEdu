import { fiatWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import { ASSET_TYPES, CURRENCY_SYMBOLS, type TCurrencySymbol, WITHDRAW_STATE } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { useRouter } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { InputCurrency } from '#components/input-currency';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { formatVNDCurrency } from '#utils/format-currency';
import { FORM_STYLES } from '#utils/wallet';
import { useWithdrawForm } from '../hooks/useWithdrawForm';
import BankAccountSelect from './bank-accounts-select';
import FiatTypeSelect from './fiat-type-select';
import { WithdrawDialog } from './withdraw-dialog';

const FiatWithdrawForm = () => {
  const router = useRouter();
  const t = useTranslations('withdrawPage');
  const { isLoading, withdrawState, setWithdrawState, handlePostWithdraw, getAvailableBalance, isLoadingAssets } =
    useWithdrawForm({
      type: ASSET_TYPES.FIAT,
      minAmount: 20000,
    });

  return (
    <FormWrapper
      id="withdraw-fiat"
      schema={fiatWithdrawSchema}
      onSubmit={handlePostWithdraw}
      useFormProps={{
        defaultValues: {
          fiatType: CURRENCY_SYMBOLS.VND,
          bankAccount: '',
          amount: '',
          note: '',
        },
        mode: 'onChange',
      }}
    >
      {({ form }) => {
        const fiatType = form.watch('fiatType') as TCurrencySymbol;
        const availableBalance = fiatType ? getAvailableBalance(fiatType) : '0';

        return (
          <div className="space-y-4">
            <FormFieldWithLabel
              name="fiatType"
              label={t('form.fiatType')}
              required
              render={({ field }) => (
                <FiatTypeSelect
                  value={field.value}
                  onChange={(value: string) => {
                    field.onChange(value as TCurrencySymbol);
                    form.setValue('amount', '');
                  }}
                />
              )}
            />

            <FormFieldWithLabel
              name="bankAccount"
              label={t('form.bankAccount')}
              required
              render={({ field }) => (
                <BankAccountSelect value={field.value} onChange={field.onChange} disabled={isLoadingAssets} />
              )}
            />

            {fiatType && (
              <>
                <FormFieldWithLabel
                  name="amount"
                  label={t('form.amount')}
                  required
                  render={({ field }) => (
                    <div className="relative">
                      <InputCurrency
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        onChange={(value: string | undefined) => {
                          field.onChange(value || '');
                        }}
                        className={FORM_STYLES.INPUT}
                        placeholder={t('form.enterAmount')}
                        disabled={isLoadingAssets}
                        decimalsLimit={0}
                        allowNegativeValue={false}
                        hasCurrency={false}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => field.onChange(availableBalance)}
                        disabled={isLoadingAssets}
                      >
                        MAX
                      </Button>
                    </div>
                  )}
                />
                <p className="text-sm text-gray-500">
                  {t('form.available')}
                  {formatVNDCurrency(fiatType, Number(availableBalance))}
                </p>
              </>
            )}

            <Button
              type="button"
              disabled={isLoading || isLoadingAssets}
              className="w-full bg-[#5055D7] font-semibold text-base text-white"
              onClick={() => {
                form.trigger().then(isValid => {
                  if (isValid) {
                    setWithdrawState(WITHDRAW_STATE.SUBMIT);
                  }
                });
              }}
            >
              {t('btn.submit')}
            </Button>

            <WithdrawDialog
              state={withdrawState}
              setState={setWithdrawState}
              isLoading={isLoading}
              amount={form.getValues('amount')}
              currency={fiatType?.toUpperCase()}
              onSubmit={() => {
                // Chỉ gọi handlePostWithdraw khi ở trạng thái SUBMIT
                if (withdrawState === WITHDRAW_STATE.SUBMIT) {
                  handlePostWithdraw(form.getValues());
                }
              }}
              onClose={() => {
                setWithdrawState(WITHDRAW_STATE.INIT);
                // Reset form nếu đã submit thành công
                if (withdrawState === WITHDRAW_STATE.SUCCESS) {
                  form.reset();
                }
              }}
              onNavigate={router.push}
              type={ASSET_TYPES.FIAT}
            />
          </div>
        );
      }}
    </FormWrapper>
  );
};

export default FiatWithdrawForm;
