import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCourses } from '@oe/api/hooks/useCourse';
import { useGetMe } from '@oe/api/hooks/useMe';
import { useGetListUser } from '@oe/api/hooks/useUser';
import type { ICouponItem, ICouponPayload } from '@oe/api/types/coupon';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { Switch } from '@oe/ui/shadcn/switch';
import { PercentCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { Suspense, useCallback, useEffect, useMemo } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';

import { type ICouponType, couponSchema } from '@oe/api/schemas/couponSchema';

import { AutocompeteMultiple } from '@oe/ui/components/autocomplete';
import { DateTimePicker } from '@oe/ui/components/date-time-picker';
import { InputCurrency } from '@oe/ui/components/input-currency';
import { Button } from '@oe/ui/shadcn/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { Label } from '@oe/ui/shadcn/label';
import { Textarea } from '@oe/ui/shadcn/textarea';

interface CouponDialogProps {
  isCreate?: boolean;
  orgId: string;
  onSubmit: (value: ICouponPayload) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
  data?: ICouponItem | null;
}

const FORM_ID = 'coupon-dialog-form';
const MAX_LENGTH_COUPON = 15;
const DEFAULT_PER_PAGE = 999_999;
const DEFAULT_USER_PER_PAGE = 9999;

const REGEX_DISCOUNT = /^\d*\.?\d*$/;

export default function CouponDialog({
  onSubmit,
  onClose,
  loading = false,
  isCreate = true,
  data,
  orgId,
}: CouponDialogProps) {
  const t = useTranslations('coupon');
  const tCouponForm = useTranslations('coupon.couponForm');
  // const locale = useLocale();
  const { dataMe } = useGetMe();
  const { dataListCourses: dataCoursesPublish } = useGetCourses({
    params: {
      page: 1,
      per_page: DEFAULT_PER_PAGE,
      user_id: dataMe?.id ?? '',
      is_pay: true,
      latest: true,
      preloads: 'Published',
    },
  });
  const { users } = useGetListUser({
    page: 1,
    per_page: DEFAULT_USER_PER_PAGE,
    sort: 'create_at desc',
  });

  const form = useForm<ICouponType>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      name: '',
      coupon_code: '',
      type: 'percent',
      method: 'coupon',
      start_date: undefined,
      end_date: undefined,
      has_end_date: false,
      description: '',
      allow_courses: [],
      // discount_amount: undefined,
      fiat_discount_enabled: true,
      fiat_discount_percentage: undefined,
      crypto_discount_enabled: false,
      crypto_discount_percentage: undefined,
      is_active: true,
      maximum_total_usage: 1,
      allow_teams: [],
    },
  });

  const { reset, handleSubmit, control } = form;

  const hasEndDate = useWatch({ name: 'has_end_date', control });
  const startDate = useWatch({ name: 'start_date', control });

  const dataCourses = useMemo(
    () =>
      dataCoursesPublish?.results?.map(item => ({
        label: item.name,
        value: item.cuid,
      })) ?? [],
    [dataCoursesPublish?.results]
  );

  const dataUser = useMemo(
    () =>
      users?.results?.map(item => ({
        label: item.email,
        value: item.id ?? '',
      })) ?? [],
    [users?.results]
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    const formData: ICouponType = {
      ...data,
      type: data.type as 'flat' | 'percent',
      start_date: data.start_date ? new Date(data.start_date) : new Date(),
      has_end_date: !!data.end_date,
      end_date: data.end_date ? new Date(data.end_date) : undefined,
      allow_courses: data.allow_courses ?? [],
      is_active: data.is_active,
      fiat_discount_enabled: data.fiat_discount_enabled,
      fiat_discount_percentage: data.fiat_discount_percentage ? Number(data.fiat_discount_percentage) : undefined,
      crypto_discount_enabled: data.crypto_discount_enabled,
      crypto_discount_percentage: data.crypto_discount_percentage ? Number(data.crypto_discount_percentage) : undefined,
      maximum_total_usage: data.maximum_total_usage ? Number(data.maximum_total_usage) : undefined,
      allow_teams: data.allow_teams ?? [],
    };

    reset(formData);
  }, [data, reset]);

  const handleFormSubmit = useCallback(
    async (values: ICouponType) => {
      const submissionValue = {
        ...data,
        ...values,
        org_id: orgId,
        start_date: values.start_date.getTime(),
        end_date: values.has_end_date && values.end_date ? values.end_date.getTime() : undefined,
        fiat_discount_enabled: values.fiat_discount_enabled,
        fiat_discount_percentage: Number(values.fiat_discount_percentage),
        crypto_discount_enabled: values.crypto_discount_enabled,
        crypto_discount_percentage: Number(values.crypto_discount_percentage),
        maximum_total_usage: Number(values.maximum_total_usage),
        allow_teams: values.allow_teams,
      };

      await onSubmit(submissionValue as ICouponPayload);
    },
    [data, onSubmit, orgId]
  );

  const handleDiscountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<ICouponType>) => {
      if (!REGEX_DISCOUNT.test(e.target.value)) {
        return;
      }

      if (e.target.value === '') {
        field.onChange('0');
        return;
      }

      const value = Number.parseFloat(e.target.value);
      if (!Number.isNaN(value) && value <= 100) {
        field.onChange(value.toString());
      }
    },
    []
  );

  const handleCouponCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<ICouponType>) => {
      const sanitizedValue = e.target.value.replace(/[^\dA-Za-z]/g, '');
      field.onChange(sanitizedValue.toUpperCase());
    },
    []
  );

  const renderForm = () => (
    <Form {...form}>
      <form id={FORM_ID} onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCouponForm('name')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={tCouponForm('placeholderName')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="coupon_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCouponForm('couponCode')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={tCouponForm('placeholderCouponCode')}
                  maxLength={MAX_LENGTH_COUPON}
                  onChange={e => handleCouponCodeChange(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCouponForm('description')}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={tCouponForm('placeholderDesc')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{tCouponForm('startDate')}</FormLabel>
                <Suspense>
                  <DateTimePicker value={field.value} onChange={date => field.onChange(date)} />
                </Suspense>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="has_end_date"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} className="!mt-0" />
                </FormControl>
                <FormLabel className="!mt-0">{tCouponForm('setEndDate')}</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasEndDate && (
            <FormField
              control={control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{tCouponForm('endDate')}</FormLabel>
                  <Suspense>
                    <DateTimePicker
                      value={field.value}
                      onChange={date => field.onChange(date)}
                      disabled={{ before: startDate }}
                    />
                  </Suspense>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={control}
          name="maximum_total_usage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCouponForm('maximumTotalUsage')}</FormLabel>
              <FormControl>
                <InputCurrency
                  {...field}
                  value={
                    field.value === undefined || field.value === '' ? 0 : Number.parseFloat(field.value.toString())
                  }
                  onChange={value => field.onChange(value)}
                  hasCurrency={false}
                  placeholder={tCouponForm('placeholderMaximumTotalUsage')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="allow_courses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCouponForm('applicableCourse')}</FormLabel>
              <FormControl>
                {/* <AutocompeteMultiple options={dataCourses} value={field.value} onChange={field.onChange} /> */}
                <Suspense>
                  <AutocompeteMultiple
                    options={dataCourses}
                    value={field.value.map(
                      courseId =>
                        dataCourses.find(course => course.value === courseId) ?? {
                          label: courseId,
                          value: courseId,
                        }
                    )}
                    onChange={selected => field.onChange(selected.map(item => item.value))}
                  />
                </Suspense>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="allow_teams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tCouponForm('allowedUsers')}</FormLabel>
              <FormControl>
                <Suspense>
                  <AutocompeteMultiple
                    options={dataUser}
                    value={field?.value?.map(
                      useId =>
                        dataUser.find(user => user.value === useId) ?? {
                          label: useId,
                          value: useId,
                        }
                    )}
                    onChange={selected => field.onChange(selected.map(item => item.value))}
                  />
                </Suspense>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="block">
          <h3 className="font-semibold text-lg">{tCouponForm('paymentMethodSettings')}</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-8 space-y-4">
              <FormField
                control={control}
                name="fiat_discount_enabled"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <Label className="font-medium text-base">{tCouponForm('fiatCurrency')}</Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="fiat_discount_percentage"
                render={({ field }) => (
                  <FormItem className="!mt-0 w-1/2 space-y-0">
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          min={0}
                          max={100}
                          value={field.value === undefined ? '' : field.value}
                          placeholder={tCouponForm('placeholderDiscountPercent')}
                          className="pr-10"
                          onChange={e => handleDiscountChange(e, field)}
                        />
                        <div className="-translate-y-1/2 absolute top-1/2 right-3">
                          <PercentCircle className="h-5 w-5 stroke-1 text-gray-500" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between gap-8 space-y-4">
              <FormField
                control={control}
                name="crypto_discount_enabled"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <Label className="font-medium text-base">{tCouponForm('cryptoCurrency')}</Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="crypto_discount_percentage"
                render={({ field }) => (
                  <FormItem className="!mt-0 w-1/2 space-y-0">
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          min={0}
                          max={100}
                          value={field.value === undefined ? '' : field.value}
                          placeholder={tCouponForm('placeholderDiscountPercent')}
                          className="pr-10"
                          onChange={e => handleDiscountChange(e, field)}
                        />
                        <div className="-translate-y-1/2 absolute top-1/2 right-3">
                          <PercentCircle className="h-5 w-5 stroke-1 text-gray-500" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <FormField
          control={control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div>
                <FormLabel className="text-base">{tCouponForm('available')}</FormLabel>
                <p className="text-muted-foreground text-sm">{tCouponForm('availableDescription')}</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isCreate ? t('createACouponForm') : t('editACouponForm')}</DialogTitle>
        </DialogHeader>

        {renderForm()}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            {t('cancel')}
          </Button>
          <Button type="submit" form={FORM_ID} disabled={loading}>
            {isCreate ? t('create') : t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
