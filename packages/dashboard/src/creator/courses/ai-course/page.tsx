import { getCourseByIdService } from '@oe/api';
import { SettingCourseOutline } from './_components/setting-course-outline';

export async function AICreationPage({ id }: { id?: string }) {
  const course = id ? await getCourseByIdService(undefined, { id }) : null;

  return <SettingCourseOutline course={course} />;
}
