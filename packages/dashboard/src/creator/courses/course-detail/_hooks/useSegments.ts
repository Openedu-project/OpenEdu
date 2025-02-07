import { useGetSegments } from '@oe/api/hooks/useCourse';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useOutlineStore } from '../_store/useOutlineStore';

export const useSegments = () => {
  const { courseId } = useParams();
  const { segments } = useGetSegments({
    course_id: courseId as string,
  });
  const { setActiveSegment, setSegments, setActiveLessons, setActiveLesson } = useOutlineStore();

  useEffect(() => {
    if (segments && segments.length > 0 && segments[0]) {
      setActiveSegment(segments[0]);
      setSegments(segments);
      setActiveLessons(segments[0].lessons || []);
      setActiveLesson(segments[0].lessons?.[0]);
    }
  }, [segments, setActiveSegment, setSegments, setActiveLessons, setActiveLesson]);
};
