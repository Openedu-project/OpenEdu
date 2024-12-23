import type { ICourseOutline } from '@oe/api/types/course/course';
import { useTranslations } from 'next-intl';
import { OutlineLesson } from '#components/outline-lesson';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#shadcn/accordion';
import { CourseSection } from './course-section';

const CourseContent = ({ courseOutline }: { courseOutline: ICourseOutline }) => {
  const t = useTranslations('courseOutline');

  const outline = courseOutline?.outline;

  return outline?.length > 0 ? (
    <CourseSection title={t('courseContent')}>
      {outline?.length > 0 && (
        <Accordion type="single" collapsible defaultValue={`section-${outline[0]?.id}`} className="w-full">
          {(outline ?? [])
            ?.sort((a, b) => a.order - b.order)
            ?.map((section, index) => (
              <AccordionItem className="border-none" key={section.id} value={`section-${section.id}`}>
                <AccordionTrigger className="giant-iheading-semibold16 rounded-[4px] border-[0.4px] border-border-neutral-50 bg-bg-neutral-20 p-3 text-left text-primary shadow-shadow-6">
                  {`Section ${index + 1}: ${section.title}`}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="mcaption-semibold14 space-y-2 text-foreground/60">
                    {section.lessons
                      ?.sort((a, b) => a.order - b.order)
                      ?.map(lesson => (
                        <OutlineLesson
                          key={lesson?.id}
                          index={lesson.order + 1}
                          completedPercentage={0}
                          courseSlug=""
                          sectionUid={section.uid}
                          isAvailable={false}
                          isActive={false}
                          lesson={lesson}
                        />
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      )}
    </CourseSection>
  ) : null;
};

export default CourseContent;
