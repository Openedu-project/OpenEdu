'use client';
import { useGetSegmentById, useGetSegments } from '@oe/api';
import type { ILesson } from '@oe/api';
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
    sections: sections?.sort((a, b) => a.order - b.order) ?? [],
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

  const allLessons: ILesson[] = useMemo(() => {
    return (sections?.flatMap(section => section.lessons) ?? []).filter(lesson => lesson !== null) as ILesson[];
  }, [sections]);

  const activeLessons = useMemo(() => {
    const sortedLessons = activeSection?.lessons?.sort((a, b) => a.order - b.order) ?? [];

    return (
      sortedLessons?.map(lesson => ({
        ...lesson,
        contents: (lesson.contents?.sort((a, b) => a.order - b.order) ?? []).map((content, index) => ({
          ...content,
          order: index,
        })),
      })) ?? []
    );
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
    allLessons,
    activeSection,
    activeLessons,
    activeLesson,
    activeLessonContents,
    previousSection,
    mutateSections,
    mutateSection: mutateSegment,
  };
};
