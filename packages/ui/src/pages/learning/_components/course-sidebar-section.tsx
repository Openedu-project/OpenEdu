'use client';

import type { ILessonLearningProgress, ISectionLearningProgress } from '@oe/api';
import { type HTMLAttributes, memo, useEffect, useMemo, useRef } from 'react';
import { CircleProgressBar } from '#components/circle-progress-bar';
import { OutlineLesson } from '#components/outline-lesson';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#shadcn/accordion';
import { cn } from '#utils/cn';
import { useCourse, useCurrentLesson, useProgress } from '../_context';
import { sortByOrder } from '../_utils/utils';

interface ICourseOutlineProps extends HTMLAttributes<HTMLDivElement> {}

const MemoizedOutlineLesson = memo(OutlineLesson);

const LessonItem = memo(
  ({
    lesson,
    index,
    sectionUid,
    courseSlug,
    isActive,
  }: {
    lesson: ILessonLearningProgress;
    index: number;
    sectionUid: string;
    courseSlug: string;
    isActive: boolean;
  }) => {
    const ref = useRef<HTMLLIElement>(null);

    const { setIsNavigatingLesson } = useProgress();

    const completedLesson = lesson?.completed_lesson_content ?? 0;
    const totalLesson = lesson?.total_lesson_content ?? 0;
    const isCompleted = totalLesson >= 1 ? completedLesson / totalLesson : 0;

    let completedPercentage = 0;
    if ((lesson?.completed_percent ?? 0) < 100) {
      completedPercentage = lesson.completed_percent;
    } else if (lesson?.completed_percent === 100) {
      completedPercentage = isCompleted ? 100 : 95;
    }

    return (
      <MemoizedOutlineLesson
        key={lesson.id}
        index={index + 1}
        completedPercentage={completedPercentage}
        courseSlug={courseSlug}
        sectionUid={sectionUid}
        isAvailable={lesson.available ?? false}
        isActive={isActive}
        lesson={lesson}
        type="learning"
        ref={isActive ? ref : null}
        setIsNavigating={setIsNavigatingLesson}
      />
    );
  }
);

LessonItem.displayName = 'LessonItem';

const SectionItem = memo(
  ({
    section,
    index,
    isActive,
    activeLesson,
  }: {
    section: ISectionLearningProgress;
    index: number;
    isActive: boolean;
    activeLesson: string;
  }) => {
    const { course } = useCourse();
    const sectionProgress = useMemo(() => {
      return section.total_lesson > 0 ? (section?.completed_lesson / section.total_lesson) * 100 : 0;
    }, [section]);

    const getSectionClassName = () =>
      cn(
        'gap-1 giant-iheading-semibold14 md:giant-iheading-semibold16 rounded-[4px] border-[0.4px] border-foreground/5 p-3 text-left text-foreground hover:no-underline',
        isActive ? 'bg-primary/10' : 'bg-foreground/5'
      );

    return (
      <AccordionItem className="border-none" key={section.uid} value={`section-${section.uid}`}>
        <AccordionTrigger className={getSectionClassName()}>
          <CircleProgressBar progress={sectionProgress} size="md" />
          <span className="flex-1">{`Section ${index + 1}: ${section.title}`}</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 text-foreground/60">
            {section.lessons?.sort(sortByOrder)?.map((lesson: ILessonLearningProgress, lessonIndex: number) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={lessonIndex}
                sectionUid={section.uid}
                courseSlug={course?.slug || ''}
                isActive={activeLesson === lesson.uid}
              />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    );
  }
);

SectionItem.displayName = 'SectionItem';

const CourseOutline = (props: ICourseOutlineProps) => {
  const {
    state: { sectionsProgressData },
  } = useProgress();
  const { currentSection, currentLesson } = useCurrentLesson();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sortedSections = useMemo(() => {
    return [...sectionsProgressData].sort(sortByOrder);
  }, [sectionsProgressData]);

  useEffect(() => {
    if (sectionsProgressData?.length === 0) {
      return;
    }

    const scrollToActiveLesson = () => {
      const activeElement = document.querySelector(`[data-active="true"]`);
      if (!(activeElement && scrollContainerRef.current)) {
        return;
      }

      const container = scrollContainerRef.current.closest('[data-radix-scroll-area-viewport]');
      if (!container) {
        return;
      }

      activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const timeoutId = setTimeout(scrollToActiveLesson, 100);
    return () => clearTimeout(timeoutId);
  }, [sectionsProgressData, currentLesson, currentSection]);

  if (!sectionsProgressData || sectionsProgressData?.length === 0) {
    return null;
  }

  return (
    <div {...props} ref={scrollContainerRef}>
      <Accordion type="multiple" defaultValue={[`section-${currentSection}`]} className="w-full">
        {sortedSections.map((section, index) => (
          <SectionItem
            key={section.uid}
            section={section}
            index={index}
            isActive={currentSection === section.uid}
            activeLesson={currentLesson}
          />
        ))}
      </Accordion>
    </div>
  );
};

export { CourseOutline };
