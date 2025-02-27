'use client';
import { type ILessonSchema, lessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import type { ISegment } from '@oe/api/types/course/segment';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { useEffect, useState } from 'react';
import { useLessonActions } from '../../_hooks/useLessonActions';
import { useOutlineStore } from '../../_store/useOutlineStore';
import { COURSE_DETAIL_FORM_IDS } from '../../_utils/constants';
import { LessonContents } from './lesson-contents';
import { LessonHeader } from './lesson-header';
import LessonValidateModal from './lesson-validate-modal';

export default function LessonPage() {
  const { activeLesson, lessonId, handleUpdateLesson } = useLessonActions();
  const { setActiveLessonContent } = useOutlineStore();
  const [hasErrors, setHasErrors] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (lessonId && activeLesson?.id) {
      setActiveLessonContent(activeLesson.contents?.[0] ?? null);
    }
  }, [lessonId, activeLesson?.id]);

  const handleSubmit = async (data: ILessonSchema) => {
    const newContents = data?.contents.map(content => {
      return {
        ...content,
        course_id: data.course_id,
      };
    });

    await handleUpdateLesson({
      ...activeLesson,
      ...data,
      contents: newContents,
    } as ISegment);
  };

  const handleError = () => {
    setHasErrors(true);
  };

  return (
    <FormWrapper
      id={COURSE_DETAIL_FORM_IDS.lesson}
      schema={lessonSchema}
      onSubmit={handleSubmit}
      onError={handleError}
      useFormProps={{
        defaultValues: activeLesson as ILessonSchema,
      }}
    >
      {({ form, loading: submitLoading }) => {
        return (
          <>
            <LessonHeader submitLoading={submitLoading} />
            <LessonContents />
            {hasErrors && (
              <LessonValidateModal lesson={form.getValues()} open={hasErrors} onClose={() => setHasErrors(false)} />
            )}
          </>
        );
      }}
    </FormWrapper>
  );
}
