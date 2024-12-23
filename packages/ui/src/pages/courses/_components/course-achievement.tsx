import type { ICourseOutline } from '@oe/api/types/course/course';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CourseSection } from './course-section';

export default function CourseAchievements({ courseOutline }: { courseOutline: ICourseOutline }) {
  const tCourse = useTranslations('courseOutline');

  const achievements = courseOutline?.props?.achievements;

  return (
    <>
      {achievements?.length > 0 ? (
        <CourseSection title={tCourse('courseAchivements')}>
          <div className="flex flex-col gap-2">
            {achievements
              ?.filter(item => item?.length > 0)
              ?.map((achievement, index) => {
                return (
                  <div key={index} className="mcaption-regular16 flex items-start gap-1">
                    <Check className="h-6 w-6 stroke-1" />
                    <span className="flex-1 text-foreground opacity-80">{achievement}</span>
                  </div>
                );
              })}
          </div>
        </CourseSection>
      ) : null}
    </>
  );
}
