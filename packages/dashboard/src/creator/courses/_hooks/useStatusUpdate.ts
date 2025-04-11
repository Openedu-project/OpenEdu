import { updateSegmentService } from '@oe/api';
import { useGetSegmentById, useGetSegments } from '@oe/api';
import type { ILesson, ISection, ISegment } from '@oe/api';
import { toast } from '@oe/ui';
import type { TStatus } from '@oe/ui';
import { useTranslations } from 'next-intl';

export function useStatusUpdate(type: string, data?: ISection | ILesson) {
  const tCourse = useTranslations('course');

  const { mutateSegments } = useGetSegments({
    course_id: (data as ISection | ILesson)?.course_id as string,
  });

  const { mutateSegment } = useGetSegmentById(
    type === 'section' ? (data as ISection)?.id : ((data as ILesson)?.parent_id as string)
  );

  const handleStatusChange = async (value: TStatus) => {
    const isPreview = value === 'preview';
    // const isPublish = value === 'publish';
    const isDraft = value === 'draft';
    const updateData = {
      ...data,
      ...(type === 'lesson'
        ? {
            contents: data?.contents?.map(content => ({
              ...content,
              status: isDraft ? 'draft' : 'publish',
            })),
          }
        : {
            lessons: (data as ISection)?.lessons?.map(lesson => ({
              ...lesson,
              status: isDraft ? 'draft' : lesson.status,
              free: isDraft ? false : isPreview && lesson.status === 'publish' ? true : lesson.free,
            })),
          }),
      status: isDraft ? 'draft' : 'publish',
      free: isDraft ? false : !!isPreview,
    };

    try {
      await updateSegmentService(undefined, updateData as ISegment);
      await mutateSegment();
      await mutateSegments();
    } catch {
      toast.error(tCourse('common.toast.statusUpdateError'));
    }
  };

  return { handleStatusChange };
}
