'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type HTTPErrorMetadata,
  type IScheduleSchema,
  scheduleSchema,
  useGetOrganizationByDomain,
  useGetSchedules,
  usePostSchedule,
  usePutSchedule,
} from '@oe/api';
import { convertToTimeStamp } from '@oe/core';
import { Button, Form, FormFieldWithLabel, Input, Textarea, toast } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { Suspense, useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ScheduleSettingTimestampDatePicker } from './schedule-settings-date-time-picker';

export function ScheduleSettingForm({
  setScheduleID,
}: {
  setScheduleID: (id: string | undefined) => void;
}) {
  const t = useTranslations('schedule.settings.schedule');
  const tError = useTranslations('errors');

  const { organizationByDomain } = useGetOrganizationByDomain();
  const { dataSchedules } = useGetSchedules(organizationByDomain?.id as string);
  const { triggerPutSchedule, isLoadingPutSchedule } = usePutSchedule(dataSchedules?.[0]?.id as string);
  const { triggerPostSchedule, isLoadingPostSchedule } = usePostSchedule();
  const form = useForm<IScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: '',
      description: '',
      start_at: Date.now(),
      end_at: Date.now(),
    },
  });
  const { control } = form;

  const startDate = useWatch({ name: 'start_at', control });

  useEffect(() => {
    const currentSchedules = dataSchedules?.[0];

    if (currentSchedules) {
      setScheduleID(currentSchedules.id);
      form.setValue('name', currentSchedules?.name);
      form.setValue('description', currentSchedules?.description);
      form.setValue('start_at', currentSchedules?.start_at);
      form.setValue('end_at', currentSchedules?.end_at);
    }
  }, [dataSchedules, form, setScheduleID]);

  const onSubmit = useCallback(
    async (data: IScheduleSchema) => {
      try {
        if (dataSchedules?.[0]?.id) {
          await triggerPutSchedule({
            ...data,
            start_at: convertToTimeStamp(data.start_at as unknown as string) ?? 0,
            end_at: convertToTimeStamp(data.end_at as unknown as string) ?? 0,
          });
        } else {
          await triggerPostSchedule({
            ...data,
            start_at: convertToTimeStamp(data.start_at as unknown as string) ?? 0,
            end_at: convertToTimeStamp(data.end_at as unknown as string) ?? 0,
          });
        }
        toast.success(t('scheduleUpdateSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerPutSchedule, triggerPostSchedule, dataSchedules, tError, t]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 space-y-8">
        <div className="grid grid-cols-1 gap-4">
          <FormFieldWithLabel label={t('name')} name="name">
            <Input />
          </FormFieldWithLabel>
          <FormFieldWithLabel label={t('description')} name="description">
            <Textarea />
          </FormFieldWithLabel>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormFieldWithLabel
              name="start_at"
              label={t('startDate')}
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
              label={t('endDate')}
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
          </div>
          <Button
            className="w-[300px] justify-self-center"
            type="submit"
            loading={isLoadingPutSchedule || isLoadingPostSchedule}
          >
            {t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
