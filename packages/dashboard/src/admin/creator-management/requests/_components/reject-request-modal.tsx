import { type IRejectCreatorSchemaType, rejectCreatorSchema } from '@oe/api/schemas/creators';
import type { IRejectFormRegisterCreatorPayload } from '@oe/api/types/form';
import { Modal } from '@oe/ui/components/modal';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface IModalReject {
  onSubmit: (value: IRejectFormRegisterCreatorPayload) => void;
  onClose: () => void;
}

export default function RejectCreatorModal({ onSubmit, onClose }: IModalReject) {
  const t = useTranslations('creatorManagement.rejectCreatorModal');

  const handleSubmit = useCallback(
    async (value: IRejectCreatorSchemaType) => {
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
      validationSchema={rejectCreatorSchema}
      onSubmit={handleSubmit}
    >
      {form => (
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('reason')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('placeReason')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Modal>
  );
}
