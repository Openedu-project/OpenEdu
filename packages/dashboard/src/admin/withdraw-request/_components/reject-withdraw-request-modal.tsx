import { type IRejectWithdrawType, rejectWithdrawSchema } from '@oe/api/schemas/withdrawSchema';
import type { IApproval, IRejectPayload } from '@oe/api/types/approvals';
import type { IBankAccount, IBankAccountSettingValue } from '@oe/api/types/bank-account';
import type { IWalletItem } from '@oe/api/types/wallet';
import { Modal } from '@oe/ui/components/modal';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IFormAffiliateCampaignCourseModal {
  data: IApproval<IWalletItem, IBankAccountSettingValue<IBankAccount>> | null;
  onClose: () => void;
  onSubmit: (value: IRejectPayload) => void;
}

export default function RejectWithdrawModal({ data, onSubmit, onClose }: IFormAffiliateCampaignCourseModal) {
  const t = useTranslations('rejectWithdrawModal');

  const handleSubmit = useCallback(
    async (value: IRejectWithdrawType) => {
      await onSubmit?.(value);
    },
    [onSubmit]
  );

  return (
    <Modal
      open={true}
      title={t('title')}
      onClose={onClose}
      buttons={[
        {
          type: 'button',
          label: t('cancel'),
          variant: 'outline',
          onClick: () => onClose(),
        },
        {
          type: 'submit',
          label: t('save'),
          variant: 'default',
        },
      ]}
      validationSchema={rejectWithdrawSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        value: data?.request_value,
        note: '',
      }}
    >
      {form => (
        <>
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('note')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('placeholderNote')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </Modal>
  );
}
