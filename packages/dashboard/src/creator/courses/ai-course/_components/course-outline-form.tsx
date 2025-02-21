'use client';
import { type ICreateAICourseOutline, courseOutlineSchema } from '@oe/api/schemas/courses/createCourseSchema';
import { createAICourseService } from '@oe/api/services/course';
import type { ICourse } from '@oe/api/types/course/course';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { getCookieClient } from '@oe/core/utils/cookie';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { useRouter } from '@oe/ui/common/navigation';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { InputNumber } from '@oe/ui/components/input-number';
import { SelectLanguage } from '@oe/ui/components/select-language';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { DurationField } from './form-field/duration-field';
import { CourseFormField } from './form-field/form-field';
import { LevelField } from './form-field/level-field';

export function CourseOutlineForm({
  className,
  course,
}: {
  className?: string;
  course: ICourse | null;
}) {
  const tAICourseForm = useTranslations('course.aiCourse');
  const tGeneral = useTranslations('general');

  const router = useRouter();

  const generating = useMemo(() => GENERATING_STATUS.includes(course?.ai_course?.general_info_status ?? ''), [course]);

  const defaultValues = useMemo(() => {
    const locale = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY) ?? 'en';

    if (course) {
      const { ai_course } = course;
      return {
        learner_info: ai_course?.learner_info ?? '',
        content_info: ai_course?.content_info ?? '',
        level_id: ai_course?.level_id ?? '',
        language: ai_course?.language ?? locale,
        duration: ai_course?.duration ?? 1,
        duration_type: ai_course?.duration_type ?? 'day',
        study_load: ai_course?.study_load ?? 1,
        material_file: ai_course?.material ? [ai_course?.material] : [],
      };
    }

    return {
      learner_info: '',
      content_info: '',
      level_id: '',
      language: locale,
      duration: 1,
      duration_type: 'day' as ICreateAICourseOutline['duration_type'],
      study_load: 1,
      material_file: [],
    };
  }, [course]);

  const onSubmit = async (data: ICreateAICourseOutline) => {
    const { material_file, ...base } = data;

    try {
      const res = await createAICourseService(undefined, {
        ...base,
        course_cuid: course?.ai_course?.course_cuid,
        material_id: material_file?.[0]?.id,
        current_step: 'learner_description_generate',
        type: 'learner_description',
      });
      router.push(
        buildUrl({
          endpoint: CREATOR_ROUTES.aiCourseDetail,
          params: { id: res.id },
        })
      );
    } catch {
      toast.error(tAICourseForm('aiCreateError'));
    }
  };

  return (
    <FormWrapper
      id="ai_course_outline_form"
      schema={courseOutlineSchema}
      className={className}
      useFormProps={{ defaultValues }}
      onSubmit={onSubmit}
    >
      {({ form }) => (
        <>
          <CourseFormField name="learner_info" label={tAICourseForm('learnerInfo')} required>
            <Textarea rows={8} className="scrollbar" />
          </CourseFormField>

          <CourseFormField name="content_info" label={tAICourseForm('courseContent')} required>
            <Textarea rows={8} className="scrollbar" />
          </CourseFormField>

          <CourseFormField
            name="material_file"
            label={tAICourseForm('materialContent')}
            render={({ field }) => {
              const { onChange, value } = field;

              return (
                <Uploader
                  value={Array.isArray(value) ? value : value ? [value] : undefined}
                  onChange={files => onChange(files)}
                  maxSizeBytes={50 * 1024 * 1024}
                  fileListVisible={false}
                  accept="application/pdf, application/vnd.ms-excel"
                />
              );
            }}
          />
          <LevelField />
          <CourseFormField name="language" label={tAICourseForm('language')}>
            <SelectLanguage />
          </CourseFormField>
          <DurationField form={form} />
          <CourseFormField name="study_load" label={tAICourseForm('studyLoad')} required>
            <InputNumber min={1} />
          </CourseFormField>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              disabled={!!course?.id || generating}
              onClick={() => {
                form.reset();
              }}
            >
              {tGeneral('reset')}
            </Button>
            <Button
              type="submit"
              disabled={!!course?.id || generating}
              loading={form.formState.isSubmitting || generating}
            >
              {form.formState.isSubmitting || generating ? tGeneral('generating') : tGeneral('generate')}
            </Button>
          </div>
        </>
      )}
    </FormWrapper>
  );
}
