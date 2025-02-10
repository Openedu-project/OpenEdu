'use client';

import { useGetBankAccounts, useWallet } from '@oe/api/hooks/useWallet';
import { type IFiatWithdrawPayload, fiatWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import { fiatSubmitWithdrawService } from '@oe/api/services/wallet';
import type { HTTPError } from '@oe/api/utils/http-error';
import { FIAT_CURRENCIES } from '@oe/api/utils/wallet';
import { findLocaleFromCurrency, formatCurrency } from '@oe/core/utils/currency';
import { WALLET_ROUTES } from '@oe/core/utils/routes';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { InputCurrency } from '#components/input-currency';
import { Modal } from '#components/modal';
import { Selectbox } from '#components/selectbox';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';

export const WithdrawFiatForm = () => {
  const t = useTranslations('wallets');
  const tError = useTranslations('errors');
  const { wallets, mutateWallets } = useWallet();
  const { bankAccounts } = useGetBankAccounts({
    type: 'bank_account',
    page: 1,
    per_page: 9999999,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handlePostWithdrawFiat = async (form: UseFormReturn<IFiatWithdrawPayload>) => {
    try {
      const data = form.getValues();
      const walletId = wallets?.find(wallet => wallet.currency === data.currency)?.id;
      if (!walletId) {
        toast.error(t('form.error.invalidWallet'));
        return;
      }
      await fiatSubmitWithdrawService(null, walletId, {
        payload: data,
      });
      await mutateWallets();
      toast.success(t('wallets.withdrawPage.form.requestSuccess'));
      form.reset();
    } catch (error) {
      toast.error(tError((error as HTTPError).message));
    }
    setIsOpen(false);
  };
  return (
    <FormWrapper id="withdraw-fiat" schema={fiatWithdrawSchema} onSubmit={() => setIsOpen(true)}>
      {({ form }) => {
        const { watch } = form;
        const currency = watch('currency');
        const locale = findLocaleFromCurrency(currency);
        const availableBalance = Number(wallets?.find(wallet => wallet.currency === currency)?.balance || '0');

        form.setValue('availableBalance', availableBalance);

        return (
          <>
            <FormFieldWithLabel
              name="currency"
              label={t('currency.title')}
              fieldType="select"
              render={({ field }) => (
                <Selectbox
                  value={field.value}
                  onChange={value => {
                    field.onChange(value);
                    form.setValue('amount', '');
                    // form.setValue("availableBalance", availableBalance);
                  }}
                  options={Object.values(FIAT_CURRENCIES).map(currency => ({
                    label: currency.value,
                    value: currency.value,
                    id: currency.value,
                  }))}
                />
              )}
            />
            <div className="space-y-3">
              <FormFieldWithLabel
                name="bank_account_id"
                label={t('withdrawPage.form.bankAccount')}
                render={({ field }) => (
                  <Selectbox
                    value={field.value}
                    onChange={value => {
                      field.onChange(value);
                      form.setValue('amount', '');
                      // form.setValue("availableBalance", availableBalance);
                    }}
                    placeholder={t('withdrawPage.form.selectBankAccount')}
                    options={
                      bankAccounts?.results?.map(bankAccount => ({
                        label: `${bankAccount.value.bank_name} - ${bankAccount.value.account_number}`,
                        value: bankAccount.id,
                        id: bankAccount.id,
                      })) ?? []
                    }
                    displayValue={value => {
                      const bankAccount = bankAccounts?.results?.find(bankAccount => bankAccount.id === value);
                      return `${bankAccount?.value.bank_name} - ${bankAccount?.value.account_number}`;
                    }}
                  />
                )}
              />
              <Link href={`${WALLET_ROUTES.bankAccounts}`} className="mcaption-semibold14 h-auto p-0">
                {t('withdrawPage.button.addNewBankAccount')}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <FormFieldWithLabel
                name="amount"
                label={t('withdrawPage.form.amount')}
                render={({ field }) => (
                  <div className="relative flex w-full items-center rounded-md border border-input">
                    <InputCurrency
                      id={field.name}
                      {...field}
                      className="w-full border-none focus-visible:ring-0"
                      placeholder={t('withdrawPage.form.enterAmount')}
                      decimalsLimit={0}
                      allowNegativeValue={false}
                      locale={locale}
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
              <FormFieldWithLabel
                name="availableBalance"
                className="hidden"
                render={({ field }) => (
                  <InputCurrency
                    id={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full border-none focus-visible:ring-0"
                    decimalsLimit={0}
                    allowNegativeValue={false}
                    locale={locale}
                  />
                )}
              />
              <p className="text-muted-foreground text-sm">
                {t('withdrawPage.form.available')}
                {formatCurrency(availableBalance, { currency })}
              </p>
            </div>
            <Button type="submit" className="w-full">
              {t('withdrawPage.button.submit')}
            </Button>
            <Modal
              title={t('withdrawPage.modal.fiatTitle')}
              description={t('withdrawPage.modal.fiatDesc', {
                amount: formatCurrency(Number(watch('amount'))),
              })}
              open={isOpen}
              onClose={() => setIsOpen(false)}
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
                  onClick: () => handlePostWithdrawFiat(form),
                },
              ]}
            />
          </>
        );
      }}
    </FormWrapper>
  );
};
