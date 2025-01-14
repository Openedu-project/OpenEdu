import { cryptoWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import { TOKEN_OPTIONS } from '@oe/api/types/wallet';
import {
  ASSET_TYPES,
  CHAIN,
  CURRENCY_SYMBOLS,
  type TChain,
  type TCurrencySymbol,
  WITHDRAW_STATE,
} from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { useRouter } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { InputCurrency } from '#components/input-currency';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#shadcn/select';
import { formatVNDCurrency } from '#utils/format-currency';
import { FORM_STYLES } from '#utils/wallet';
import { useWithdrawForm } from '../hooks/useWithdrawForm';
import { WithdrawDialog } from './withdraw-dialog';

const TokenWithdrawForm = () => {
  const router = useRouter();
  const t = useTranslations('withdrawPage');
  const { isLoading, withdrawState, setWithdrawState, handlePostWithdraw, getAvailableBalance, isLoadingAssets } =
    useWithdrawForm({
      type: ASSET_TYPES.CRYPTO,
      minAmount: 0.01,
    });

  return (
    <FormWrapper
      id="withdraw-crypto"
      schema={cryptoWithdrawSchema}
      onSubmit={handlePostWithdraw}
      useFormProps={{
        defaultValues: {
          network: CHAIN.NEAR,
          address: '',
          token: CURRENCY_SYMBOLS.NEAR,
          amount: '',
          note: '',
        },
        mode: 'onChange',
      }}
    >
      {({ form }) => {
        const network = form.watch('network');
        const token = form.watch('token');
        const availableBalance = token ? getAvailableBalance(token, network) : '0';

        const tokenOptions = network ? TOKEN_OPTIONS[network] : [];

        return (
          <div className="space-y-4">
            <FormFieldWithLabel
              name="network"
              label={t('form.network')}
              required
              render={({ field }) => (
                <Select
                  onValueChange={(value: TChain) => {
                    field.onChange(value);
                    // Set default token for selected network
                    const defaultToken = TOKEN_OPTIONS[value]?.[0]?.value;
                    if (defaultToken) {
                      form.setValue('token', defaultToken);
                    } else {
                      form.setValue('token', '' as TCurrencySymbol);
                    }
                    form.setValue('amount', '');
                  }}
                  value={field.value}
                  disabled={isLoadingAssets}
                >
                  <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
                    <SelectValue placeholder={t('form.selectNetwork')} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CHAIN).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {network && (
              <FormFieldWithLabel
                name="token"
                label={t('form.token')}
                required
                render={({ field }) => (
                  <Select
                    onValueChange={(value: TCurrencySymbol) => {
                      field.onChange(value);
                      form.setValue('amount', '');
                    }}
                    value={field.value}
                    disabled={isLoadingAssets || tokenOptions.length === 0}
                  >
                    <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
                      <SelectValue placeholder={t('form.selectToken')} />
                    </SelectTrigger>
                    <SelectContent>
                      {tokenOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            <FormFieldWithLabel
              name="address"
              label={t('form.address')}
              required
              render={({ field }) => (
                <Input
                  {...field}
                  className={FORM_STYLES.INPUT}
                  placeholder={t('form.enterWithdrawAddr')}
                  disabled={isLoadingAssets}
                />
              )}
            />

            {token && (
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
                        className="-translate-y-1/2 absolute top-1/2 right-2"
                        onClick={() => field.onChange(availableBalance)}
                        disabled={isLoadingAssets}
                      >
                        MAX
                      </Button>
                    </div>
                  )}
                />
                <p className="text-gray-500 text-sm">
                  {t('form.available')}
                  {formatVNDCurrency('token', Number(availableBalance))}
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
              currency={form.getValues('token')?.toUpperCase()}
              address={form.getValues('address')} // chỉ cần cho TokenWithdrawForm
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
              type={ASSET_TYPES.CRYPTO}
            />
          </div>
        );
      }}
    </FormWrapper>
  );
};

export default TokenWithdrawForm;
