import { type IPledgeLaunchpadSchema, pledgeLaunchpadSchema } from '@oe/api/schemas/launchpadSchema';
import { postPledgeLaunchpadService } from '@oe/api/services/launchpad';
import type { IWallet } from '@oe/api/types/wallet';
import { z } from '@oe/api/utils/zod';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

const usePledgeForm = (launchpadId: string, walletInvest?: IWallet, tokenInvestBalance?: number) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    form: UseFormReturn<IPledgeLaunchpadSchema> | null;
    amount: string;
  }>({ form: null, amount: '' });
  const [isTermsAccept, setIsTermsAccept] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [amountError, setAmountError] = useState<string | null>(null);

  const handleSubmit = async (form: UseFormReturn<IPledgeLaunchpadSchema>) => {
    try {
      const values = form.getValues();
      const validatedData = await pledgeLaunchpadSchema.parseAsync(values);
      const numericAmount = Number(validatedData.amount);

      // Clear any previous errors
      setAmountError(null);

      // Check balance after schema validation
      if (tokenInvestBalance !== undefined && numericAmount > tokenInvestBalance) {
        setAmountError('launchpadDetailPage.pledgePage.form.error.exceedBalance');
        return;
      }

      setFormData({ form, amount: validatedData.amount });
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const err of error.errors) {
          if (err.path) {
            form.setError(err.path[0] as keyof IPledgeLaunchpadSchema, {
              type: 'manual',
              message: err.message,
            });
          }
        }
      }
    }
  };

  const handleConfirmSubmit = async () => {
    if (!(formData.form && walletInvest)) {
      return;
    }

    setIsLoading(true);
    try {
      await postPledgeLaunchpadService({
        launchpad_id: launchpadId,
        wallet_id: walletInvest.id,
        amount: Number(formData.amount),
      });
      setIsSuccess(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting pledge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};

export default usePledgeForm;
