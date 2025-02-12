'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { type ILessonSchema, lessonSchema } from '@oe/api/schemas/courses/segmentSchema';
import { updateSegmentService } from '@oe/api/services/course';
import type { ISegment } from '@oe/api/types/course/segment';
import { FormWrapper } from '@oe/ui/components/form-wrapper';
import { toast } from '@oe/ui/shadcn/sonner';
import { useParams } from 'next/navigation';
import { COURSE_DETAIL_FORM_IDS } from '../../_utils/constants';
import { LessonContents } from './lesson-contents';
import { LessonHeader } from './lesson-header';

export default function LessonPage() {
  const { sectionId, lessonId } = useParams<{
    sectionId: string;
    lessonId: string;
  }>();
  const { segment: activeSection, mutateSegment } = useGetSegmentById(sectionId);

  const activeLessons = activeSection?.lessons ?? [];

  const activeLesson = activeLessons.find(lesson => lesson.id === lessonId);

  const handleSubmit = async (data: ILessonSchema) => {
    await updateSegmentService(undefined, {
      ...activeLesson,
      ...data,
    } as ISegment);
    await mutateSegment();
    toast.success('Lesson updated successfully');
  };
  const handleError = () => {
    toast.error('Failed to update lesson');
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
      <LessonHeader />
      <LessonContents />
    </FormWrapper>
  );
}
