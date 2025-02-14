'use client';

import { pledgeLaunchpadSchema } from '@oe/api/schemas/launchpadSchema';
import type { IWallet } from '@oe/api/types/wallet';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { FieldError, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form';
import { useRouter } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { InputCurrency } from '#components/input-currency';
import { Spinner } from '#components/spinner';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { cn } from '#utils/cn';
import { formatCurrency } from '#utils/format-currency';
import ConfirmPledgeDialog from './confirm-pledge-dialog';
import DepositModal from './deposit-modal';
import SuccessDialog from './success-pledge-dialog';
import usePledgeForm from './usePledgeForm';

const FormError = ({
  message,
}: {
  message: string | null | FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}) => {
  const t = useTranslations();
  if (message === null) {
    return null;
  }
  // Convert the message to string and then translate
  const errorMessage = typeof message === 'string' ? message : message.message;
  return <p className="mt-1 gap-2 text-sm text-red-500">{t(errorMessage)}</p>;
};

const PledgeForm = ({
  launchpadId,
  walletInvest,
  tokenInvestBalance,
}: {
  launchpadId: string;
  walletInvest?: IWallet;
  tokenInvestBalance?: number;
}) => {
  const router = useRouter();
  const {
    isModalOpen,
    setIsModalOpen,
    isLoading,
    formData,
    isTermsAccept,
    setIsTermsAccept,
    isSuccess,
    amountError,
    setIsSuccess,
    handleSubmit,
    handleConfirmSubmit,
  } = usePledgeForm(launchpadId, walletInvest, tokenInvestBalance);
  const t = useTranslations('launchpadDetailPage.pledgePage.form');
  return (
    <div className="relative w-full space-y-3 rounded-2xl bg-white p-6 shadow-[0px_4px_30px_0px_#F4F5F6] lg:w-[60%]">
      <FormWrapper id="pledge" schema={pledgeLaunchpadSchema}>
        {({ loading, form }) => {
          const { errors } = form.formState;
          return (
            <>
              {isLoading && <Spinner />}
              <FormFieldWithLabel
                name="amount"
                label={t('amount')}
                render={({ field }) => (
                  <div>
                    <div className="border border-input rounded-md">
                      <InputCurrency
                        id={field.name}
                        {...field}
                        className="w-full border-none focus-visible:ring-0"
                        placeholder={t('minAmount')}
                        decimalsLimit={1}
                        allowNegativeValue={false}
                      />
                    </div>
                    {(errors.amount?.message || amountError) && (
                      <FormError message={errors.amount?.message || amountError} />
                    )}
                  </div>
                )}
              />

              <div>
                <span className="font-medium text-sm">{t('paymentMethod')}</span>
                <div className="flex items-center gap-1 mt-1 mb-2 text-sm">
                  <CircleAlert className="h-4 w-4" />
                  <span>{t('paymentMethodDesc')}</span>
                </div>
                <div
                  className={cn(
                    'flex items-center justify-between w-full gap-1 px-3 py-4 text-sm rounded-md border',
                    tokenInvestBalance === 0 ? 'border-red-500 bg-red-500/10' : 'border-primary bg-primary/10'
                  )}
                >
                  <div>
                    <p className="font-semibold">OpenEdu Wallet</p>
                    {tokenInvestBalance === 0 && (
                      <p className="text-xs">
                        {t('walletNotice1')}
                        {walletInvest?.currency}
                        {t('walletNotice2')}
                      </p>
                    )}
                  </div>
                  {tokenInvestBalance === 0 && walletInvest ? (
                    <DepositModal
                      network={walletInvest.network}
                      address={walletInvest.address}
                      currency={walletInvest.currency}
                    />
                  ) : (
                    <p>
                      {formatCurrency(tokenInvestBalance, 'en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      <span className="pl-1">{walletInvest?.currency}</span>
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={loading || (tokenInvestBalance !== undefined && tokenInvestBalance < 5)}
                onClick={() => form.handleSubmit(() => handleSubmit(form))()}
              >
                {t('btnProcess')}
              </Button>
            </>
          );
        }}
      </FormWrapper>
      <ConfirmPledgeDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        amount={formData.amount}
        currency={walletInvest?.currency}
        isTermsAccept={isTermsAccept}
        onTermsChange={setIsTermsAccept}
        onConfirm={handleConfirmSubmit}
      />

      <SuccessDialog
        isOpen={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          router.refresh();
        }}
        launchpadId={launchpadId}
      />
    </div>
  );
};

export default PledgeForm;
