'use client';

import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { Uploader } from '@oe/ui/components/uploader';
import { Textarea } from '@oe/ui/shadcn/textarea';
import { useTranslations } from 'next-intl';
import { courseOutlineSchema } from './ai-schema';
import { CourseFormField } from './form-field/form-field';
import { LevelField } from './form-field/level-field';

export function CourseOutlineForm() {
  const tAICourseForm = useTranslations('courses.aiCourse');

  return (
    <FormWrapper id="ai_course_outline_form" schema={courseOutlineSchema} resetOnSuccess>
      {() => (
        <>
          <CourseFormField name="learner_info" label={tAICourseForm('learnerInfo')} required>
            <Textarea rows={8} />
          </CourseFormField>

          <CourseFormField name="content_info" label={tAICourseForm('courseContent')} required>
            <Textarea rows={8} />
          </CourseFormField>

          <CourseFormField
            name="material_file"
            label={tAICourseForm('materialContent')}
            render={({ field }) => (
              <Uploader
                value={field.value ? [field.value] : []}
                onChange={files => field.onChange(files[0])}
                maxSizeBytes={50 * 1024 * 1024}
                fileListVisible={false}
                accept="application/pdf, application/vnd.ms-excel"
              />
            )}
          />
          <LevelField />
        </>
      )}
    </FormWrapper>
  );
}
