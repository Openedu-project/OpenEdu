import { useGetSegments } from '@oe/api/hooks/useCourse';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useOutlineStore } from '../_store/useOutlineStore';

export const useSegments = () => {
  const { courseId } = useParams();
  const { segments, isLoadingSegments, mutateSegments } = useGetSegments({
    course_id: courseId as string,
  });
  const {
    setSegments,
    setSections,
    // setActiveSegment,
    // setActiveLessons,
    // setActiveLesson,
    // setActiveLessonContent,
    // setActiveLessonContents,
  } = useOutlineStore();

  useEffect(() => {
    if (segments && segments.length > 0) {
      setSegments(segments);
      setSections(segments);
      // const activeSegment = segments[0];
      // // Đảm bảo mỗi bài học đều có contents
      // const activeLessons =
      //   activeSegment.lessons?.map(lesson => ({
      //     ...lesson,
      //     contents: (lesson.contents?.length ?? 0) > 0 ? lesson.contents : [defaultLessonContent],
      //   })) || [];
      // const activeLesson = activeLessons[0];
      // const activeLessonContents = activeLesson?.contents || [defaultLessonContent];
      // const activeLessonContent = activeLessonContents[0];

      // setSegments(
      //   segments.map(segment => ({
      //     ...segment,
      //     lessons: segment.lessons?.map(lesson => ({
      //       ...lesson,
      //       contents:
      //         (lesson.contents?.length ?? 0) > 0 ? (lesson.contents as ILessonContent[]) : [defaultLessonContent],
      //     })) as ILesson[],
      //   }))
      // );
      // setActiveSegment(activeSegment);
      // setActiveLessons(activeLessons);
      // setActiveLesson(activeLesson);
      // setActiveLessonContents(activeLessonContents);
      // setActiveLessonContent(activeLessonContent);
    }
  }, [
    segments,
    setSegments,
    setSections,
    // setActiveSegment,
    // setActiveLessons,
    // setActiveLesson,
    // setActiveLessonContent,
    // setActiveLessonContents,
  ]);

  return { segments, isLoadingSegments, mutateSegments };
};
