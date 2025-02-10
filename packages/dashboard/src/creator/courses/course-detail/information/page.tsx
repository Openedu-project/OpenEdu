'use client';
import { fileResponseScheme } from '@oe/api/types/file';
import { z } from '@oe/api/utils/zod';
import { FormNestedWrapper } from '@oe/ui/components/form-wrapper';
import { useCourse } from '../_hooks/useCourse';
import { COURSE_DETAIL_FORM_IDS } from '../_utils/constants';
import Category from './category';
import Description from './description';
import Level from './level';
import Outcomes from './outcomes';
import PreviewVideos from './preview-videos';
import Referrence from './referrence';
import SupportChannels from './support-channels';
import Thumbnail from './thumbnail';

const courseFormSchema = z.object({
  description: z.string().min(20, { message: 'courses.formValidation.descriptionMin--minimum:20' }).max(1000, {
    message: 'courses.formValidation.descriptionMax--maximum:1000',
  }),
  thumbnail: fileResponseScheme,
  levels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: 'courses.formValidation.levelMin' }),

  categories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, { message: 'courses.formValidation.categoryMin' }),
  docs: z.array(fileResponseScheme).default([]).optional(),
  props: z.object({
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
    support_channel: z
      .object({
        channels: z.string().array().default([]).optional(),
      })
      .optional(),
    achievements: z.string().array().default([]).optional(),
  }),
  // preview_lessons: z
  //   .array(
  //     z.object({
  //       title: z.string(),
  //       content: z.string().default(""),
  //       order: z.number().default(0),
  //       content_type: z.string().default("video"),
  //       file_id: z.string().optional(),
  //       video: fileResponseScheme.optional(),
  //     })
  //   )
  //   .default([])
  //   .optional(),
  medias: z.array(fileResponseScheme).optional(),
});

export default function CourseDetailInformationPage() {
  const { course } = useCourse();

  return (
    <div className="scrollbar mx-auto h-full max-w-[900px] overflow-auto px-1 py-4">
      <FormNestedWrapper
        id={COURSE_DETAIL_FORM_IDS.information}
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
