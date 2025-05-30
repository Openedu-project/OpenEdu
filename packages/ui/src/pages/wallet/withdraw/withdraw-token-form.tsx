import { useWallet } from '@oe/api/hooks/useWallet';
import { type ICryptoWithdrawPayload, cryptoWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import { tokenSubmitWithdrawService } from '@oe/api/services/wallet';
import type { HTTPError } from '@oe/api/utils/http-error';
import { CURRENCY_SYMBOLS, NETWORK_OPTIONS, TOKEN_OPTIONS } from '@oe/api/utils/wallet';
import { formatCurrency } from '@oe/core/utils/currency';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { InputNumber } from '#components/input-number';
import { Modal } from '#components/modal';
import { Selectbox } from '#components/selectbox';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';

export const calculateAvailableBalance = (token: string, balance: string): string => {
  let availableBalance = Number.parseFloat(balance);

  if (token.toLowerCase() === CURRENCY_SYMBOLS.NEAR.toLowerCase()) {
    availableBalance = Math.max(0, availableBalance - 0.05);
  } else if (token.toLowerCase() === CURRENCY_SYMBOLS.AVAIL.toLowerCase()) {
    availableBalance = Math.max(0, availableBalance - 0.13);
  }

  return availableBalance.toFixed(5);
};

export const WithdrawTokenForm = () => {
  const { wallets, mutateWallets } = useWallet();
  const t = useTranslations('wallets');
  const tError = useTranslations('errors');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostWithdrawToken = useCallback(
    async (form: UseFormReturn<ICryptoWithdrawPayload>) => {
      setIsLoading(true);
      try {
        const data = form.getValues();
        const allWallets = [...(wallets ?? [])];

        const walletId = allWallets?.find(wallet => wallet.network.toLowerCase() === data.network.toLowerCase())?.id;
        if (!walletId) {
          toast.error(t('form.error.invalidWallet'));
          return;
        }
        await tokenSubmitWithdrawService(null, walletId, {
          payload: {
            ...data,
            network: data.network.toLowerCase(),
            currency: data.token,
            is_mainnet: process.env.NODE_ENV !== 'development',
          },
        });
        await mutateWallets();
        toast.success(t('withdrawPage.form.tokenSuccess'));
        form.reset();
        setIsLoading(false);
      } catch (error) {
        toast.error(tError((error as HTTPError).message));
        setIsLoading(false);
      }
      setIsOpen(false);
    },
    [t, tError, wallets, mutateWallets]
  );

  return (
    <FormWrapper id="withdraw-token" schema={cryptoWithdrawSchema} onSubmit={() => setIsOpen(true)}>
      {({ form }) => {
        const { watch } = form;
        const network = watch('network');
        const tokenOptions = TOKEN_OPTIONS[network] ?? [];
        const currentWallet = wallets?.find(wallet => wallet.network.toLowerCase() === network.toLowerCase());

        const availableBalance = calculateAvailableBalance(currentWallet?.network ?? '', currentWallet?.balance ?? '0');

        return (
          <>
            <FormFieldWithLabel
              name="network"
              label={t('withdrawPage.form.network')}
              render={({ field }) => (
                <Selectbox
                  value={field.value}
                  onChange={value => {
                    field.onChange(value);
                    form.setValue('token', '');
                    form.setValue('amount', '');
                  }}
                  options={NETWORK_OPTIONS}
                />
              )}
            />
            <FormFieldWithLabel
              name="token"
              label={t('withdrawPage.form.token')}
              render={({ field }) => (
                <Selectbox
                  value={field.value}
                  onChange={value => {
                    field.onChange(value);
                    form.setValue('amount', '');
                  }}
                  options={tokenOptions}
                />
              )}
            />
            <FormFieldWithLabel name="to_address" label={t('withdrawPage.form.address')}>
              <Input placeholder={t('withdrawPage.form.enterWithdrawAddr')} />
            </FormFieldWithLabel>
            <div className="flex flex-col gap-2">
              <FormFieldWithLabel
                name="amount"
                label={t('withdrawPage.form.amount')}
                render={({ field }) => (
                  <div className="relative flex w-full items-center rounded-md border border-input">
                    <InputNumber
                      {...field}
                      placeholder={t('withdrawPage.form.enterAmount')}
                      className="w-full border-none focus-visible:ring-0"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="mcaption-semibold12 mr-[2px] h-9 bg-muted text-primary uppercase hover:text-primary"
                      onClick={() => field.onChange(availableBalance)}
                    >
                      {t('withdrawPage.button.max')}
                    </Button>
                  </div>
                )}
              />
              <p className="text-muted-foreground text-sm">
                {t('withdrawPage.form.available')}
                {availableBalance}
              </p>
            </div>
            <Button type="submit" className="w-full">
              {t('withdrawPage.button.submit')}
            </Button>
            <Modal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              title={t('withdrawPage.modal.cryptoTitle')}
              description={t('withdrawPage.modal.cryptoDesc', {
                amount: formatCurrency(Number(watch('amount')), {
                  showSymbol: false,
                }),
                token: watch('token'),
              })}
              buttons={[
                {
                  label: t('withdrawPage.button.cancel'),
                  type: 'button',
                  onClick: handleClose => handleClose?.(),
                  variant: 'outline',
                },
                {
                  label: t('withdrawPage.button.confirm'),
                  type: 'button',
                  loading: isLoading,
                  onClick: () => handlePostWithdrawToken(form),
                },
              ]}
            />
          </>
        );
      }}
    </FormWrapper>
  );
};
