import { useWallet } from '@oe/api/hooks/useWallet';
import { type ICryptoWithdrawPayload, cryptoWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import { tokenSubmitWithdrawService } from '@oe/api/services/wallet';
import type { HTTPError } from '@oe/api/utils/http-error';
import { NETWORK_OPTIONS, TOKEN_OPTIONS } from '@oe/api/utils/wallet';
import { formatCurrency } from '@oe/core/utils/currency';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { InputNumber } from '#components/input-number';
import { Modal } from '#components/modal';
import { Selectbox } from '#components/selectbox';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { Input } from '#shadcn/input';

export const WithdrawTokenForm = () => {
  const { wallets, mutateWallets } = useWallet();
  const t = useTranslations('wallets');
  const tError = useTranslations('errors');
  const [isOpen, setIsOpen] = useState(false);

  const handlePostWithdrawToken = async (form: UseFormReturn<ICryptoWithdrawPayload>) => {
    try {
      const data = form.getValues();
      const walletId = wallets?.find(wallet => wallet.network === data.network)?.id;
      if (!walletId) {
        toast.error(t('form.error.invalidWallet'));
        return;
      }
      await tokenSubmitWithdrawService(null, walletId, {
        payload: {
          ...data,
          is_mainnet: process.env.NODE_ENV !== 'development',
        },
      });
      await mutateWallets();
      toast.success(t('wallets.withdrawPage.form.success'));
      form.reset();
    } catch (error) {
      toast.error(tError((error as HTTPError).message));
    }
    setIsOpen(false);
  };

  return (
    <FormWrapper id="withdraw-token" schema={cryptoWithdrawSchema} onSubmit={() => setIsOpen(true)}>
      {({ form }) => {
        const { watch } = form;
        const network = watch('network');
        const tokenOptions = TOKEN_OPTIONS[network] ?? [];
        const availableBalance = Number(wallets?.find(wallet => wallet.network === network)?.balance || '0');
        return (
          <>
            <FormFieldWithLabel
              name="network"
              label={t('withdrawPage.form.network')}
              fieldType="select"
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
              fieldType="select"
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
                {formatCurrency(availableBalance, { showSymbol: false })}
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
