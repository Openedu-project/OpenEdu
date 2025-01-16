'use client';
import { useGetCourseById } from '@oe/api/hooks/useCourse';
import { fileResponseScheme } from '@oe/api/types/file';
import { z } from '@oe/api/utils/zod';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import { useParams } from 'next/navigation';
import Category from './category';
import Description from './description';
import Level from './level';
import Outcomes from './outcomes';
import PreviewVideos from './preview-videos';
import Referrence from './referrence';
import SupportChannels from './support-channels';
import Thumbnail from './thumbnail';

const courseFormSchema = z.object({
  // name: z
  //   .string()
  //   .min(2, { message: "Name must be at least 2 characters long" })
  //   .max(100, { message: "Name must not exceed 100 characters" }),
  description: z.string().min(1, { message: 'Description is required' }),
  thumbnail: fileResponseScheme,
  // thumbnail_id: z.string().default("").optional(),
  // is_pay: z.boolean().default(false),
  // price: z
  //   .number()
  //   .nonnegative()
  //   .gte(0)
  //   ,
  // discount_price: z.number().nonnegative().gte(0).optional(),
  // currency: z.enum(['VND']).default('VND'),
  levels: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'Level ID is required' }),
        name: z.string().min(1, { message: 'Level name is required' }),
      })
    )
    .min(1, { message: 'Vui lòng chọn ít nhất 1 level' }),

  categories: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'Category ID is required' }),
        name: z.string().min(1, { message: 'Category name is required' }),
      })
    )
    .min(1, { message: 'Vui lòng chọn ít nhất 1 category' }),
  channels: z.string().array().default([]).optional(),
  // has_certificate: z.boolean().default(false),
  docs: z
    .array(
      z.object({
        id: z.string().min(1, { message: 'Doc ID is required' }),
      })
    )
    .default([]),
  achievements: z.string().array().default([]).optional(),
  // mark_as_completed: z.boolean().default(false),
  preview_lessons: z
    .array(
      z.object({
        title: z.string(),
        content: z.string().default(''),
        order: z.number().default(0),
        content_type: z.string().default('video'),
        file_id: z.string().optional(),
        video: fileResponseScheme.optional(),
      })
    )
    .default([])
    .optional(),
  medias: z.array(z.object({ id: z.string().min(1, { message: 'Video id is required' }) })).optional(),
  // price_settings: z.object({
  //   is_pay: z.boolean().default(false),
  //   fiat_currency: z.string().default("VND"),
  //   fiat_price: z.string().default("0"),
  //   fiat_discount_price: z.string().default("0"),
  //   crypto_payment_enabled: z.boolean().default(false),
  //   crypto_currency: z.string().default("USDT"),
  //   crypto_price: z.string().default("0"),
  //   crypto_discount_price: z.string().default("0"),
  // }),
});

export default function CourseDetailInformationPage() {
  const params = useParams<{ courseId: string }>();
  const { course } = useGetCourseById(params.courseId);

  return (
    <div className="scrollbar mx-auto h-full max-w-[900px] overflow-auto">
      <FormNestedWrapper
        id="course-detail-information"
        schema={courseFormSchema}
        tabId="information"
        useFormProps={{
          defaultValues: course as z.infer<typeof courseFormSchema>,
        }}
      >
        <Description />
        <Outcomes />
        <Thumbnail />
        <PreviewVideos />
        <Referrence />
        <Category />
        <Level />
        <SupportChannels />
      </FormNestedWrapper>
    </div>
  );
}
