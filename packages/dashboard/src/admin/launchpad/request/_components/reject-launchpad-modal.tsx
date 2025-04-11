import type { IRejectPayload } from '@oe/api';
import { type IRejectLaunchpadSchemaType, rejectLaunchpadSchema } from '@oe/api';
import { Modal } from '@oe/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui';
import { Textarea } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IDeleteCreatorModal {
  onSubmit: (value: IRejectPayload) => void;
  onClose: () => void;
}

export function RejectLaunchpadModal({ onSubmit, onClose }: IDeleteCreatorModal) {
  const t = useTranslations('adminLaunchpadRequest.rejectModal');

  const handleSubmit = useCallback(
    async (value: IRejectLaunchpadSchemaType) => {
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
          label: t('reject'),
          variant: 'destructive',
        },
      ]}
      validationSchema={rejectLaunchpadSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        note: '',
      }}
    >
      {form => (
        <>
          <p>{t('description')}</p>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('reason')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('placeholderReason')} {...field} />
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
