'use client';
import { type IStartFundingSchemaType, startFundingSchema } from '@oe/api/schemas/launchpadSchema';
import type { IStartFundingTimeLaunchpadPayload } from '@oe/api/types/admin-launchpad';
import { DateTimePicker } from '@oe/ui/components/date-time-picker';
import { Modal } from '@oe/ui/components/modal';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

interface ICreatorStartFundingLaunchpadModal {
  onSubmit: (value: IStartFundingTimeLaunchpadPayload) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CreatorStartFundingLaunchpadModal({
  onSubmit,
  onClose,
  isLoading,
}: ICreatorStartFundingLaunchpadModal) {
  const t = useTranslations('creatorLaunchpad.startFundingModal');

  const handleSubmit = useCallback(
    async (value: IStartFundingSchemaType) => {
      await onSubmit?.({
        funding_start_date: value.funding_start_date.getTime(),
      } as unknown as IStartFundingTimeLaunchpadPayload);
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
          label: t('confirm'),
          variant: 'default',
          loading: isLoading,
        },
      ]}
      validationSchema={startFundingSchema}
      onSubmit={handleSubmit}
    >
      {form => (
        <>
          <p>{t('description')}</p>

          <FormField
            control={form.control}
            name="funding_start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('startFundingDate')}</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={date => field.onChange(date)}
                    disabled={{ before: new Date() }}
                  />
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
