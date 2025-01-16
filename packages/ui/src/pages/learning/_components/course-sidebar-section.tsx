'use client';

import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ISectionLearningProgress } from '@oe/api/types/course/learning-progress';
import type { HTMLAttributes } from 'react';
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
  const { sectionsProgressData } = useLessonLearningStore();

  if (!sectionsProgressData || sectionsProgressData?.length === 0) {
    return null;
  }

  const getSectionClassName = (sectionUid: string) =>
    cn(
      'giant-iheading-semibold16 rounded-[4px] border-[0.4px] p-3 text-left text-primary hover:no-underline',
      activeSection === sectionUid ? 'border-primary/10 bg-primary/10' : 'border-foreground/5 bg-foreground/5'
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
          />
        )
      );
    });
  };

  return (
    <div {...props}>
      <Accordion type="single" collapsible defaultValue={`section-${activeSection}`} className="w-full">
        {sectionsProgressData.sort(sortByOrder).map((section, index) => (
          <AccordionItem className="border-none" key={section.uid} value={`section-${section.uid}`}>
            <AccordionTrigger className={getSectionClassName(section.uid)}>
              {`Section ${index + 1}: ${section.title}`}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mcaption-semibold14 space-y-2 text-foreground/60">{renderLessons(section)}</ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseOutline;
