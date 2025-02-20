import { useGetSegmentById, useGetSegments } from '@oe/api/hooks/useCourse';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useGetSections = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();

  const { segments: sections, mutateSegments } = useGetSegments({
    course_id: courseId as string,
  });

  return {
    sections,
    mutateSections: mutateSegments,
    courseId,
  };
};

export const useGetSection = () => {
  const { sectionId, lessonId } = useParams<{
    courseId: string;
    sectionId: string;
    lessonId: string;
  }>();

  const { sections, mutateSections, courseId } = useGetSections();
  const { segment: activeSection, mutateSegment } = useGetSegmentById(sectionId);

  const activeLessons = useMemo(() => {
    return activeSection?.lessons?.sort((a, b) => a.order - b.order) ?? [];
  }, [activeSection]);

  const activeLesson = useMemo(() => {
    return activeLessons.find(lesson => lesson.id === lessonId);
  }, [activeLessons, lessonId]);

  const activeLessonContents = useMemo(() => {
    return activeLesson?.contents?.sort((a, b) => a.order - b.order) ?? [];
  }, [activeLesson]);

  const previousSection = useMemo(() => {
    const activeSectionIndex = sections?.findIndex(section => section.id === activeSection?.id) ?? -1;
    return activeSectionIndex > 0 ? sections?.[activeSectionIndex - 1] : sections?.[0];
  }, [sections, activeSection]);

  return {
    courseId,
    sectionId,
    lessonId,
    sections,
    activeSection,
    activeLessons,
    activeLesson,
    activeLessonContents,
    previousSection,
    mutateSections,
    mutateSection: mutateSegment,
  };
};
