import { isAfter } from 'date-fns';
import { z } from '#utils/zod';

export const couponSchema = z
  .object({
    name: z.string().min(1, 'coupon.errors.isRequired'),
    coupon_code: z.string().min(1, 'coupon.errors.isRequired'),
    type: z.enum(['flat', 'percent'], {
      errorMap() {
        return { message: 'coupon.errors.isRequired' };
      },
    }),
    method: z.string().min(1, 'coupon.errors.isRequired'),
    start_date: z.date({
      required_error: 'coupon.errors.isRequiredStartDate',
      invalid_type_error: 'coupon.errors.isValidStartDate',
    }),
    has_end_date: z.boolean(),
    end_date: z
      .date({
        required_error: 'coupon.errors.isRequiredEndDate',
        invalid_type_error: 'coupon.errors.isValidEndDate',
      })
      .optional(),
    description: z.string().optional(),
    allow_courses: z.array(z.string()).min(1, 'coupon.errors.selectOneCourse'),
    fiat_discount_percentage: z
      .union([z.string(), z.number()])
      .optional()
      .transform(val => (val === '' ? undefined : val))
      .refine(val => val === undefined || (!Number.isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
        message: 'coupon.errors.inRange0to100',
      }),
    fiat_discount_enabled: z.boolean(),
    crypto_discount_enabled: z.boolean(),
    crypto_discount_percentage: z
      .union([z.string(), z.number()])
      .optional()
      .transform(val => (val === '' ? undefined : val))
      .refine(val => val === undefined || (!Number.isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
        message: 'coupon.errors.inRange0to100',
      }),
    maximum_total_usage: z
      .union([z.string(), z.number()])
      .optional()
      .transform(val => (val === '' ? undefined : val))
      .refine(val => val === undefined || !Number.isNaN(Number(val)), { message: 'coupon.errors.isValidNumber' })
      .refine(val => val === undefined || Number(val) <= Number.MAX_SAFE_INTEGER, {
        message: 'coupon.errors.numberTooLarge',
      }),
    allow_teams: z.array(z.string()).optional(),
    is_active: z.boolean(),
  })
  .refine(
    data => {
      if (data.has_end_date) {
        return !!data.end_date;
      }
      return true;
    },
    {
      message: 'coupon.errors.isRequiredEndDate',
      path: ['end_date'],
    }
  )
  .refine(
    data => {
      if (data.has_end_date && data.end_date && data.start_date) {
        return isAfter(new Date(data.end_date), new Date(data.start_date));
      }
      return true;
    },
    {
      message: 'coupon.errors.startEndDate',
      path: ['end_date'],
    }
  )
  .refine(
    data => {
      if (data.fiat_discount_enabled) {
        return data.fiat_discount_percentage !== undefined;
      }
      return true;
    },
    {
      message: 'coupon.errors.isRequired',
      path: ['fiat_discount_percentage'],
    }
  )
  .refine(
    data => {
      if (data.crypto_discount_enabled) {
        return data.crypto_discount_percentage !== undefined;
      }
      return true;
    },
    {
      message: 'coupon.errors.isRequired',
      path: ['crypto_discount_percentage'],
    }
  )
  .refine(
    data => {
      // At least one payment method must be enabled
      return data.fiat_discount_enabled || data.crypto_discount_enabled;
    },
    {
      message: 'coupon.errors.selectOnePaymentMethod',
      path: ['fiat_discount_enabled'],
    }
  );

export type ICouponType = z.infer<typeof couponSchema>;
