import { z } from '#utils/zod';

export const scheduleSchema = z
  .object({
    name: z
      .string({ message: 'schedule.settings.schedule.errors.nameRequired' })
      .min(1, { message: 'schedule.settings.schedule.errors.nameRequired' }),
    description: z
      .string({ message: 'schedule.settings.schedule.errors.descriptionRequired' })
      .min(1, { message: 'schedule.settings.schedule.errors.descriptionRequired' }),
    start_at: z.number({
      errorMap: () => ({ message: 'schedule.settings.schedule.errors.startDateInvalid' }),
    }),
    end_at: z.number({
      errorMap: () => ({ message: 'schedule.settings.schedule.errors.endDateInvalid' }),
    }),
  })
  .refine(data => data.end_at > data.start_at, {
    message: 'schedule.settings.schedule.errors.endDateMustBeAfterStartDate',
    path: ['end_at'],
  });
export type IScheduleSchema = z.infer<typeof scheduleSchema>;

export const eventScheduleSchema = z
  .object({
    name: z
      .string({ message: 'schedule.settings.event.errors.nameRequired' })
      .min(1, { message: 'schedule.settings.event.errors.nameRequired' }),
    description: z
      .string({ message: 'schedule.settings.event.errors.descriptionRequired' })
      .min(1, { message: 'schedule.settings.event.errors.descriptionRequired' }),
    start_at: z.number({
      errorMap: () => ({ message: 'schedule.settings.event.errors.startDateInvalid' }),
    }),
    end_at: z.number({
      errorMap: () => ({ message: 'schedule.settings.event.errors.endDateInvalid' }),
    }),
    location: z
      .string({ message: 'schedule.settings.event.errors.locationRequired' })
      .min(1, { message: 'schedule.settings.event.errors.locationRequired' }),
    join_link: z
      .string({ message: 'schedule.settings.event.errors.joinLinkRequired' })
      .url({ message: 'schedule.settings.event.errors.joinLinkInvalid' }),
    event_type: z
      .string({ message: 'schedule.settings.event.errors.eventTypeRequired' })
      .min(1, { message: 'schedule.settings.event.errors.eventTypeRequired' }),
    schedule_id: z.string({ message: 'schedule.settings.event.errors.scheduleIdRequired' }),
  })
  .refine(data => data.end_at > data.start_at, {
    message: 'schedule.settings.event.errors.endDateMustBeAfterStartDate',
    path: ['end_at'],
  });

export type IEventScheduleSchema = z.infer<typeof eventScheduleSchema>;
