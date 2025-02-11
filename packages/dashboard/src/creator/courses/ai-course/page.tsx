import { getTranslations } from 'next-intl/server';
import { CourseOutlineForm } from './_components/course-outline-form';

export default async function AICreationPage() {
  const tAICourse = await getTranslations('courses.aiCourse');

  return (
    <div className="grow rounded-xl p-4 md:p-8">
      <div className="mb-[32px]">
        <h2 className="giant-iheading-semibold20 md:giant-iheading-semibold28 mb-2">
          {tAICourse('setupCourseOutline')}
        </h2>
        <p className="mcaption-regular16 md:mcaption-regular20">{tAICourse('setupCourseDesc')}</p>
      </div>
      <CourseOutlineForm />
    </div>
  );
}
