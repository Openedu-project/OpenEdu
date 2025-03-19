'use client';

import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { type IPriceSettings, priceSettingsSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { updateCourseService } from '@oe/api/services/course';
import type { ICourse } from '@oe/api/types/course/course';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Skeleton } from '@oe/ui/shadcn/skeleton';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import PriceForm from './price-form';

function PriceSettingsForm() {
  const tCourse = useTranslations('course');
  const { courseId } = useParams<{ courseId: string }>();
  const { course, courseLoading, mutateCourse } = useGetCourseById(courseId);

  const handleSubmit = async (data: IPriceSettings) => {
    if (!course) {
      return;
    }
    await updateCourseService(undefined, {
      ...course,
      price_settings: data,
      thumbnail_id: course?.thumbnail?.id,
    } as ICourse);
    await mutateCourse();
    toast.success(
      tCourse('common.toast.updateSuccess', {
        item: tCourse('common.courseTitle'),
      })
    );
  };

  if (courseLoading) {
    return (
      <div className="mx-auto h-full max-w-[900px] px-1 py-4">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto h-full max-w-[900px] px-1 py-4">
      <FormWrapper
        id="price-settings"
        schema={priceSettingsSchema}
        onSubmit={handleSubmit}
        onError={() => {
          toast.error(
            tCourse('common.toast.updateError', {
              item: tCourse('common.courseTitle'),
            })
          );
        }}
        useFormProps={{
          defaultValues: {
            is_pay: false,
            fiat_currency: 'USD',
            fiat_discount_price: '0',
            fiat_price: '0',
            crypto_payment_enabled: false,
            crypto_currency: 'NEAR',
            crypto_discount_price: '0',
            crypto_price: '0',
            ...course?.price_settings,
            fiat_unit_cost: (
              Number(course?.price_settings?.fiat_price ?? '0') +
              Number(course?.price_settings?.fiat_discount_price ?? '0')
            ).toString(),
            crypto_unit_cost: (
              Number(course?.price_settings?.crypto_price ?? '0') +
              Number(course?.price_settings?.crypto_discount_price ?? '0')
            ).toString(),
          },
        }}
        className="flex h-full flex-col gap-4 space-y-0 rounded-lg bg-background"
      >
        {({ loading }) => <PriceForm loading={loading} />}
      </FormWrapper>
    </div>
  );
}

export default PriceSettingsForm;
