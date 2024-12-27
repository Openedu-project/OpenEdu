import type { ICourseOutline } from '@oe/api/types/course/course';
import type { HTMLAttributes } from 'react';
import { OutlineLesson } from '#components/outline-lesson';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#shadcn/accordion';
import { cn } from '#utils/cn';

interface ICourseOutlineProps extends HTMLAttributes<HTMLDivElement> {
  courseData?: ICourseOutline;
  activeSection?: string;
  activeLesson?: string;
}

const CourseOutline = ({ courseData, activeSection, activeLesson, ...props }: ICourseOutlineProps) => {
  const outline = courseData?.outline;

  if (!outline || outline?.length === 0) {
    return null;
  }

  const getSectionClassName = (sectionUid: string) =>
    cn(
      'giant-iheading-semibold16 rounded-[4px] border-[0.4px] p-3 text-left text-primary hover:no-underline',
      activeSection === sectionUid ? 'border-primary/10 bg-primary/10' : 'border-foreground/5 bg-foreground/5'
    );

  const renderLessons = (section: (typeof outline)[0]) => {
    return section.lessons
      ?.sort((a, b) => a.order - b.order)
      ?.map(lesson => (
        <OutlineLesson
          key={lesson.id}
          index={lesson.order + 1}
          completedPercentage={0}
          courseSlug={courseData?.slug}
          sectionUid={section.uid}
          isAvailable={lesson.free}
          isActive={activeLesson === lesson.uid}
          lesson={lesson}
          type="learning"
        />
      ));
  };

  return (
    <div {...props}>
      <Accordion type="single" collapsible defaultValue={`section-${activeSection}`} className="w-full">
        {outline
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
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
