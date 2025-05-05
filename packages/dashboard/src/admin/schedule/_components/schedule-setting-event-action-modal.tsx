import { eventScheduleSchema } from '@oe/api';
import type { IEventScheduleSchema, IScheduleEvent } from '@oe/api';
import { FormFieldWithLabel, Input, Modal } from '@oe/ui';
import { Textarea } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { Suspense, useCallback } from 'react';
import { ScheduleSettingTimestampDatePicker } from './schedule-settings-date-time-picker';

interface IModalReject {
  data: IScheduleEvent | null;
  scheduleID: string;
  loading?: boolean;
  onSubmit: (value: IEventScheduleSchema) => void;
  onClose: () => void;
}

export function ScheduleSettingEventActionModal({ data, scheduleID, loading, onSubmit, onClose }: IModalReject) {
  const t = useTranslations('schedule.settings.event');

  const handleSubmit = useCallback(
    async (value: IEventScheduleSchema) => {
      await onSubmit?.(value);
    },
    [onSubmit]
  );

  return (
    <Modal
      open={true}
      title={data ? t('editEvent') : t('addEvent')}
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
          label: t('submit'),
          loading: loading,
          variant: 'default',
        },
      ]}
      validationSchema={eventScheduleSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        ...data,
        schedule_id: scheduleID,
      }}
    >
      {form => {
        const startDate = form.watch('start_at');

        return (
          <>
            <FormFieldWithLabel name="schedule_id" hidden>
              <Input hidden />
            </FormFieldWithLabel>
            <FormFieldWithLabel label={t('name')} name="name">
              <Input placeholder={t('name')} />
            </FormFieldWithLabel>

            <FormFieldWithLabel label={t('description')} name="description">
              <Textarea placeholder={t('description')} className="resize-none" />
            </FormFieldWithLabel>
            <FormFieldWithLabel
              name="start_at"
              label={t('startAt')}
              form={form}
              render={({ field }) => (
                <Suspense>
                  <ScheduleSettingTimestampDatePicker
                    value={field.value}
                    onChange={date => field.onChange(date)}
                    disabled={{ before: new Date() }}
                  />
                </Suspense>
              )}
            />
            <FormFieldWithLabel
              name="end_at"
              label={t('endAt')}
              form={form}
              render={({ field }) => (
                <Suspense>
                  <ScheduleSettingTimestampDatePicker
                    value={field.value}
                    onChange={date => field.onChange(date)}
                    disabled={{ before: new Date(startDate) }}
                  />
                </Suspense>
              )}
            />
            <FormFieldWithLabel label={t('location')} name="location">
              <Input placeholder={t('location')} />
            </FormFieldWithLabel>
            <FormFieldWithLabel label={t('joinLink')} name="join_link">
              <Input placeholder={t('joinLink')} />
            </FormFieldWithLabel>
            <FormFieldWithLabel label={t('eventType')} name="event_type">
              <Input placeholder={t('eventType')} />
            </FormFieldWithLabel>
          </>
        );
      }}
    </Modal>
  );
}
