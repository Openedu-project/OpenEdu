'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { type ILessonSchema, lessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { useParams } from 'next/navigation';
import { COURSE_DETAIL_FORM_IDS } from '../../_utils/constants';
import { LessonContents } from './lesson-contents';
import { LessonHeader } from './lesson-header';

export default function LessonPage() {
  const { sectionId, lessonId } = useParams<{
    sectionId: string;
    lessonId: string;
  }>();
  const { segment: activeSection } = useGetSegmentById(sectionId);

  const activeLessons = activeSection?.lessons ?? [];

  const activeLesson = activeLessons.find(lesson => lesson.id === lessonId);

  // biome-ignore lint/suspicious/useAwait: <explanation>
  const handleSubmit = async (data: ILessonSchema) => {
    console.log(data);
  };
  return (
    <FormWrapper
      id={COURSE_DETAIL_FORM_IDS.lesson}
      schema={lessonSchema}
      onSubmit={handleSubmit}
      useFormProps={{
        defaultValues: activeLesson as ILessonSchema,
      }}
    >
      <LessonHeader />
      <LessonContents />
    </FormWrapper>
  );
}
