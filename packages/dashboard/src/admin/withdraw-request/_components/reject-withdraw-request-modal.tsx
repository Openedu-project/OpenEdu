import type { IApproval, IRejectPayload } from '@oe/api';
import { type IRejectWithdrawType, rejectWithdrawSchema } from '@oe/api';
import type { IBankAccountSettingValue, IBankWithdrawalAccount } from '@oe/api';
import type { IWalletItem } from '@oe/api';
import { Modal } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { Input } from '@oe/ui';
import { Textarea } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IFormAffiliateCampaignCourseModal {
  data: IApproval<IWalletItem, IBankAccountSettingValue<IBankWithdrawalAccount>> | null;
  onClose: () => void;
  onSubmit: (value: IRejectPayload) => void;
}

export function RejectWithdrawModal({ data, onSubmit, onClose }: IFormAffiliateCampaignCourseModal) {
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
