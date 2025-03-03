import type { ICourseOutline } from '@oe/api/types/course/course';
import { CircleCheckBig } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CourseSection } from './course-section';

export default function CourseAchievements({
  courseOutline,
}: {
  courseOutline: ICourseOutline;
}) {
  const tCourse = useTranslations('courseOutline');

  const achievements = courseOutline?.props?.achievements;

  return (
    <>
      {achievements?.length > 0 ? (
        <CourseSection title={tCourse('courseAchivements')}>
          {achievements
            ?.filter(item => item?.length > 0)
            ?.map((achievement, index) => {
              return (
                <div key={index} className="flex items-center justify-center gap-2">
                  <CircleCheckBig className="h-5 w-5 text-primary/75" />
                  <span className="mcaption-regular14 flex-1 text-foreground opacity-80">{achievement}</span>
                </div>
              );
            })}
        </CourseSection>
      ) : null}
    </>
  );
}
