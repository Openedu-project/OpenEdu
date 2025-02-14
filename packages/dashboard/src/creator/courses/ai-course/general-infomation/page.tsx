import { getCourseByIdService } from '@oe/api/services/course';
import { SettingCourseInfomation } from '../_components/setting-course-info';

export default async function AIGenCourseInfoPage({ id }: { id?: string }) {
  const course = id ? await getCourseByIdService(undefined, { id }) : null;

  return <SettingCourseInfomation course={course} />;
}
