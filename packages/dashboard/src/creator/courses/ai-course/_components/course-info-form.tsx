'use client';
import { createAICourseService } from '@oe/api';
import type { ICourse } from '@oe/api';
import type { IAICourseStatus } from '@oe/api';
import { type ICreateAICourseInfo, courseInfomationSchema } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import { toast } from '@oe/ui';
import { Button } from '@oe/ui';
import { FormWrapper } from '@oe/ui';
import { Input } from '@oe/ui';
import { Textarea } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useEditAICourseInfo } from '../_store';
import { CourseFormField } from './form-field/form-field';
import { ThumbnailField } from './form-field/thumbnail-field';

export function CourseInfoForm({
  className,
  course,
  handleSubmit,
}: {
  className?: string;
  course: ICourse;
  handleSubmit?: (status: IAICourseStatus) => void;
}) {
  const tAICourseForm = useTranslations('course.aiCourse');
  const tGeneral = useTranslations('general');
  const { courseInfo, setCourseInfo } = useEditAICourseInfo();

  const [buttonProps, setButtonProps] = useState<{
    loading: boolean;
    disabled: boolean;
  }>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const defaultValues = useMemo(() => {
    if (course && courseInfo?.courseId !== course.id) {
      setButtonProps({
        loading:
          GENERATING_STATUS.includes(course?.ai_generate_status ?? '') &&
          !GENERATING_STATUS.includes(course?.ai_course?.thumbnail_status ?? ''),
        disabled: course?.ai_generate_status !== 'waiting',
      });

      const { ai_course } = course;
      const initValue = {
        title: ai_course?.course_title ?? '',
        description: ai_course?.course_description ?? '',
        thumbnail_included:
          (ai_course?.thumbnail_generated?.length ?? 0) > 0 ||
          GENERATING_STATUS.includes(ai_course?.thumbnail_status ?? ''),
        thumbnail_id: ai_course?.thumbnail_id ?? '',
      };
      setCourseInfo({ ...initValue, courseId: course.id });
      return initValue;
    }

    return courseInfo;
  }, []);

  const onSubmit = async (data: ICreateAICourseInfo) => {
    const { thumbnail_id, thumbnail_included, ...requiredValues } = data;

    try {
      const res = await createAICourseService(undefined, {
        ...requiredValues,
        thumbnail_id: thumbnail_included ? thumbnail_id : undefined,
        current_step: 'outline_generate',
        type: 'learner_description',
        course_cuid: course?.ai_course?.course_cuid,
      });

      setButtonProps({ loading: false, disabled: true });

      if (res && res?.ai_course?.status === 'failed') {
        toast.error(tAICourseForm('aiCreateError'));
      }
      handleSubmit?.(res?.ai_course?.status ?? 'generating');
    } catch (error) {
      toast.error(tAICourseForm('aiCreateError'));
      console.error(error);
    }
  };

  return (
    <FormWrapper
      id="ai_course_info_form"
      schema={courseInfomationSchema}
      className={className}
      useFormProps={{ defaultValues }}
      onSubmit={onSubmit}
    >
      {({ form }) => (
        <>
          <CourseFormField
            name="title"
            label={tAICourseForm('title')}
            required
            render={({ field }) => (
              <Input
                {...field}
                onChange={e => {
                  const val = e.target.value;
                  field.onChange(val);
                  setCourseInfo({ ...courseInfo, title: val });
                }}
              />
            )}
          />

          <CourseFormField
            name="description"
            label={tAICourseForm('description')}
            required
            render={({ field }) => (
              <Textarea
                className="scrollbar"
                rows={10}
                {...field}
                onChange={e => {
                  const val = e.target.value;
                  field.onChange(val);
                  setCourseInfo({ ...courseInfo, description: val });
                }}
              />
            )}
          />

          <ThumbnailField courseData={course} form={form} setSubmitButtonProps={setButtonProps} />

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              disabled={buttonProps?.disabled}
              loading={form.formState.isSubmitting || buttonProps?.loading}
            >
              {form.formState.isSubmitting || buttonProps?.loading ? tGeneral('generating') : tGeneral('generate')}
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
