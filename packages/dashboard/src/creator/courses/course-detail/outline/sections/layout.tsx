'use client';
import { useGetSegmentById } from '@oe/api/hooks/useCourse';
import { useParams } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import { useOutlineStore } from '../../_store/useOutlineStore';
import SectionHeader from './section-header';
import { SectionsDrawer } from './sections-drawer';

export default function SectionsLayout({ children }: { children: ReactNode }) {
  const { sectionId, lessonId } = useParams<{
    sectionId: string;
    lessonId: string;
  }>();
  const { segment } = useGetSegmentById(sectionId);
  const { setActiveSegment, setActiveLesson, setActiveSection } = useOutlineStore();

  useEffect(() => {
    if (segment) {
      setActiveSegment(segment);
      setActiveSection(segment);
    }
    const activeLesson = segment?.lessons?.find(lesson => lesson.id === lessonId);
    console.log('activeLesson', segment?.lessons, activeLesson);
    if (activeLesson) {
      setActiveLesson(activeLesson);
    }
  }, [segment, lessonId, setActiveSegment, setActiveLesson, setActiveSection]);

  return (
    <div className="relative flex h-full flex-col gap-2 p-4">
      <SectionHeader />
      <SectionsDrawer />
      {children}
    </div>
  );
}
