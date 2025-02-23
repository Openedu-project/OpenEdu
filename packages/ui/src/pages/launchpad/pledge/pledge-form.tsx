'use client';

import { pledgeLaunchpadSchema } from '@oe/api/schemas/launchpadSchema';
import type { IWallet } from '@oe/api/types/wallet';
import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '#common/navigation';
import { FormWrapper } from '#components/form-wrapper';
import { InputNumber } from '#components/input-number';
import { Spinner } from '#components/spinner';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';
import { cn } from '#utils/cn';
import { formatCurrency } from '#utils/format-currency';
import ConfirmPledgeDialog from './confirm-pledge-dialog';
import DepositModal from './deposit-modal';
import SuccessDialog from './success-pledge-dialog';
import usePledgeForm from './usePledgeForm';

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
    setIsSuccess,
    handleSubmit,
    handleConfirmSubmit,
  } = usePledgeForm(launchpadId, walletInvest, tokenInvestBalance);
  const t = useTranslations('launchpadDetailPage.pledgePage.form');
  return (
    <div className="relative w-full space-y-3 rounded-2xl bg-white p-6 shadow-[0px_4px_30px_0px_#F4F5F6] lg:w-[60%]">
      <FormWrapper id="pledge" schema={pledgeLaunchpadSchema}>
        {({ loading, form }) => {
          return (
            <>
              {isLoading && <Spinner />}
              <FormFieldWithLabel
                name="amount"
                label={t('amount')}
                render={({ field }) => (
                  <div>
                    <div className="rounded-md border border-input">
                      <InputNumber
                        id={field.name}
                        {...field}
                        className="w-full border-none focus-visible:ring-0"
                        placeholder={t('minAmount')}
                        min={1}
                      />
                    </div>
                  </div>
                )}
              />

              <div>
                <span className="font-medium text-sm">{t('paymentMethod')}</span>
                <div className="mt-1 mb-2 flex items-center gap-1 text-sm">
                  <CircleAlert className="h-4 w-4" />
                  <span>{t('paymentMethodDesc')}</span>
                </div>
                <div
                  className={cn(
                    'flex w-full items-center justify-between gap-1 rounded-md border px-3 py-4 text-sm',
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
