import type { ICourseOutline } from '@oe/api';
import { CircleCheckBig } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CourseSection } from './course-section';

export function CourseAchievements({
  courseOutline,
}: {
  courseOutline: ICourseOutline;
}) {
  const tCourse = useTranslations('courseOutline');

  const achievements = courseOutline?.props?.achievements;

  return (
    <>
      {achievements?.length > 0 ? (
        <CourseSection
          title={tCourse('courseAchivements')}
          childrenClass="gap-2 gap-x-8 grid grid-cols-1 lg:grid-cols-2"
        >
          {achievements
            ?.filter(item => item?.length > 0)
            ?.map((achievement, index) => {
              return (
                <div key={index} className="flex items-start justify-center gap-2">
                  <CircleCheckBig className="h-5 w-5 text-success/75" />
                  <span className="mcaption-regular14 flex-1 text-foreground opacity-80">{achievement}</span>
                </div>
              );
            })}
        </CourseSection>
      ) : null}
    </>
  );
}
