import { getCourseByIdService } from '@oe/api/services/course';
import { SettingCourseOutline } from './_components/setting-course-outline';

export default async function AICreationPage({ id }: { id?: string }) {
  const course = id ? await getCourseByIdService(undefined, { id }) : null;

  return <SettingCourseOutline course={course} />;
}
