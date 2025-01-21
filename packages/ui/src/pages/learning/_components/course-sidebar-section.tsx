'use client';

import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import { type HTMLAttributes, useEffect, useRef } from 'react';
import { CircleProgressBar } from '#components/circle-progress-bar';
import { OutlineLesson } from '#components/outline-lesson';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#shadcn/accordion';
import { cn } from '#utils/cn';
import { useLessonLearningStore } from '../_store/learning-store';
import { sortByOrder } from '../_utils/utils';

interface ICourseOutlineProps extends HTMLAttributes<HTMLDivElement> {
  courseData?: ICourseOutline;
  outline?: ISectionLearningProgress[];
  activeSection?: string;
  activeLesson?: string;
}

const CourseOutline = ({ courseData, activeSection, activeLesson, ...props }: ICourseOutlineProps) => {
  const activeLessonRef = useRef<HTMLLIElement>(null);

  const { sectionsProgressData } = useLessonLearningStore();

  useEffect(() => {
    if (sectionsProgressData?.length === 0 || !activeLessonRef.current) {
      return;
    }

    // Giảm timeout xuống thấp nhất có thể
    const timeoutId = setTimeout(() => {
      const scrollableParent = activeLessonRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (!(scrollableParent && activeLessonRef.current)) {
        return;
      }

      const elementRect = activeLessonRef.current.getBoundingClientRect();
      const containerRect = scrollableParent.getBoundingClientRect();

      // Chỉ scroll nếu element nằm ngoài viewport của container
      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        const targetPosition = elementRect.top - containerRect.top - (containerRect.height - elementRect.height) / 2;

        scrollableParent.style.scrollBehavior = 'smooth';
        scrollableParent.scrollTop += targetPosition;

        setTimeout(() => {
          scrollableParent.style.scrollBehavior = 'auto';
        }, 300);
      }
    }, 0); // Set timeout to 0

    return () => clearTimeout(timeoutId);
  }, [activeLesson, sectionsProgressData?.length]);

  if (!sectionsProgressData || sectionsProgressData?.length === 0) {
    return null;
  }

  const getSectionClassName = (sectionUid: string) =>
    cn(
      'gap-1 giant-iheading-semibold14 md:giant-iheading-semibold16 rounded-[4px] border-[0.4px] border-foreground/5 p-3 text-left text-foreground hover:no-underline',
      activeSection === sectionUid ? 'bg-primary/10' : 'bg-foreground/5'
    );

  const renderLessons = (section: (typeof sectionsProgressData)[0]) => {
    return section.lessons?.sort(sortByOrder)?.map(lesson => {
      const completedLesson = lesson?.completed_lesson_content ?? 0;
      const totalLesson = lesson?.total_lesson_content ?? 0;

      const isCompleted = totalLesson >= 1 ? completedLesson / totalLesson : 0;

      let completedPercentage = 0;

      if ((lesson?.completed_percent ?? 0) < 100) {
        completedPercentage = lesson.completed_percent;
      } else if (lesson?.completed_percent === 100) {
        completedPercentage = isCompleted ? 100 : 95; // TODO: this 95% is hard coded for video quiz (if quiz is not submitted)
      }

      return (
        courseData && (
          <OutlineLesson
            key={lesson.id}
            index={lesson.order + 1}
            completedPercentage={completedPercentage}
            courseSlug={courseData?.slug}
            sectionUid={section.uid}
            isAvailable={lesson.available ?? false}
            isActive={activeLesson === lesson.uid}
            lesson={lesson}
            type="learning"
            ref={activeLesson === lesson.uid ? activeLessonRef : null}
          />
        )
      );
    });
  };

  return (
    <div {...props}>
      <Accordion type="single" collapsible defaultValue={`section-${activeSection}`} className="w-full">
        {sectionsProgressData.sort(sortByOrder).map((section, index) => {
          const sectionProgress =
            section.total_lesson > 0 ? (section?.completed_lesson / section.total_lesson) * 100 : 0;

          return (
            <AccordionItem className="border-none" key={section.uid} value={`section-${section.uid}`}>
              <AccordionTrigger className={getSectionClassName(section.uid)}>
                <CircleProgressBar progress={sectionProgress} size="md" />

                <span className="flex-1">{`Section ${index + 1}: ${section.title}`}</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-foreground/60">{renderLessons(section)}</ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CourseOutline;
